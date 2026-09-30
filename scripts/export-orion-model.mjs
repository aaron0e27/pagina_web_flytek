import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { makeOrionDrone } from "../lib/orion-mx/drone-model.ts";

globalThis.FileReader = class {
  result = null;
  onloadend = null;
  onerror = null;
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = value;
      this.onloadend?.();
    }).catch((error) => this.onerror?.(error));
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = `data:${blob.type || "application/octet-stream"};base64,${Buffer.from(value).toString("base64")}`;
      this.onloadend?.();
    }).catch((error) => this.onerror?.(error));
  }
};

const { group } = makeOrionDrone();
const binary = await new GLTFExporter().parseAsync(group, { binary: true });
const target = new URL("../public/orion-mx/orion-mx.glb", import.meta.url);
await writeFile(target, Buffer.from(binary));
console.log(`ORION MX exportado: ${fileURLToPath(target)} (${binary.byteLength} bytes)`);
