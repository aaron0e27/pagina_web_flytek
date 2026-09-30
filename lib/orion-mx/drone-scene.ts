import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createInteractiveDroneScene } from "./interactive-scene";
import { orionPoints, orionViews } from "./viewer-data";

export type OrionSceneAPI = {
  view: (name: "general" | "front" | "top" | "side") => void;
  zoom: (factor: number) => void;
  active: (value: boolean) => void;
  dispose: () => void;
};

async function createLegacyOrionScene(
  host: HTMLElement,
  options: { reduced: boolean; onReady: () => void; onError: () => void },
): Promise<OrionSceneAPI> {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(host.clientWidth < 640 ? 48 : 36, 1, 0.1, 100);
  camera.position.set(7.5, 3.7, 5);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, host.clientWidth < 640 ? 1.25 : 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute(
    "aria-label",
    "Modelo tridimensional interactivo de referencia de ORION MX",
  );

  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new RoomEnvironment();
  const environment = pmrem.fromScene(studio, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.85;
  studio.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x303841, 1.8));
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(5, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x4fb8ff, 1.8);
  rim.position.set(-6, 3, -5);
  scene.add(rim);
  const warm = new THREE.DirectionalLight(0xfff1df, 0.6);
  warm.position.set(3, 0, -4);
  scene.add(warm);

  const fill = new THREE.DirectionalLight(0xe5efff, 2.0);
  fill.position.set(-5, 2, 6);
  scene.add(fill);
  const underside = new THREE.DirectionalLight(0xffffff, 0.85);
  underside.position.set(0, -4, 3);
  scene.add(underside);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 18;
  controls.target.set(0, -0.15, 0);

  let model: THREE.Group | null = null;
  let rotors: THREE.Object3D[] = [];
  let running = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
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
    if (model && !options.reduced) {
      rotors.forEach((rotor, index) => {
        rotor.rotation.y += delta * 5.5 * (index % 2 ? 1 : -1);
      });
      model.position.y = Math.sin(elapsed * 1.15) * 0.055;
      model.rotation.z = Math.sin(elapsed * 0.72) * 0.008;
    }
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const positions = {
    general: new THREE.Vector3(7.5, 3.7, 5),
    front: new THREE.Vector3(0, 1.5, 11),
    top: new THREE.Vector3(0.01, 12, 0.01),
    side: new THREE.Vector3(11, 1.6, 0),
  };
  const api: OrionSceneAPI = {
    view(name) {
      camera.position.copy(positions[name]);
      controls.target.set(0, -0.15, 0);
      controls.update();
    },
    zoom(factor) {
      const offset = camera.position.clone().sub(controls.target);
      offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, 5, 18));
      camera.position.copy(controls.target).add(offset);
      controls.update();
    },
    active(value) {
      running = value;
      cancelAnimationFrame(frame);
      frame = 0;
      if (value && !disposed) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    },
    dispose() {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(
            (material) => material.dispose(),
          );
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  try {
    const gltf = await new GLTFLoader().loadAsync("/orion-mx/orion_detallado.glb",);
    if (disposed) return api;
    model = new THREE.Group();
    const source = gltf.scene;

// Excluir los dos cubos auxiliares incluidos en esta exportación.
    for (const name of ["Cube", "Cube.001"]) {
     const auxiliary = source.getObjectByName(name);

    if (auxiliary) {
    auxiliary.removeFromParent();

    auxiliary.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.geometry.dispose();

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => material.dispose());
    });
  }
}

// Conservar colores y texturas, recuperando reflejos moderados.
source.traverse((object) => {
  if (!(object instanceof THREE.Mesh)) return;

  const materials = Array.isArray(object.material)
    ? object.material
    : [object.material];

  materials.forEach((material) => {
    if (!(material instanceof THREE.MeshStandardMaterial)) return;

    material.roughness = Math.max(material.roughness, 0.3);

    if (
      material instanceof THREE.MeshPhysicalMaterial &&
      material.metalness < 0.5 &&
      material.specularIntensity === 0
    ) {
      material.specularIntensity = 0.35;
    }

    material.needsUpdate = true;
  });
});
    source.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(source);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z);
    const normalizedAsset = new THREE.Group();
    source.position.sub(center);
    normalizedAsset.scale.setScalar(largestDimension > 0 ? 3.6 / largestDimension : 1);
    normalizedAsset.rotation.y = -0.16;
    normalizedAsset.position.y = -0.7;
    normalizedAsset.add(source);
    model.add(normalizedAsset);
    model.traverse((object) => {
      if (object.name.startsWith("Rotor_")) rotors.push(object);
    });
    scene.add(model);
    controls.update();
    renderer.render(scene, camera);
    options.onReady();
  } catch {
    options.onError();
  }
  return api;
}

export function createOrionScene(
  host: HTMLElement,
  options: { reduced: boolean; onReady: () => void; onError: () => void; onFocus?: (id: string) => void },
) {
  return createInteractiveDroneScene(host, {
    asset: "/orion-mx/orion_detallado.glb",
    label: "Modelo tridimensional interactivo de ORION MX. Selecciona un punto para conocer un componente.",
    points: orionPoints,
    views: orionViews,
    removeNodes: ["Cube", "Cube.001"],
    ...options,
    onFocus: options.onFocus ?? (() => {}),
  });
}
