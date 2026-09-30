"use client";
import { useState, useId, type CSSProperties } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { ArrowUpRight } from "lucide-react";
import { fenixAssets, payloadAsset } from "@/lib/fenix/assets";
import { payloads } from "@/lib/fenix/payloads";
import { selectPayload } from "@/lib/fenix/contact";
export default function FenixPayloadSelector() {
  const markerId = useId().replace(/:/g, "");
  const [keyboard, setKeyboard] = useState(false);
  const [value, setValue] = useState<string>("thermal");
  return (
    <Tabs.Root
      value={value}
      onValueChange={(v) => setValue(String(v))}
      className="payload-tabs"
      data-keyboard={keyboard}
      onKeyDown={() => setKeyboard(true)}
      onPointerDown={() => setKeyboard(false)}
    >
      <Tabs.List className="payload-list" aria-label="Explorar cargas útiles">
        {payloads.map((p) => (
          <Tabs.Tab value={p.id} key={p.id} className="payload-tab">
            {p.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {payloads.map((p) => (
        <Tabs.Panel value={p.id} key={p.id} className="payload-panel">
          <div className="payload-stage" data-payload={p.id}>
            <span className="integration-tag">{p.integrationLabel}</span>
            <div className="payload-product-box">
              <img
                className="payload-drone"
                src={fenixAssets.product}
                alt="Plataforma FÉNIX"
                width="1800"
                height="894"
                loading="lazy"
              />
            </div>
            {p.image ? (
              <figure className="payload-closeup">
                <img
                  src={payloadAsset(p.image)}
                  alt={p.label + " — recurso de Flytek"}
                  width="240"
                  height="240"
                  loading="lazy"
                />
                <figcaption>
                  {p.label}
                  <span>Imagen representativa</span>
                </figcaption>
              </figure>
            ) : (
              <div className="custom-integration">
                <span>+</span>
                <p>
                  Integración definida
                  <br />
                  para tu proyecto.
                </p>
              </div>
            )}
            <svg
              className="payload-connector"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id={markerId + "-" + p.id}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </marker>
              </defs>
              <path
                className="connector-path connector-desktop"
                pathLength="1"
                d={p.connectorPath}
                markerEnd={"url(#" + markerId + "-" + p.id + ")"}
              />
              <path
                className="connector-path connector-mobile"
                pathLength="1"
                d={p.mobileConnectorPath}
                markerEnd={"url(#" + markerId + "-" + p.id + ")"}
              />
            </svg>
            <span
              className="payload-target"
              style={
                {
                  left: p.target[0] + "%",
                  "--target-y": p.target[1] + "%",
                  "--target-y-mobile": p.mobileTarget[1] + "%",
                } as CSSProperties
              }
              aria-hidden="true"
            />
          </div>
          <div className="payload-description">
            <span className="section-index">INTEGRACIÓN / {p.name.toUpperCase()}</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={"#contacto"} onClick={() => selectPayload(p.name)} className="text-link">
              Definir mi integración <ArrowUpRight size={18} />
            </a>
          </div>
        </Tabs.Panel>
      ))}
      <p className="configuration-note">
        Las configuraciones mostradas son representativas. La integración final se define de acuerdo
        con los requerimientos técnicos de cada proyecto.
      </p>
    </Tabs.Root>
  );
}
