import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export type DronePoint = {
  id: string;
  name: string;
  position: [number, number, number];
  direction: [number, number, number];
  description: string;
};

export type InteractiveDroneSceneAPI = {
  view: (name: string) => void;
  focus: (id: string) => void;
  zoom: (factor: number) => void;
  active: (value: boolean) => void;
  interactive: (value: boolean) => void;
  dispose: () => void;
};

export async function createInteractiveDroneScene(
  host: HTMLElement,
  options: {
    asset: string;
    label: string;
    points: readonly DronePoint[];
    views: Record<string, readonly [number, number, number]>;
    removeNodes?: string[];
    reduced: boolean;
    onReady: () => void;
    onError: () => void;
    onFocus: (id: string) => void;
  },
): Promise<InteractiveDroneSceneAPI> {
  const narrow = host.clientWidth < 640;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(narrow ? 48 : 36, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, narrow ? 1.25 : 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", options.label);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.86;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a3b46, 2.15));
  const key = new THREE.DirectionalLight(0xffffff, 3.1); key.position.set(5, 7, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xc8e9ff, 2.05); fill.position.set(-6, 2, 5); scene.add(fill);
  const rim = new THREE.DirectionalLight(0x77caff, 1.7); rim.position.set(-5, 4, -6); scene.add(rim);
  const underside = new THREE.DirectionalLight(0xfff5e8, 0.75); underside.position.set(1, -5, 3); scene.add(underside);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  renderer.domElement.style.pointerEvents = "name";
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.2;
  controls.maxDistance = 15;
  controls.target.set(0, 0, 0);

  let model: THREE.Group | null = null;
  let active = false;
  let disposed = false;
  let frame = 0;
  let elapsed = 0;
  let last = 0;
  let fit = 1;
  const markers: HTMLButtonElement[] = [];
  const cameraGoal = camera.position.clone();
  const targetGoal = controls.target.clone();
  let userIsControlling = false;

const beginFreeControl = () => {
  userIsControlling = true;
  cameraGoal.copy(camera.position);
  targetGoal.copy(controls.target);
};

controls.addEventListener("start", beginFreeControl);

  const setView = (name: string) => {
    const position = options.views[name] || options.views.general;
    cameraGoal.set(...position).multiplyScalar(fit);
    targetGoal.set(0, 0, 0);
  };
  setView("general");
  camera.position.copy(cameraGoal);

  const resize = () => {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    const nextFit = Math.max(1, 0.95 / camera.aspect);
    camera.position.sub(controls.target).multiplyScalar(nextFit / fit).add(controls.target);
    cameraGoal.sub(targetGoal).multiplyScalar(nextFit / fit).add(targetGoal);
    fit = nextFit;
    controls.minDistance = 3.2 * fit;
    controls.maxDistance = 15 * fit;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const render = (time: number) => {
    if (!active || disposed) return;
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;
    elapsed += delta;
    if (!userIsControlling) {
    const factor = options.reduced ? 1 : Math.min(1, delta * 7);

    camera.position.lerp(cameraGoal, factor);
    controls.target.lerp(targetGoal, factor);
  }
    // El modelo permanece estable; el usuario decide cuándo activar la rotación.
    controls.update();
    scene.updateMatrixWorld();
    options.points.forEach((point, index) => {
      const marker = markers[index];
      if (!marker || !model) return;
      const screen = new THREE.Vector3(...point.position).applyMatrix4(model.matrixWorld).project(camera);
      marker.style.transform = `translate(${(screen.x * .5 + .5) * host.clientWidth}px,${(-screen.y * .5 + .5) * host.clientHeight}px) translate(-50%,-50%)`;
      marker.hidden = screen.z > 1 || screen.z < -1;
    });
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const api: InteractiveDroneSceneAPI = {
    interactive(value) {
      controls.enabled = value;
      renderer.domElement.style.pointerEvents = value ? "auto" : "none";
    },
    view(name) {
  userIsControlling = false;

  // Elimina la inercia del movimiento anterior.
  controls.enableDamping = false;
  controls.update();
  controls.enableDamping = true;

  markers.forEach((marker) =>
    marker.setAttribute("aria-pressed", "false")
  );

  setView(name);
},
    focus(id) {
      userIsControlling = false;
      const point = options.points.find((item) => item.id === id);
      if (!point) return;
      markers.forEach((marker, index) => marker.setAttribute("aria-pressed", String(options.points[index].id === id)));
      const target = new THREE.Vector3(...point.position);
      const distance = (narrow ? 5.4 : 4.25) * fit;
      cameraGoal.copy(target).add(new THREE.Vector3(...point.direction).normalize().multiplyScalar(distance));
      targetGoal.copy(target);
      options.onFocus(id);
      host.focus({ preventScroll: true });
    },
    zoom(factor) {
      userIsControlling = false;
      const offset = cameraGoal.clone().sub(targetGoal);
      offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
      cameraGoal.copy(targetGoal).add(offset);
    },
    active(value) {
      active = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed) { last = performance.now(); frame = requestAnimationFrame(render); }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.removeEventListener("start", beginFreeControl);
      controls.dispose();
      markers.forEach((marker) => marker.remove());
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  try {
    const gltf = await new GLTFLoader().loadAsync(options.asset);
    if (disposed) return api;
    options.removeNodes?.forEach((name) => gltf.scene.getObjectByName(name)?.removeFromParent());
    gltf.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) { material.roughness = Math.max(material.roughness, 0.42); material.needsUpdate = true; }
      });
    });
    gltf.scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z);
    const centered = new THREE.Group(); centered.add(gltf.scene); centered.position.sub(center);
    const normalized = new THREE.Group(); normalized.scale.setScalar(largest ? 3.6 / largest : 1); normalized.add(centered);
    model = new THREE.Group(); model.add(normalized); scene.add(model);
    options.points.forEach((point) => {
      const marker = document.createElement("button");
      marker.className = "drone-hotspot";
      marker.type = "button";
      marker.textContent = "+";
      marker.setAttribute("aria-label", `Explorar ${point.name}`);
      marker.setAttribute("aria-pressed", "false");
      marker.onclick = () => api.focus(point.id);
      host.appendChild(marker);
      markers.push(marker);
    });
    renderer.render(scene, camera);
    options.onReady();
  } catch {
    options.onError();
  }
  return api;
}
