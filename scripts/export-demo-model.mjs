import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { makeDrone } from '../lib/fenix/drone-model.ts';

// GLTFExporter usa FileReader en el navegador. Este adaptador solo se emplea
// en el script Node para serializar el GLB de demostración incluido.
globalThis.FileReader = class {
  result = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    }).catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(result).toString('base64')}`;
      this.onloadend?.();
    }).catch((error) => this.onerror?.(error));
  }
};

const { group } = makeDrone();
const binary = await new GLTFExporter().parseAsync(group, { binary: true });
const target = new URL('../public/fenix/media/drone.glb', import.meta.url);
await writeFile(target, Buffer.from(binary));
console.log(`Modelo genérico exportado: ${fileURLToPath(target)} (${binary.byteLength} bytes)`);
