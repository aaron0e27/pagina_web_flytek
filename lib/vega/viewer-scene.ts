import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { vegaPoints, vegaViews } from "@/lib/vega/viewer-data";

export type VegaSceneAPI = {
  view: (name: string) => void;
  focus: (id: string) => void;
  zoom: (factor: number) => void;
  active: (value: boolean) => void;
  dispose: () => void;
};

type Options = {
  reduced: boolean;
  onReady: () => void;
  onError: () => void;
  onFocus: (id: string) => void;
  onProgress?: (percent: number) => void;
};

const MODEL = "/vega/models/vega.glb";

export async function createVegaScene(host: HTMLElement, options: Options): Promise<VegaSceneAPI> {
  const narrow = host.clientWidth < 640;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(narrow ? 48 : 36, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, narrow ? 1.25 : 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", "Modelo tridimensional interactivo de VEGA. Selecciona un punto para conocer un componente.");

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.95;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xdff2ff, 0x1d2a33, 2.3));
  const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(5, 7, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xc8e9ff, 2.2); fill.position.set(-6, 2, 5); scene.add(fill);
  const rim = new THREE.DirectionalLight(0x4fb8ff, 2.4); rim.position.set(-5, 4, -6); scene.add(rim);
  const under = new THREE.DirectionalLight(0xfff5e8, 0.8); under.position.set(1, -5, 3); scene.add(under);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.target.set(0, 0, 0);
  // En celular, el deslizamiento vertical sigue moviendo la página.
  renderer.domElement.style.touchAction = "pan-y";

  let model: THREE.Group | null = null;
  let running = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let fit = 1;
  let free = false;
  const markers: HTMLButtonElement[] = [];
  const cameraGoal = new THREE.Vector3();
  const targetGoal = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  const beginFree = () => { free = true; cameraGoal.copy(camera.position); targetGoal.copy(controls.target); };
  controls.addEventListener("start", beginFree);

  const setView = (name: string) => {
    const p = (vegaViews as Record<string, readonly [number, number, number]>)[name] ?? vegaViews.general;
    cameraGoal.set(p[0], p[1], p[2]).multiplyScalar(fit);
    targetGoal.set(0, 0, 0);
  };
  setView("general");
  camera.position.copy(cameraGoal);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    const next = Math.max(1, 0.95 / camera.aspect);
    camera.position.sub(controls.target).multiplyScalar(next / fit).add(controls.target);
    cameraGoal.sub(targetGoal).multiplyScalar(next / fit).add(targetGoal);
    fit = next;
    controls.minDistance = 2.4 * fit;
    controls.maxDistance = 14 * fit;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const render = (time: number) => {
    if (!running || disposed) return;
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;
    if (!free) {
      const f = options.reduced ? 1 : Math.min(1, delta * 7);
      camera.position.lerp(cameraGoal, f);
      controls.target.lerp(targetGoal, f);
    }
    controls.update();
    scene.updateMatrixWorld();
    if (model) {
      vegaPoints.forEach((p, i) => {
        const m = markers[i];
        if (!m) return;
        tmp.set(p.position[0], p.position[1], p.position[2]).applyMatrix4(model!.matrixWorld).project(camera);
        m.style.transform = `translate(${(tmp.x * 0.5 + 0.5) * host.clientWidth}px,${(-tmp.y * 0.5 + 0.5) * host.clientHeight}px) translate(-50%,-50%)`;
        m.hidden = tmp.z > 1 || tmp.z < -1;
      });
    }
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const api: VegaSceneAPI = {
    view(name) {
      free = false;
      controls.enableDamping = false; controls.update(); controls.enableDamping = true;
      markers.forEach((m) => m.setAttribute("aria-pressed", "false"));
      setView(name);
    },
    focus(id) {
      free = false;
      const idx = vegaPoints.findIndex((p) => p.id === id);
      if (idx < 0) return;
      const p = vegaPoints[idx];
      markers.forEach((m, i) => m.setAttribute("aria-pressed", String(i === idx)));
      const target = new THREE.Vector3(...p.position);
      const distance = (narrow ? 4.6 : 3.6) * fit;
      cameraGoal.copy(target).add(new THREE.Vector3(...p.direction).normalize().multiplyScalar(distance));
      targetGoal.copy(target);
      options.onFocus(id);
    },
    zoom(factor) {
      free = false;
      const offset = cameraGoal.clone().sub(targetGoal);
      offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
      cameraGoal.copy(targetGoal).add(offset);
    },
    active(value) {
      running = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed) { last = performance.now(); frame = requestAnimationFrame(render); }
    },
    dispose() {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      controls.removeEventListener("start", beginFree);
      controls.dispose();
      markers.forEach((m) => m.remove());
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  try {
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(MODEL, (e) => {
      if (e.lengthComputable) options.onProgress?.((e.loaded / e.total) * 100);
    });
    if (disposed) return api;
    const source = gltf.scene;
    source.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        if (m instanceof THREE.MeshStandardMaterial) {
          if (m.normalMap) m.normalScale.setScalar(0.75);
          m.roughness = Math.max(m.roughness, 0.3);
          m.needsUpdate = true;
        }
      });
    });
    source.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(source);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z);
    const centered = new THREE.Group(); centered.add(source); centered.position.sub(center);
    const normalized = new THREE.Group(); normalized.scale.setScalar(largest ? 3.6 / largest : 1); normalized.add(centered);
    model = new THREE.Group(); model.add(normalized); scene.add(model);

    vegaPoints.forEach((p) => {
      const marker = document.createElement("button");
      marker.className = "vega-3d-hotspot";
      marker.type = "button";
      marker.textContent = "+";
      marker.setAttribute("aria-label", `Explorar ${p.name}`);
      marker.setAttribute("aria-pressed", "false");
      marker.onclick = () => api.focus(p.id);
      host.appendChild(marker);
      markers.push(marker);
    });
    renderer.render(scene, camera);
    options.onProgress?.(100);
    options.onReady();
  } catch {
    options.onError();
  }
  return api;
}