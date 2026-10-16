"use client";

// Instrumentos SVG de la sección 01: reloj (autonomía), radar (alcance), velocímetro y balanza (peso).
// Los colores salen de variables CSS (--pi-*), así se ven bien en modo claro y oscuro.
import type { OrionMetric } from "@/lib/orion-mx/data";

type Props = { id: OrionMetric["id"]; variant: number };

function Clock({ variant }: { variant: number }) {
  const min = variant === 0 ? 50 : 30;
  const len = 2 * Math.PI * 108;
  return (
    <svg viewBox="0 0 240 240" className="orion-pi" aria-hidden="true" key={variant}>
      <circle className="pi-face" cx="120" cy="120" r="100" />
      <circle className="pi-track" cx="120" cy="120" r="108" />
      <circle className="pi-ring" cx="120" cy="120" r="108" style={{ ["--len" as string]: len, ["--on" as string]: (len * min) / 60 }} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} className="pi-tick" x1="120" y1="29" x2="120" y2={i % 3 === 0 ? 43 : 37} transform={`rotate(${i * 30} 120 120)`} />
      ))}
      <text className="pi-label" x="120" y="64" textAnchor="middle">60</text>
      <text className="pi-label" x="120" y="190" textAnchor="middle">30</text>
      <g className="pi-hand pi-hand--m" style={{ ["--to" as string]: `${(min / 60) * 360}deg` }}>
        <line x1="120" y1="128" x2="120" y2="50" />
      </g>
      <g className="pi-sec"><line x1="120" y1="132" x2="120" y2="42" /></g>
      <circle className="pi-hub" cx="120" cy="120" r="5" />
    </svg>
  );
}

function Radar({ variant }: { variant: number }) {
  const far = variant === 1;
  const r = far ? 96 : 40; // distancia del objetivo
  return (
    <svg viewBox="0 0 240 240" className="orion-pi" aria-hidden="true" key={variant}>
      <circle className="pi-face" cx="120" cy="120" r="108" />
      {[36, 72, 108].map((rad) => <circle key={rad} className="pi-track pi-track--thin" cx="120" cy="120" r={rad} />)}
      <line className="pi-track pi-track--thin" x1="12" y1="120" x2="228" y2="120" />
      <line className="pi-track pi-track--thin" x1="120" y1="12" x2="120" y2="228" />
      <g className="pi-sweep"><path d="M120 120 L120 12 A108 108 0 0 1 196 44 Z" /></g>
      <circle className="pi-ring pi-ring--soft" cx="120" cy="120" r={r} style={{ ["--len" as string]: 2 * Math.PI * r, ["--on" as string]: 2 * Math.PI * r }} />
      <g className="pi-blip" style={{ transform: `translate(${120 + r * 0.7}px, ${120 - r * 0.7}px)` }}>
        <circle className="pi-solid" r="5" /><circle className="pi-blip-ring" r="5" />
      </g>
      <text className="pi-label" x="124" y="112" >{far ? "10" : "5"}</text>
      <text className="pi-label" x="124" y="40">{far ? "40" : "10"}</text>
      <circle className="pi-hub" cx="120" cy="120" r="5" />
    </svg>
  );
}

function Wind() {
  return (
    <svg viewBox="0 0 240 240" className="orion-pi" aria-hidden="true">
      <circle className="pi-track pi-arc-track" cx="120" cy="120" r="108" />
      <circle className="pi-ring pi-arc" cx="120" cy="120" r="108" />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} className="pi-tick" x1="120" y1="12" x2="120" y2={i % 2 === 0 ? 24 : 19} transform={`rotate(${-135 + i * 30} 120 120)`} />
      ))}
      <g className="pi-gusts">
        <line x1="22" y1="86" x2="82" y2="86" />
        <line x1="30" y1="154" x2="96" y2="154" />
        <line x1="14" y1="120" x2="54" y2="120" />
      </g>
      <line className="pi-mast" x1="120" y1="120" x2="120" y2="206" />
      <g className="pi-cups">
        {[0, 120, 240].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 120 120)`}>
            <line className="pi-arm" x1="120" y1="120" x2="120" y2="64" />
            <path className="pi-cup" d="M104 64 a16 16 0 0 0 32 0 z" />
          </g>
        ))}
      </g>
      <circle className="pi-hub" cx="120" cy="120" r="8" />
    </svg>
  );
}

function Scale({ variant }: { variant: number }) {
  const heavy = variant === 1;
  return (
    <svg viewBox="0 0 240 240" className="orion-pi" aria-hidden="true" key={variant}>
      <path className="pi-base" d="M86 214 h68 M120 214 V74" />
      <circle className="pi-hub" cx="120" cy="64" r="7" />
      <g className="pi-beam">
        <line className="pi-arm" x1="36" y1="64" x2="204" y2="64" />
        <g className="pi-pan" style={{ transformOrigin: "36px 64px" }}>
          <path className="pi-string" d="M36 64 L12 140 M36 64 L60 140" />
          <path className="pi-cup" d="M6 140 h60 a30 22 0 0 1 -60 0 z" />
          <g className="pi-drone" transform="translate(36 118)">
            <line x1="-15" y1="-9" x2="15" y2="9" /><line x1="-15" y1="9" x2="15" y2="-9" />
            <circle cx="-15" cy="-9" r="5" /><circle cx="15" cy="-9" r="5" />
            <circle cx="-15" cy="9" r="5" /><circle cx="15" cy="9" r="5" />
            <rect x="-6" y="-4" width="12" height="8" rx="2" className="pi-solid" />
          </g>
          {heavy && <rect className="pi-solid" x="30" y="125" width="12" height="8" rx="1.5" transform="translate(0 10)" />}
        </g>
        <g className="pi-pan" style={{ transformOrigin: "204px 64px" }}>
          <path className="pi-string" d="M204 64 L180 140 M204 64 L228 140" />
          <path className="pi-cup" d="M174 140 h60 a30 22 0 0 1 -60 0 z" />
          <rect className="pi-weight" x="188" y="116" width="32" height="24" rx="3" />
          <text className="pi-wtext" x="204" y="132" textAnchor="middle">{heavy ? "3.3" : "3.0"}</text>
        </g>
      </g>
    </svg>
  );
}

function Dimensions({ variant }: { variant: number }) {
  const top = variant === 0;
  return (
    <svg viewBox="0 0 240 240" className="orion-pi" aria-hidden="true" key={variant}>
      {top ? <>
        <g className="pi-plan"><rect className="pi-face" x="66" y="70" width="108" height="108" />
          <line className="pi-arm" x1="66" y1="70" x2="174" y2="178" /><line className="pi-arm" x1="174" y1="70" x2="66" y2="178" />
          {[[66,70],[174,70],[66,178],[174,178]].map(([x,y]) => <circle key={`${x}${y}`} className="pi-rotor" cx={x} cy={y} r="18" />)}
          <rect className="pi-solid" x="106" y="110" width="28" height="28" rx="5" /></g>
        <g className="pi-dim pi-dim--h"><line x1="45" y1="38" x2="195" y2="38" /><line x1="45" y1="30" x2="45" y2="46" /><line x1="195" y1="30" x2="195" y2="46" /><text x="120" y="29" textAnchor="middle">0.86 m</text></g>
      </> : <>
        <g className="pi-plan"><rect className="pi-solid" x="92" y="112" width="56" height="25" rx="7" /><line className="pi-arm" x1="42" y1="106" x2="198" y2="106" /><path className="pi-arm" d="M104 137v22 M136 137v22 M92 159h24 M124 159h24" /></g>
        <g className="pi-dim pi-dim--v pi-dim--alto"><line x1="205" y1="100" x2="205" y2="160" /><line x1="197" y1="100" x2="213" y2="100" /><line x1="197" y1="160" x2="213" y2="160" /><text x="194" y="134" textAnchor="end">0.44 m</text></g>
      </>}
    </svg>
  );
}

export function OrionInstrument({ id, variant }: Props) {
  if (id === "autonomia") return <Clock variant={variant} />;
  if (id === "alcance") return <Radar variant={variant} />;
  if (id === "viento") return <Wind />;
  if (id === "peso") return <Scale variant={variant} />;
  return <Dimensions variant={variant} />;
}
