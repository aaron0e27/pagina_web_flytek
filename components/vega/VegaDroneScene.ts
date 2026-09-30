import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { vegaData } from "@/lib/vega/data";
import { viewerData, type XYZ } from "@/lib/vega/viewer-data";
export type SceneController = {
  view: (id: string) => void;
  hotspot: (index: number) => void;
  zoom: (factor: number) => void;
  setInteractive: (active: boolean) => void;
  dispose: () => void;
};
export async function createDroneScene(
  mount: HTMLDivElement,
  markers: (HTMLButtonElement | null)[],
  onProgress: (percent: number) => void,
  onError: () => void,
  signal: AbortSignal,
): Promise<SceneController> {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-label", "Modelo tridimensional de VEGA");
  canvas.setAttribute("role", "img");
  canvas.tabIndex = -1;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.2;
  room.dispose();
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 100);
  camera.position.set(7, 5, 9);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.085;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.65;
  controls.enablePan = false;
  controls.minDistance = 5.2;
  controls.maxDistance = 24;
  controls.enabled = false;
  const hemisphereLight = new THREE.HemisphereLight(
  0xbfe6ff,
  0x17232b,
  2.4,
  );
  scene.add(hemisphereLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
  const fillLight = new THREE.DirectionalLight(0x78c8ff, 3.4);
  const rimLight = new THREE.DirectionalLight(0x2f8fd0, 4.2);
  scene.add(keyLight, fillLight, rimLight);
  const componentLight = new THREE.SpotLight(
  0x56bdff,
  0,
  8,
  Math.PI / 5,
  0.65,
  1.4,
  );

const componentLightTarget = new THREE.Object3D();

scene.add(componentLight);
scene.add(componentLightTarget);

componentLight.target = componentLightTarget;
  let disposed = false;
  let dirty = true;
  let raf = 0;
  let visible = true;
  let interactive = false;
  let moving = false;
  function requestRender() { if (!disposed && visible && !document.hidden && model && !raf) raf = requestAnimationFrame(frame); }
  function visibilityChanged() { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else { dirty = true; requestRender(); } }
  document.addEventListener("visibilitychange", visibilityChanged);
  let model: THREE.Group | undefined;
  const targetPosition = camera.position.clone();
  const targetLook = new THREE.Vector3();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function disposeObject(object: THREE.Object3D) {
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    object.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        for (const material of Array.isArray(o.material)
          ? o.material
          : [o.material]) {
          materials.add(material);
          for (const value of Object.values(material))
            if (value instanceof THREE.Texture) textures.add(value);
        }
      }
    });
    textures.forEach((t) => t.dispose());
    materials.forEach((m) => m.dispose());
  }
  const ro = new ResizeObserver(() => resize());
  function resize() {
    if (disposed) return;
    const { width, height } = mount.getBoundingClientRect();
    renderer.setSize(Math.max(width, 1), Math.max(height, 1));
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    dirty = true;
    requestRender();
  }
  ro.observe(mount);
  resize();
  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false;
    dirty = true;
    requestRender();
  });
  io.observe(mount);
  function onLost(event: Event) {
    event.preventDefault();
    onError();
  }
  canvas.addEventListener("webglcontextlost", onLost);
  function move(pos: THREE.Vector3, look = new THREE.Vector3()) {
    targetPosition.copy(pos);
    targetLook.copy(look);
    moving = true;
    if (reduced.matches) {
      camera.position.copy(pos);
      controls.target.copy(look);
      moving = false;
    }
    controls.update();
    dirty = true;
    requestRender();
  }
  const moveView = (id: string) => {
    const view =
      viewerData.views.find((v) => v.id === id) || viewerData.views[0];
    const p = new THREE.Vector3(...view.position);
    p.multiplyScalar(Math.max(1, 1.16 / camera.aspect));
    componentLight.intensity = 0;
    move(p);
  };
  function zoom(factor: number) {
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(
      THREE.MathUtils.clamp(
        offset.length() * factor,
        controls.minDistance,
        controls.maxDistance,
      ),
    );
    move(offset.add(controls.target), controls.target.clone());
  }
  function onKey(e: KeyboardEvent) {
    if (!interactive) return;
    if (e.key === "Escape") {
      controls.enabled = false;
      interactive = false;
      canvas.tabIndex = -1;
      canvas.style.pointerEvents = "none";
      (
        mount.parentElement?.querySelector(
          ".viewer-interact button",
        ) as HTMLButtonElement
      )?.click();
      return;
    }
    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "-",
        "=",
      ].includes(e.key)
    ) {
      e.preventDefault();
      if (["+", "-", "="].includes(e.key)) {
        zoom(e.key === "-" ? 1.15 : 0.87);
        return;
      }
      const offset = camera.position.clone().sub(controls.target);
      const axis =
        e.key === "ArrowLeft" || e.key === "ArrowRight"
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3()
              .crossVectors(offset, new THREE.Vector3(0, 1, 0))
              .normalize();
      offset.applyAxisAngle(
        axis,
        e.key === "ArrowLeft" || e.key === "ArrowUp" ? 0.12 : -0.12,
      );
      move(offset.add(controls.target), controls.target.clone());
    }
  }
  canvas.addEventListener("keydown", onKey);
  controls.addEventListener("change", () => {
    dirty = true;
    requestRender();
  });
  controls.addEventListener("start", () => {
    moving = false;
  });
  function frame() {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    if (moving) {
      // Interpolate on an orbit: opposite views must never move through the drone.
      const current = new THREE.Spherical().setFromVector3(
        camera.position.clone().sub(controls.target),
      );
      const destination = new THREE.Spherical().setFromVector3(
        targetPosition.clone().sub(targetLook),
      );
      const delta = Math.atan2(
        Math.sin(destination.theta - current.theta),
        Math.cos(destination.theta - current.theta),
      );
      current.theta += delta * 0.1;
      current.phi = THREE.MathUtils.lerp(current.phi, destination.phi, 0.1);
      current.radius = Math.max(
        controls.minDistance,
        THREE.MathUtils.lerp(current.radius, destination.radius, 0.1),
      );
      controls.target.lerp(targetLook, 0.1);
      camera.position
        .copy(controls.target)
        .add(new THREE.Vector3().setFromSpherical(current));
      if (
        camera.position.distanceTo(targetPosition) < 0.005 &&
        controls.target.distanceTo(targetLook) < 0.005
      )
        moving = false;
    }
    const changed = controls.update();
    const lightDirection = camera.position
  .clone()
  .sub(controls.target)
  .normalize();

const lightRight = new THREE.Vector3()
  .crossVectors(lightDirection, camera.up)
  .normalize();

keyLight.position
  .copy(controls.target)
  .add(lightDirection.clone().multiplyScalar(6))
  .add(lightRight.clone().multiplyScalar(3))
  .add(new THREE.Vector3(0, 4, 0));

fillLight.position
  .copy(controls.target)
  .add(lightDirection.clone().multiplyScalar(2))
  .add(lightRight.clone().multiplyScalar(-5))
  .add(new THREE.Vector3(0, 2, 0));

rimLight.position
  .copy(controls.target)
  .add(lightDirection.clone().multiplyScalar(-6))
  .add(new THREE.Vector3(0, 3, 0));

keyLight.target.position.copy(controls.target);
fillLight.target.position.copy(controls.target);
rimLight.target.position.copy(controls.target);

keyLight.target.updateMatrixWorld();
fillLight.target.updateMatrixWorld();
rimLight.target.updateMatrixWorld();
    if (dirty || moving || changed) {
      renderer.render(scene, camera);
      dirty = false;
    }
    viewerData.hotspots.forEach((h, i) => {
      const el = markers[i];
      if (!el) return;
      const pos = new THREE.Vector3(...h.position).project(camera);
      el.style.left = `${(pos.x * 0.5 + 0.5) * 100}%`;
      el.style.top = `${(-pos.y * 0.5 + 0.5) * 100}%`;
      el.style.visibility =
        pos.z < 1 && Math.abs(pos.x) < 0.96 && Math.abs(pos.y) < 0.96
          ? "visible"
          : "hidden";
    });
    if (moving || changed) requestRender();
  }
  const api: SceneController = {
    view: moveView,
    hotspot: (i) => {
  const target = new THREE.Vector3(
    ...viewerData.hotspots[i].position,
  );

  const direction = camera.position
    .clone()
    .sub(controls.target)
    .normalize();

  componentLightTarget.position.copy(target);

  componentLight.position
    .copy(target)
    .add(direction.clone().multiplyScalar(3))
    .add(new THREE.Vector3(0, 2, 0));

  componentLight.intensity = 7.5;
  componentLightTarget.updateMatrixWorld();

  move(
    target.clone().add(direction.multiplyScalar(5.5)),
    target,
  );

  dirty = true;
  requestRender();
},
    zoom,
    setInteractive: (active) => {
      interactive = active;
      controls.enabled = active;
      canvas.style.pointerEvents = active ? "auto" : "none";
      canvas.tabIndex = active ? 0 : -1;
      if (active) canvas.focus({ preventScroll: true });
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", visibilityChanged);
      canvas.removeEventListener("keydown", onKey);
      canvas.removeEventListener("webglcontextlost", onLost);
      controls.dispose();
      if (model) disposeObject(model);
      environment.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
  signal.addEventListener("abort", api.dispose, { once: true });
  try {
    const response = await fetch(vegaData.assets.model, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(20000)]),
    });
    if (!response.ok) throw new Error("Model load failed");
    const total = Number(response.headers.get("content-length"));
    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        onProgress(total ? (loaded / total) * 95 : 0);
      }
    } else {
      const bytes = new Uint8Array(await response.arrayBuffer());
      chunks.push(bytes);
      loaded = bytes.length;
    }
    const binary = new Uint8Array(loaded);
    let cursor = 0;
    chunks.forEach((chunk) => {
      binary.set(chunk, cursor);
      cursor += chunk.length;
    });
    const gltf = await new GLTFLoader()
      .setMeshoptDecoder(MeshoptDecoder)
      .parseAsync(binary.buffer, "/vega/models/");
    if (signal.aborted) {
      disposeObject(gltf.scene);
      throw new DOMException("Aborted", "AbortError");
    }
    model = gltf.scene;
    model.rotation.set(...viewerData.orientation);
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.scale.multiplyScalar(
      viewerData.normalizedSize / Math.max(size.x, size.y, size.z),
    );
    model.updateMatrixWorld(true);
    model.position.sub(
      new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3()),
    );
    model.traverse((object) => {
  if (!(object instanceof THREE.Mesh)) return;

  object.frustumCulled = true;

  const materials = Array.isArray(object.material)
    ? object.material
    : [object.material];

  materials.forEach((material) => {
    if (!(material instanceof THREE.MeshStandardMaterial)) return;

    if (material.normalMap) {
      material.normalScale.setScalar(0.75);
    }

    material.roughness = Math.max(material.roughness, 0.28);
    material.needsUpdate = true;
  });
});
    scene.add(model);
    dirty = true;
    requestRender();
    moveView("general");
    onProgress(100);
    requestRender();
    return api;
  } catch (error) {
    api.dispose();
    throw error;
  }
}
