import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export type OrionPerfMode = "autonomia" | "alcance" | "viento" | "peso" | "dimensiones";

export type OrionPerfSceneAPI = {
  mode: (mode: OrionPerfMode) => void;
  active: (value: boolean) => void;
  dispose: () => void;
};

const SHOTS: Record<OrionPerfMode, { camera: [number, number, number]; spin: number }> = {
  autonomia: { camera: [3.9, 2.3, 4.8], spin: 0.26 },
  alcance: { camera: [0.18, 1.1, 6], spin: 0.08 },
  viento: { camera: [5.1, 1.2, 2.45], spin: 0 },
  peso: { camera: [3.8, 0.49, 2.02], spin: 0.16 },
  dimensiones: { camera: [0.01, 6.6, 0.7], spin: 0 },
};

export async function createOrionPerfScene(
  host: HTMLElement,
  options: { reduced: boolean; onReady: () => void; onError: () => void },
): Promise<OrionPerfSceneAPI> {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });

  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  host.prepend(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1;
  room.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xe5f4ff, 0x24323b, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 3.3);
  key.position.set(5, 8, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd5edff, 2.2);
  fill.position.set(-6, 2, 5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x4fb8ff, 2.8);
  rim.position.set(-5, 4, -6);
  scene.add(rim);

  let model: THREE.Group | null = null;
  let rotors: THREE.Object3D[] = [];
  let current: OrionPerfMode = "autonomia";
  let running = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let yaw = 0;
  let fit = 1;
  const cameraGoal = new THREE.Vector3(...SHOTS.autonomia.camera);
  const lookAt = new THREE.Vector3(0, -0.08, 0);

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    fit = Math.max(1, 1.35 / camera.aspect);
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const place = (delta: number) => {
    const shot = SHOTS[current];
    const target = cameraGoal.set(...shot.camera).multiplyScalar(fit);
    camera.position.lerp(target, options.reduced ? 1 : Math.min(1, delta * 2.4));
    camera.lookAt(lookAt);
    if (!model) return;

    if (shot.spin && !options.reduced) yaw += shot.spin * delta;
    else {
      const wrapped = ((yaw + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      yaw -= wrapped * Math.min(1, options.reduced ? 1 : delta * 2.6);
    }

    const motion = options.reduced ? 0 : 1;
    model.rotation.y = yaw + (current === "viento" ? Math.PI : 0);
    model.rotation.z = current === "viento" ? Math.sin(elapsed * 1.8) * 0.05 * motion : 0;
    model.rotation.x = current === "viento" ? 0.065 * motion : 0;
    model.position.y =
      (current === "peso" ? Math.sin(elapsed * 1.9) * 0.07 : Math.sin(elapsed * 1.1) * 0.025) * motion;
    rotors.forEach((rotor, index) => {
      rotor.rotation.y += delta * 5.5 * (index % 2 ? 1 : -1) * motion;
    });
  };

  const render = (now: number) => {
    if (!running || disposed) return;
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += delta;
    place(delta);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const api: OrionPerfSceneAPI = {
    mode(next) {
      if (next === "peso" && current !== "peso") yaw = Math.PI;
      current = next;
      if (!running) {
        place(1);
        renderer.render(scene, camera);
      }
    },
    active(value) {
      running = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed && !options.reduced) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      } else if (value && options.reduced) {
        place(1);
        renderer.render(scene, camera);
      }
    },
    dispose() {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) =>
          material.dispose(),
        );
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  try {
    const gltf = await new GLTFLoader().loadAsync("/orion-mx/orion_detallado.glb");
    if (disposed) return api;
    const source = gltf.scene;

    for (const name of ["Cube", "Cube.001"]) source.getObjectByName(name)?.removeFromParent();
    source.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(source);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z);
    source.position.sub(center);

    const normalized = new THREE.Group();
    normalized.scale.setScalar(largest ? 3.9 / largest : 1);
    normalized.add(source);
    model = new THREE.Group();
    model.add(normalized);
    model.traverse((object) => {
      if (object.name.startsWith("Rotor_")) rotors.push(object);
    });
    scene.add(model);
    camera.position.copy(cameraGoal.set(...SHOTS[current].camera).multiplyScalar(fit));
    camera.lookAt(lookAt);
    renderer.render(scene, camera);
    options.onReady();
  } catch {
    options.onError();
  }

  return api;
}
