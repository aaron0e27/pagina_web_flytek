import * as THREE from "three";

/**
 * Modelo visual de ORION MX construido a partir de las fotografías proporcionadas.
 * No representa medidas de fabricación ni sustituye el CAD de Fusion 360.
 */
export function makeOrionDrone() {
  const drone = new THREE.Group();
  drone.name = "ORION_MX_visual_reference";
  drone.userData = {
    product: "ORION MX",
    purpose: "Web visualisation",
    disclaimer: "Reference geometry based on product photographs; not engineering CAD",
  };

  const carbon = new THREE.MeshStandardMaterial({ color: 0x171a1d, metalness: 0.55, roughness: 0.34 });
  const shell = new THREE.MeshStandardMaterial({ color: 0x202429, metalness: 0.35, roughness: 0.3 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x080a0c, metalness: 0.62, roughness: 0.28 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x727980, metalness: 0.88, roughness: 0.22 });
  const orange = new THREE.MeshStandardMaterial({ color: 0xe26724, metalness: 0.12, roughness: 0.42 });
  const lens = new THREE.MeshStandardMaterial({ color: 0x071c29, metalness: 0.7, roughness: 0.08 });
  const white = new THREE.MeshStandardMaterial({ color: 0xe7eaec, metalness: 0.25, roughness: 0.35 });

  const part = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: [number, number, number],
    name: string,
  ) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.name = name;
    drone.add(mesh);
    return mesh;
  };

  const rod = (
    from: [number, number, number],
    to: [number, number, number],
    radius: number,
    material: THREE.Material,
    name: string,
  ) => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = end.clone().sub(start);
    const mesh = part(
      new THREE.CylinderGeometry(radius, radius, direction.length(), 16),
      material,
      start.clone().add(end).multiplyScalar(0.5).toArray() as [number, number, number],
      name,
    );
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return mesh;
  };

  // Cuerpo compacto y facetado característico de ORION.
  const hull = part(new THREE.DodecahedronGeometry(0.88, 0), shell, [0, 0.28, 0], "Faceted_fuselage");
  hull.scale.set(1.25, 0.62, 1.02);
  const belly = part(new THREE.BoxGeometry(1.42, 0.22, 1.05), edge, [0, -0.19, 0.05], "Lower_electronics_bay");
  belly.rotation.y = Math.PI / 4;
  const rearDeck = part(new THREE.BoxGeometry(0.95, 0.17, 0.55), carbon, [0, 0.65, -0.2], "Upper_deck");
  rearDeck.rotation.y = Math.PI / 4;

  // Cuatro brazos largos en X con collarines claros, como en las fotografías.
  const armPoints: Array<[number, number, number]> = [
    [-2.38, 0.32, -1.58],
    [2.38, 0.32, -1.58],
    [-2.38, 0.32, 1.58],
    [2.38, 0.32, 1.58],
  ];
  const rotors: THREE.Group[] = [];
  armPoints.forEach(([x, y, z], index) => {
    const inner: [number, number, number] = [Math.sign(x) * 0.48, 0.3, Math.sign(z) * 0.38];
    rod(inner, [x, y, z], 0.075, carbon, `Carbon_arm_${index + 1}`);
    const collarPoint: [number, number, number] = [x * 0.63, y, z * 0.63];
    const collar = part(new THREE.CylinderGeometry(0.115, 0.115, 0.3, 16), white, collarPoint, `Arm_collar_${index + 1}`);
    collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, 0, z).normalize());

    part(new THREE.CylinderGeometry(0.22, 0.25, 0.3, 24), edge, [x, y + 0.08, z], `Motor_${index + 1}`);
    part(new THREE.CylinderGeometry(0.14, 0.17, 0.12, 24), metal, [x, y + 0.29, z], `Motor_hub_${index + 1}`);

    const rotor = new THREE.Group();
    rotor.name = `Rotor_${index + 1}`;
    rotor.position.set(x, y + 0.39, z);
    const bladeGeometry = new THREE.SphereGeometry(1, 24, 8);
    for (const direction of [-1, 1]) {
      const blade = new THREE.Mesh(bladeGeometry, carbon);
      blade.name = `Propeller_${index + 1}_${direction > 0 ? "A" : "B"}`;
      blade.scale.set(0.92, 0.018, 0.085);
      blade.position.x = direction * 0.72;
      blade.rotation.y = direction * 0.1;
      rotor.add(blade);
    }
    drone.add(rotor);
    rotors.push(rotor);
  });

  // Patines altos con refuerzos diagonales.
  for (const side of [-1, 1]) {
    const x = side * 0.72;
    rod([x * 0.65, -0.12, -0.52], [x, -1.28, -0.95], 0.045, carbon, `Landing_strut_${side}_rear`);
    rod([x * 0.65, -0.12, 0.52], [x, -1.28, 0.95], 0.045, carbon, `Landing_strut_${side}_front`);
    rod([x, -1.28, -1.34], [x, -1.28, 1.34], 0.055, carbon, `Landing_skid_${side}`);
  }
  rod([-0.72, -1.28, 1.12], [0.72, -1.28, 1.12], 0.032, carbon, "Front_skid_brace");

  // Mástil GNSS y antena superior.
  rod([0.12, 0.62, -0.24], [0.12, 1.18, -0.24], 0.055, carbon, "GNSS_mast");
  part(new THREE.CylinderGeometry(0.29, 0.29, 0.1, 32), shell, [0.12, 1.22, -0.24], "GNSS_antenna");
  part(new THREE.CylinderGeometry(0.22, 0.24, 0.035, 32), white, [0.12, 1.28, -0.24], "GNSS_top");

  // Cámara estabilizada, cableado visible y sensores inferiores.
  rod([0, -0.18, 0.25], [0, -0.56, 0.37], 0.06, metal, "Gimbal_mount");
  const gimbal = part(new THREE.TorusGeometry(0.25, 0.04, 12, 32, Math.PI * 1.45), edge, [0, -0.62, 0.38], "Camera_gimbal");
  gimbal.rotation.z = Math.PI;
  const camera = part(new THREE.SphereGeometry(0.23, 24, 16), shell, [0, -0.78, 0.46], "Inspection_camera");
  camera.scale.set(1, 0.9, 1.05);
  const glass = part(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 24), lens, [0, -0.78, 0.66], "Camera_lens");
  glass.rotation.x = Math.PI / 2;
  rod([-0.3, -0.12, 0.25], [-0.28, -0.56, 0.4], 0.026, orange, "Power_cable_left");
  rod([0.3, -0.12, 0.25], [0.28, -0.56, 0.4], 0.026, orange, "Power_cable_right");
  part(new THREE.BoxGeometry(0.34, 0.28, 0.32), edge, [0.52, -0.4, 0.1], "Lower_sensor_module");

  return { group: drone, rotors };
}
