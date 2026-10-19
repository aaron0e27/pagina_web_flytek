#!/usr/bin/env node
// Quita de styles/*.css las reglas cuyas clases NO aparecen en ningún .ts/.tsx.
// Uso:  node scripts/prune-css.mjs          -> solo muestra qué quitaría (no modifica nada)
//       node scripts/prune-css.mjs --write  -> aplica los cambios
// Seguro por diseño: ignora clases is-*/has-*, nombres dinámicos (`algo-${x}`) y selectores con :is() :where() :not() :has().
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const WRITE = process.argv.includes("--write");
const KEEP = new Set((process.argv.find((a) => a.startsWith("--keep="))?.slice(7) ?? "").split(",").filter(Boolean));

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "public"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}
const code = walk(root).map((p) => fs.readFileSync(p, "utf8")).join("\n");
const toks = new Set(code.match(/[A-Za-z0-9_-]+/g));
const dyn = [...code.matchAll(/[`"']([A-Za-z0-9_-]+-)\$\{/g)].map((m) => m[1]);
const isDead = (c) => !toks.has(c) && !/^(is|has)-/.test(c) && !dyn.some((d) => c.startsWith(d)) && !KEEP.has(c);

const skipStr = (s, i) => { const q = s[i]; i++; while (i < s.length) { if (s[i] === "\\") { i += 2; continue; } if (s[i] === q) return i + 1; i++; } return i; };
const stripStr = (x) => x.replace(/"[^"]*"|'[^']*'|\[[^\]]*\]|\d+\.\d+/g, "");
function splitSel(p) { const parts = []; let d = 0, cur = ""; for (const ch of p) { if ("([".includes(ch)) d++; else if (")]".includes(ch)) d--; if (ch === "," && d === 0) { parts.push(cur); cur = ""; } else cur += ch; } parts.push(cur); return parts; }

function prune(s, st) {
  const n = s.length;
  const blockEnd = (i) => { let d = 0; while (i < n) { const ch = s[i]; if (ch === '"' || ch === "'") { i = skipStr(s, i); continue; } if (s.startsWith("/*", i)) { i = s.indexOf("*/", i) + 2; continue; } if (ch === "{") d++; else if (ch === "}") { d--; if (d === 0) return i + 1; } i++; } return n; };
  const walkCss = (a, b) => {
    const res = []; let i = a;
    while (i < b) {
      const m = /\s*/y; m.lastIndex = i; const ws = m.exec(s)[0]; const j = m.lastIndex;
      if (j >= b) { res.push(s.slice(i, b)); break; }
      if (s.startsWith("/*", j)) { const e = s.indexOf("*/", j) + 2; res.push(s.slice(i, e)); i = e; continue; }
      let k = j;
      while (k < b && s[k] !== "{" && s[k] !== ";") {
        if (s[k] === '"' || s[k] === "'") { k = skipStr(s, k); continue; }
        if (s[k] === "(") { let d = 0; while (k < b) { if (s[k] === "(") d++; else if (s[k] === ")") { d--; if (d === 0) break; } k++; } }
        k++;
      }
      if (k >= b || s[k] === ";") { res.push(s.slice(i, Math.min(k + 1, b))); i = Math.min(k + 1, b); continue; }
      const prelude = s.slice(j, k); const e = blockEnd(k);
      if (prelude.trimStart().startsWith("@")) {
        if (/^@(media|supports|layer|container)/.test(prelude.trimStart())) {
          const inner = walkCss(k + 1, e - 1);
          if (inner.trim()) res.push(ws + prelude + "{" + inner + "}"); else st.empty++;
        } else res.push(s.slice(i, e));
      } else {
        const sels = splitSel(prelude);
        const keep = sels.filter((x) => /:(is|where|not|has)\(/.test(x) || !(stripStr(x).match(/\.(-?[A-Za-z_][\w-]*)/g) ?? []).some((c) => isDead(c.slice(1))));
        if (!keep.length) st.rules++;
        else if (keep.length === sels.length) res.push(s.slice(i, e));
        else { st.sels += sels.length - keep.length; res.push(ws + keep.map((x) => x.trim()).join(",") + s.slice(k, e)); }
      }
      i = e;
    }
    return res.join("");
  };
  return walkCss(0, n);
}

let total = 0;
for (const f of fs.readdirSync(path.join(root, "styles")).filter((f) => f.endsWith(".css"))) {
  const p = path.join(root, "styles", f);
  const s = fs.readFileSync(p, "utf8");
  const st = { rules: 0, sels: 0, empty: 0 };
  const o = prune(s, st).replace(/\n{3,}/g, "\n\n");
  const saved = Buffer.byteLength(s) - Buffer.byteLength(o); total += saved;
  console.log(`${f.padEnd(28)} ${(saved / 1024).toFixed(1).padStart(6)} KB  (${st.rules} reglas, ${st.sels} selectores sueltos, ${st.empty} bloques @media vacíos)`);
  if (WRITE && saved > 0) fs.writeFileSync(p, o);
}
console.log(`\nTotal ahorrado: ${(total / 1024).toFixed(1)} KB ${WRITE ? "(APLICADO)" : "(simulación: usa --write para aplicar)"}`);
