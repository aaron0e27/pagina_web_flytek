import { fenixAssets } from "./assets";
import { points, viewerConfig } from "./viewer-data";
import { fenixMotion } from "./motion";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";
export type SceneAPI = {
  view: (name: string) => void;
  focus: (id: string) => void;
  zoom: (amount: number) => void;
  active: (value: boolean) => void;
  motion: (enabled: boolean) => void;
  progress: (value: number) => void;
  replay: () => void;
  dispose: () => void;
};
export async function createScene(
  host: HTMLElement,
  options: {
    arrival?: boolean;
    onReady?: () => void;
    onError?: () => void;
    onFocus?: (id: string) => void;
    reduced: boolean;
  },
): Promise<SceneAPI> {
  const scene = new THREE.Scene();
  const narrow = host.clientWidth < 600;
  const camera = new THREE.PerspectiveCamera(narrow ? 48 : 34, 1, 0.1, 100);
  camera.position.set(narrow ? 8 : 5, narrow ? 4 : 2.6, narrow ? 10 : 6.7);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1.15 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = viewerConfig.lights.exposure;
  host.insertBefore(renderer.domElement, host.firstChild);
  renderer.domElement.setAttribute("aria-label", "Modelo tridimensional interactivo de FÉNIX");
  renderer.domElement.setAttribute("role", "img");
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.3;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xd8efff, 1.15));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x626b77, viewerConfig.lights.hemisphere));
  const key = new THREE.DirectionalLight(0xffffff, viewerConfig.lights.key);
  key.position.set(3, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcadfff, viewerConfig.lights.fill);
  fill.position.set(-4, 2, -3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x55bfff, 2.6);
  rim.position.set(2, 4, -6);
  scene.add(rim);
  const focusLight = new THREE.SpotLight(0x5bc5ff, 0, 10, Math.PI / 5, 0.7, 1.35);
  const focusTarget = new THREE.Object3D();
  focusLight.target = focusTarget;
  scene.add(focusLight, focusTarget);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 22;
  controls.enableZoom = true;
  controls.target.set(0, -0.1, 0);
  controls.enabled = !options.arrival;
  // Scroll stays native; wheel zoom is opt-in while interacting with the viewer.
  const wheel = (e: WheelEvent) => {
    e.stopPropagation();
    if (!options.arrival && (document.activeElement === host || e.ctrlKey)) {
      e.preventDefault();
      api.zoom(e.deltaY > 0 ? 1.08 : 0.92);
    }
  };
  host.addEventListener("wheel", wheel, { passive: false, capture: true });
  let model: THREE.Group | null = null,
    rotors: THREE.Object3D[] = [],
    visible = false,
    disposed = false,
    raf = 0,
    last = 0,
    entered = false,
    hoverStart = 0,
    hoverTime = 0,
    scrollProgress = 0.5,
    motionEnabled = true;
  let flight: gsap.core.Timeline | null = null;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const markers: HTMLButtonElement[] = [];
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  const tween = (pos: THREE.Vector3, target: THREE.Vector3) => {
    gsap.killTweensOf([camera.position, controls.target]);
    if (options.reduced) {
      camera.position.copy(pos);
      controls.target.copy(target);
    } else {
      gsap.to(camera.position, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        duration: fenixMotion.camera,
        ease: "power3.out",
      });
      gsap.to(controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: fenixMotion.camera,
        ease: "power3.out",
      });
    }
  };
  const clearHighlight = () => {
    focusLight.intensity = 0;
    markers.forEach((marker) => marker.setAttribute("aria-pressed", "false"));
  };
  const highlight = (id: string) => {
    clearHighlight();
    const point = points.find((p) => p.id === id);
    if (!model || !point) return;
    const target = new THREE.Vector3(...point.position);
    const direction = camera.position.clone().sub(controls.target).normalize();
    focusTarget.position.copy(target);
    focusLight.position
      .copy(target)
      .add(direction.multiplyScalar(3.2))
      .add(new THREE.Vector3(0, 2.1, 0));
    focusLight.intensity = 7;
    focusTarget.updateMatrixWorld();
    markers[points.findIndex((p) => p.id === id)]?.setAttribute("aria-pressed", "true");
  };
  const interrupt = () => gsap.killTweensOf([camera.position, controls.target]);
  const engage = () => {
    if (!options.arrival) host.focus({ preventScroll: true });
  };
  controls.addEventListener("start", interrupt);
  host.addEventListener("pointerdown", engage);
  const render = (time: number) => {
    if (!visible || disposed) return;
    const dt = Math.min((time - last) / 1000, 0.05);
    last = time;
    if (model && options.arrival && !options.reduced && motionEnabled) {
      rotors.forEach((r, i) => (r.rotation.y += dt * 3.8 * (i % 2 ? 1 : -1)));
      if (hoverStart) {
        hoverTime += dt;
        model.position.y = Math.sin(hoverTime / 1.8) * 0.024 + (scrollProgress - 0.5) * 0.055;
        model.rotation.x = Math.sin(hoverTime / 2.7) * 0.003;
        model.rotation.z = Math.sin(hoverTime / 3.2) * 0.004;
      }
    }
    controls.update();
    scene.updateMatrixWorld();
    points.forEach((p, i) => {
      const m = markers[i];
      if (!m || !model) return;
      const v = new THREE.Vector3(...p.position).applyMatrix4(model.matrixWorld).project(camera);
      m.style.transform = `translate(${(v.x * 0.5 + 0.5) * host.clientWidth}px,${(-v.y * 0.5 + 0.5) * host.clientHeight}px) translate(-50%,-50%)`;
      m.hidden = v.z > 1 || v.z < -1;
    });
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  const api: SceneAPI = {
    view: (name) => {
      clearHighlight();
      const p = viewerConfig.cameraViews[name] || viewerConfig.cameraViews.general;
      tween(
        new THREE.Vector3(...p).multiplyScalar(narrow ? 1.5 : 1),
        new THREE.Vector3(0, -0.1, 0),
      );
    },
    focus: (id) => {
      const p = points.find((p) => p.id === id);
      if (!p) return;
      highlight(id);
      const target = new THREE.Vector3(...p.position);
      const direction = viewerConfig.focusDirections[id];
      const dir = direction
        ? new THREE.Vector3(...direction).normalize()
        : camera.position.clone().sub(controls.target).normalize();
      const distance =
        host.clientWidth < 600 ? viewerConfig.mobileFocusDistance : viewerConfig.focusDistance;
      tween(target.clone().add(dir.multiplyScalar(distance)), target.clone());
      options.onFocus?.(id);
    },
    zoom: (amount) => {
      const v = camera.position.clone().sub(controls.target);
      v.setLength(THREE.MathUtils.clamp(v.length() * amount, 3, 22));
      tween(controls.target.clone().add(v), controls.target.clone());
    },
    active: (value) => {
      visible = value;
      if (value && !raf) {
        if (motionEnabled) flight?.resume();
        last = performance.now();
        raf = requestAnimationFrame(render);
      } else if (!value) {
        flight?.pause();
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (value && model && options.arrival && !entered && motionEnabled) {
        entered = true;
        if (options.reduced) model.position.y = 0;
        else {
          model.position.y = -5;
          flight = gsap
            .timeline({
              onComplete: () => {
                hoverStart = performance.now();
              },
            })
            .to(model.position, {
              y: 0.035,
              duration: fenixMotion.ascent - 0.5,
              ease: fenixMotion.ease,
            })
            .to(model.position, { y: 0, duration: 0.5, ease: "sine.inOut" });
        }
      }
    },
    motion: (enabled) => {
      motionEnabled = enabled;
      if (enabled && visible) {
        flight?.resume();
        api.active(true);
      } else flight?.pause();
    },
    progress: (value) => {
      scrollProgress = THREE.MathUtils.clamp(value, 0, 1);
    },
    replay: () => {
      if (!options.arrival || options.reduced || !motionEnabled) return;
      flight?.kill();
      hoverStart = 0;
      hoverTime = 0;
      entered = false;
      if (model) {
        model.position.y = -5;
        model.rotation.set(0, 0, 0);
      }
      if (visible) api.active(true);
    },
    dispose: () => {
      clearHighlight();
      host.removeEventListener("pointerdown", engage);
      controls.removeEventListener("start", interrupt);
      disposed = true;
      media.removeEventListener("change", reduceChanged);
      flight?.kill();
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("wheel", wheel, true);
      controls.dispose();
      gsap.killTweensOf([camera.position, controls.target]);
      if (model) gsap.killTweensOf(model.position);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      environment.dispose();
      renderer.domElement.remove();
      markers.forEach((m) => m.remove());
    },
  };
  const reduceChanged = () => {
    options.reduced = media.matches;
    if (!options.reduced && entered && options.arrival) {
      hoverStart = performance.now();
      hoverTime = 0;
    }
    if (options.reduced) {
      flight?.kill();
      hoverStart = 0;
      if (model) {
        gsap.killTweensOf(model.position);
        model.position.y = 0;
        model.rotation.set(0, 0, 0);
      }
      gsap.killTweensOf([camera.position, controls.target]);
    }
  };
  media.addEventListener("change", reduceChanged);
  try {
    const gltf = await new GLTFLoader().loadAsync(fenixAssets.model);
    if (disposed) return api;
    model = new THREE.Group();
    const source = gltf.scene;
    source.updateMatrixWorld(true);
    const sourceBox = new THREE.Box3().setFromObject(source);
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const fitScale =
      viewerConfig.normalizedSize / Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
    source.scale.multiplyScalar(fitScale * viewerConfig.modelScale);
    source.updateMatrixWorld(true);
    const centeredBox = new THREE.Box3().setFromObject(source);
    source.position.sub(centeredBox.getCenter(new THREE.Vector3()));
    source.position.add(new THREE.Vector3(...viewerConfig.modelOffset));
    source.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.frustumCulled = true;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 1.05;
          material.needsUpdate = true;
        }
      });
    });
    model.add(source);
    model.traverse((o) => {
      if (o.name.startsWith(viewerConfig.rotorPrefix)) rotors.push(o);
    });
    scene.add(model);
    if (options.arrival) {
      camera.position.set(0, narrow ? 2.2 : 1.5, narrow ? 13 : 9);
      model.position.y = options.reduced ? 0 : -5;
    } else {
      points.forEach((p) => {
        const button = document.createElement("button");
        button.className = "hotspot";
        button.type = "button";
        button.textContent = "+";
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", `Explorar ${p.name}`);
        button.onclick = () => api.focus(p.id);
        host.appendChild(button);
        markers.push(button);
      });
    }
    options.onReady?.();
    api.active(visible);
  } catch {
    options.onError?.();
  }
  return api;
}
