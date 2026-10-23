import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export type PerfMode = "autonomia" | "alcance" | "viento" | "peso" | "longitud";

export type PerfSceneAPI = {
  mode: (mode: PerfMode) => void;
  active: (value: boolean) => void;
  dispose: () => void;
};

const MODEL = "/vega/models/vega.glb";

// Cámara y movimiento del modelo para cada métrica.
// Si el dron se ve muy chico o muy grande, ajusta los números de "cam".
const SHOTS: Record<PerfMode, { cam: [number, number, number]; spin: number }> = {
  autonomia: { cam: [2.85, 1.55, 3.5], spin: 0.3 }, // giro lento
  alcance: { cam: [0.14, 0.97, 4.5], spin: 0.08 },  // GPS y radio
  viento: { cam: [0.24, 0.65, 4.35], spin: 0 },     // frente, con balanceo
  peso: { cam: [3.8, 0.49, 2.02], spin: 0.16 },     // giro lento + flotación
  longitud: { cam: [0.01, 5.1, 0.74], spin: 0 },    // vista superior
};

export async function createPerfScene(
  host: HTMLElement,
  options: { reduced: boolean; onReady: () => void; onError: () => void },
): Promise<PerfSceneAPI> {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.prepend(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xdff2ff, 0x1d2a33, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(5, 7, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xc8e9ff, 2.2); fill.position.set(-6, 2, 5); scene.add(fill);
  const rim = new THREE.DirectionalLight(0x4fb8ff, 3); rim.position.set(-5, 4, -6); scene.add(rim);

  let model: THREE.Group | null = null;
  let current: PerfMode = "autonomia";
  let running = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  let yaw = 0;
  let fit = 1;
  const goal = new THREE.Vector3(...SHOTS.autonomia.cam);
  const look = new THREE.Vector3();

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    fit = Math.max(1, 1.5 / camera.aspect);
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const place = (delta: number) => {
    const shot = SHOTS[current];
    const target = goal.set(...shot.cam).multiplyScalar(fit);
    camera.position.lerp(target, options.reduced ? 1 : Math.min(1, delta * 2.4));
    camera.lookAt(look);
    if (!model) return;
    if (shot.spin > 0 && !options.reduced) yaw += shot.spin * delta;
    else {
      // se alinea suavemente al frente para la medición
      const wrapped = ((yaw + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      yaw -= wrapped * Math.min(1, options.reduced ? 1 : delta * 2.6);
    }
    model.rotation.y = yaw;
    const calm = options.reduced ? 0 : 1;
    model.rotation.z = current === "viento" ? Math.sin(time * 1.7) * 0.045 * calm : 0;
    model.rotation.x = current === "viento" ? 0.07 * calm : 0;
    model.position.y = (current === "peso" ? Math.sin(time * 1.9) * 0.07 : Math.sin(time * 1.1) * 0.025) * calm;
  };

  const render = (now: number) => {
    if (!running || disposed) return;
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += delta;
    place(delta);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const api: PerfSceneAPI = {
    mode(next) {
      if (next === "peso" && current !== "peso") yaw = Math.PI;
      current = next;
      if (!running) { place(1); renderer.render(scene, camera); }
    },
    active(value) {
      running = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed && !options.reduced) { last = performance.now(); frame = requestAnimationFrame(render); }
      else if (value && options.reduced) { place(1); renderer.render(scene, camera); }
    },
    dispose() {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
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
    const gltf = await loader.loadAsync(MODEL);
    if (disposed) return api;
    const source = gltf.scene;
    source.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(source);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z);
    const centered = new THREE.Group(); centered.add(source); centered.position.sub(center);
    const normalized = new THREE.Group(); normalized.scale.setScalar(largest ? 3.6 / largest : 1); normalized.add(centered);
    model = new THREE.Group(); model.add(normalized);
    scene.add(model);
    camera.position.copy(goal.set(...SHOTS[current].cam).multiplyScalar(fit));
    camera.lookAt(look);
    renderer.render(scene, camera);
    options.onReady();
  } catch {
    options.onError();
  }
  return api;
}
