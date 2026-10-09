import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";

export type AscentAPI = {
  /** 0 → 1: avance del scroll a través de la sección (gira ligeramente al dron). */
  progress: (value: number) => void;
  /** -1 → 1: posición del cursor dentro de la sección (inclina al dron). */
  pointer: (x: number, y: number) => void;
  active: (value: boolean) => void;
  replay: () => void;
  dispose: () => void;
};

type Options = { reduced: boolean; onReady: () => void; onError: () => void };

export async function createAscentScene(host: HTMLElement, options: Options): Promise<AscentAPI> {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(host.clientWidth < 640 ? 44 : 34, 1, 0.1, 100);
  camera.position.set(6.2, 2.4, 6.2);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, innerWidth < 700 ? 1.25 : 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new RoomEnvironment();
  const environment = pmrem.fromScene(studio, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.85;
  studio.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x303841, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x4fb8ff, 1.8);
  rim.position.set(-5, 2, -4);
  scene.add(rim);

  let model: THREE.Group | null = null;
  const rotors: THREE.Object3D[] = [];
  let running = false;
  let disposed = false;
  let entered = false;
  let hoverReady = false;
  let flight: gsap.core.Timeline | null = null;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let spin = 5.5;
  let scrollProgress = 0.5;
  const target = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.fov = width < 640 ? 44 : 34;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const render = (time: number) => {
    if (!running || disposed) return;
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;
    elapsed += delta;
    if (model) {
      // Suaviza el seguimiento del cursor: el movimiento se siente "controlado".
      smooth.x += (target.x - smooth.x) * Math.min(1, delta * 3);
      smooth.y += (target.y - smooth.y) * Math.min(1, delta * 3);
      rotors.forEach((rotor, i) => (rotor.rotation.y += delta * spin * (i % 2 ? 1 : -1)));
      const yaw = -0.5 + (scrollProgress - 0.5) * 0.7 + smooth.x * 0.45;
      model.rotation.y = yaw;
      model.rotation.x = smooth.y * 0.12 + (hoverReady ? Math.sin(elapsed / 2.7) * 0.01 : 0);
      model.rotation.z = -smooth.x * 0.06 + (hoverReady ? Math.sin(elapsed / 3.2) * 0.012 : 0);
      if (hoverReady) model.position.y = Math.sin(elapsed / 1.1) * 0.06;
    }
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const rise = () => {
    if (!model) return;
    flight?.kill();
    hoverReady = false;
    if (options.reduced) {
      model.position.y = 0;
      return;
    }
    model.position.y = -6;
    spin = 18;
    flight = gsap
      .timeline({ onComplete: () => (hoverReady = true) })
      .to(model.position, { y: 0.12, duration: 3.6, ease: "power3.out" })
      .to(model.position, { y: 0, duration: 0.6, ease: "sine.inOut" }, ">")
      .to({ s: 18 }, { s: 5.5, duration: 3.6, ease: "power2.out", onUpdate() { spin = (this.targets()[0] as { s: number }).s; } }, 0);
  };

  const api: AscentAPI = {
    progress(value) {
      scrollProgress = THREE.MathUtils.clamp(value, 0, 1);
    },
    pointer(x, y) {
      target.x = THREE.MathUtils.clamp(x, -1, 1);
      target.y = THREE.MathUtils.clamp(y, -1, 1);
    },
    active(value) {
      running = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed) {
        last = performance.now();
        frame = requestAnimationFrame(render);
        if (model && !entered) {
          entered = true;
          rise();
        } else flight?.resume();
      } else flight?.pause();
    },
    replay() {
      if (!model || options.reduced) return;
      rise();
      if (!running) api.active(true);
    },
    dispose() {
      disposed = true;
      flight?.kill();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  try {
    const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync("/orion-mx/orion_detallado.glb");
    if (disposed) return api;
    const source = gltf.scene;
    // Excluir los dos cubos auxiliares incluidos en esta exportación.
    for (const name of ["Cube", "Cube.001"]) source.getObjectByName(name)?.removeFromParent();
    source.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(source);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z);
    const normalized = new THREE.Group();
    source.position.sub(center);
    normalized.scale.setScalar(largest > 0 ? 3.8 / largest : 1);
    normalized.add(source);
    model = new THREE.Group();
    model.add(normalized);
    model.traverse((object) => {
      if (object.name.startsWith("Rotor_")) rotors.push(object);
    });
    model.position.y = -6; // fuera de cuadro hasta que empiece el ascenso
    scene.add(model);
    renderer.render(scene, camera);
    options.onReady();
    if (running && !entered) {
      entered = true;
      rise();
    }
  } catch {
    options.onError();
  }
  return api;
}