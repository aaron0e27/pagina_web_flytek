import * as THREE from "three";
/** Generic demonstration model, not engineering geometry or a dimensional representation of FÉNIX. */
export function makeDrone() {
  const group = new THREE.Group();
  group.name = "Representative industrial quadcopter";
  const shell = new THREE.MeshStandardMaterial({
    color: 0xe9edef,
    metalness: 0.32,
    roughness: 0.32,
  });
  const carbon = new THREE.MeshStandardMaterial({
    color: 0x25292d,
    metalness: 0.5,
    roughness: 0.37,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: 0x89949f,
    metalness: 0.8,
    roughness: 0.26,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0xb53227,
    metalness: 0.3,
    roughness: 0.45,
  });
  const lens = new THREE.MeshStandardMaterial({
    color: 0x173b51,
    metalness: 0.8,
    roughness: 0.08,
  });
  function part(
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    name: string,
  ) {
    let m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.name = name;
    group.add(m);
    return m;
  }
  function rod(a: number[], b: number[], radius: number, mat: THREE.Material, name: string) {
    const av = new THREE.Vector3(...a),
      bv = new THREE.Vector3(...b),
      d = bv.clone().sub(av);
    let m = part(
      new THREE.CylinderGeometry(radius, radius, d.length(), 16),
      mat,
      ...(av.clone().add(bv).multiplyScalar(0.5).toArray() as [number, number, number]),
      name,
    );
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  }
  const body = part(new THREE.SphereGeometry(1, 40, 24), shell, 0, 0.3, 0, "Fuselage");
  body.scale.set(0.76, 0.25, 1.05);
  const plate = part(
    new THREE.CylinderGeometry(0.66, 0.69, 0.09, 8),
    carbon,
    0,
    0.07,
    0,
    "Lower structure",
  );
  plate.scale.z = 1.3;
  const top = part(new THREE.BoxGeometry(0.38, 0.12, 0.55), shell, 0, 0.51, -0.15, "Top cover");
  const rotors: THREE.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const x = i % 2 === 0 ? -1.78 : 1.78,
      z = i < 2 ? -1.28 : 1.28;
    rod([x * 0.3, 0.22, z * 0.4], [x, 0.25, z], 0.095, shell, "Arm " + i);
    const motor = part(
      new THREE.CylinderGeometry(0.2, 0.25, 0.28, 24),
      shell,
      x,
      0.32,
      z,
      "Motor " + i,
    );
    part(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 24), metal, x, 0.51, z, "Motor hub " + i);
    const rotor = new THREE.Group();
    rotor.position.set(x, 0.6, z);
    rotor.name = "Rotor_" + i;
    for (let j = 0; j < 2; j++) {
      let blade = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), carbon);
      blade.scale.set(0.79, 0.018, 0.074);
      blade.position.x = j === 0 ? 0.61 : -0.61;
      blade.rotation.y = j === 0 ? -0.12 : 0.12;
      rotor.add(blade);
    }
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 10), carbon);
    cap.scale.y = 0.45;
    rotor.add(cap);
    group.add(rotor);
    rotors.push(rotor);
    rod([x * 0.82, 0.24, z * 0.87], [x * 0.88, 0.24, z * 0.91], 0.103, accent, "Arm collar " + i);
  }
  for (const side of [-1, 1]) {
    for (const z of [-0.65, 0.65])
      rod([side * 0.48, 0.05, z], [side * 0.8, -1.04, z], 0.044, carbon, "Landing strut");
    rod([side * 0.8, -1.04, -1.25], [side * 0.8, -1.04, 1.25], 0.049, carbon, "Landing skid");
    for (const z of [-1.22, 1.22]) {
      let cap = part(
        new THREE.SphereGeometry(0.053, 12, 8),
        accent,
        side * 0.8,
        -1.04,
        z,
        "Skid cap",
      );
    }
  }
  rod([0, 0.03, 0.36], [0, -0.43, 0.36], 0.067, metal, "Payload mount");
  const gimbal = part(
    new THREE.TorusGeometry(0.23, 0.036, 10, 32, Math.PI),
    carbon,
    0,
    -0.46,
    0.38,
    "Gimbal",
  );
  gimbal.rotation.z = Math.PI;
  const camera = part(
    new THREE.SphereGeometry(0.2, 24, 16),
    shell,
    0,
    -0.64,
    0.43,
    "Payload camera",
  );
  camera.scale.set(1, 0.9, 0.9);
  const glass = part(
    new THREE.CylinderGeometry(0.107, 0.107, 0.095, 24),
    lens,
    0,
    -0.64,
    0.6,
    "Camera lens",
  );
  glass.rotation.x = Math.PI / 2;
  rod([0.25, 0.45, -0.32], [0.25, 0.75, -0.32], 0.023, carbon, "Navigation mast");
  part(
    new THREE.CylinderGeometry(0.15, 0.15, 0.035, 24),
    shell,
    0.25,
    0.76,
    -0.32,
    "Navigation unit",
  );
  return { group, rotors };
}
