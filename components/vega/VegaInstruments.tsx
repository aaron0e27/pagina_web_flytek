"use client";

// Instrumentos SVG por métrica: reloj, anemómetro, balanza y cota.
// Los colores salen de variables CSS (--pi-*) para verse bien en modo claro y oscuro.
import type { PerfMetric } from "@/lib/vega/performance-data";
import { OrionInstrument } from "@/components/orion-mx/OrionInstruments";

type Props = { id: PerfMetric["id"]; variant: number };

function Clock({ variant }: { variant: number }) {
  const min = variant === 0 ? 90 : 60;
  const hour = (min / 60) * 30; // grados de la manecilla de horas
  const minute = (min / 60) * 360; // vueltas de la manecilla de minutos
  const len = 2 * Math.PI * 108;
  return (
    <svg viewBox="0 0 240 240" className="vega-pi" aria-hidden="true" key={variant}>
      <circle className="pi-face" cx="120" cy="120" r="100" />
      <circle className="pi-track" cx="120" cy="120" r="108" />
      <circle
        className="pi-ring"
        cx="120" cy="120" r="108"
        style={{ ["--len" as string]: len, ["--on" as string]: (len * min) / 90 }}
      />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} className="pi-tick" x1="120" y1="29" x2="120" y2={i % 3 === 0 ? 43 : 37} transform={`rotate(${i * 30} 120 120)`} />
      ))}
      <text className="pi-label" x="120" y="62" textAnchor="middle">12</text>
      <g className="pi-hand pi-hand--h" style={{ ["--to" as string]: `${hour}deg` }}>
        <line x1="120" y1="120" x2="120" y2="78" />
      </g>
      <g className="pi-hand pi-hand--m" style={{ ["--to" as string]: `${minute}deg` }}>
        <line x1="120" y1="126" x2="120" y2="50" />
      </g>
      <g className="pi-sec"><line x1="120" y1="132" x2="120" y2="42" /></g>
      <circle className="pi-hub" cx="120" cy="120" r="5" />
    </svg>
  );
}

function Wind() {
  return (
    <svg viewBox="0 0 240 240" className="vega-pi" aria-hidden="true">
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
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a} 120 120)`}>
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
    <svg viewBox="0 0 240 240" className="vega-pi" aria-hidden="true" key={variant}>
      <path className="pi-base" d="M86 214 h68 M120 214 V74" />
      <circle className="pi-hub" cx="120" cy="64" r="7" />
      <g className="pi-beam">
        <line className="pi-arm" x1="36" y1="64" x2="204" y2="64" />
        {/* plato izquierdo: dron (y carga) */}
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
        {/* plato derecho: pesas */}
        <g className="pi-pan" style={{ transformOrigin: "204px 64px" }}>
          <path className="pi-string" d="M204 64 L180 140 M204 64 L228 140" />
          <path className="pi-cup" d="M174 140 h60 a30 22 0 0 1 -60 0 z" />
          <rect className="pi-weight" x="190" y="118" width="28" height="22" rx="3" />
          <text className="pi-wtext" x="204" y="133" textAnchor="middle">6 kg</text>
          {heavy && (
            <>
              <rect className="pi-weight pi-weight--s" x="196" y="104" width="16" height="14" rx="2" />
              <text className="pi-wtext pi-wtext--s" x="204" y="114" textAnchor="middle">0.5</text>
            </>
          )}
        </g>
      </g>
    </svg>
  );
}

function Ruler({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 240 240" className="vega-pi" aria-hidden="true" key={variant}>
      {variant === 0 ? (
        <>
          <g className="pi-plan">
            <rect className="pi-face" x="62" y="68" width="116" height="116" />
            <line className="pi-arm" x1="62" y1="68" x2="178" y2="184" /><line className="pi-arm" x1="178" y1="68" x2="62" y2="184" />
            {[[62, 68], [178, 68], [62, 184], [178, 184]].map(([x, y]) => (
              <circle key={`${x}${y}`} className="pi-rotor" cx={x} cy={y} r="19" />
            ))}
            <rect className="pi-solid" x="106" y="112" width="28" height="28" rx="6" />
          </g>
          <g className="pi-dim pi-dim--h"><line x1="43" y1="38" x2="197" y2="38" /><line x1="43" y1="30" x2="43" y2="46" /><line x1="197" y1="30" x2="197" y2="46" /><text x="120" y="30" textAnchor="middle">1.23 m</text></g>
          <g className="pi-dim pi-dim--v"><line x1="214" y1="49" x2="214" y2="203" /><line x1="206" y1="49" x2="222" y2="49" /><line x1="206" y1="203" x2="222" y2="203" /></g>
        </>
      ) : (
        <>
          <g className="pi-plan">
            <rect className="pi-solid" x="92" y="112" width="56" height="26" rx="8" />
            <line className="pi-arm" x1="40" y1="108" x2="200" y2="108" />
            <path className="pi-arm" d="M104 138 v22 M136 138 v22 M92 160 h24 M124 160 h24" />
            <line className="pi-arm" x1="120" y1="112" x2="120" y2="100" />
            <ellipse className="pi-rotor" cx="64" cy="104" rx="24" ry="4" /><ellipse className="pi-rotor" cx="176" cy="104" rx="24" ry="4" />
          </g>
          <g className="pi-dim pi-dim--v pi-dim--alto"><line x1="214" y1="100" x2="214" y2="160" /><line x1="206" y1="100" x2="222" y2="100" /><line x1="206" y1="160" x2="222" y2="160" /><text x="204" y="134" textAnchor="end">0.51 m</text></g>
        </>
      )}
    </svg>
  );
}

export function VegaInstrument({ id, variant }: Props) {
  if (id === "autonomia") return <Clock variant={variant} />;
  if (id === "alcance") return <OrionInstrument id="alcance" variant={variant} />;
  if (id === "viento") return <Wind />;
  if (id === "peso") return <Scale variant={variant} />;
  return <Ruler variant={variant} />;
}
