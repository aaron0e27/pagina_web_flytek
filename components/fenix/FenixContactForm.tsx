"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { PAYLOAD_EVENT, buildContactMailto, CONTACT_EMAIL } from "@/lib/fenix/contact";
export default function FenixContactForm() {
  const [prepared, setPrepared] = useState(false);
  const [payload, setPayload] = useState("");
  useEffect(() => {
    const update = (e: Event) => setPayload(String((e as CustomEvent).detail));
    window.addEventListener(PAYLOAD_EVENT, update);
    return () => window.removeEventListener(PAYLOAD_EVENT, update);
  }, []);
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        window.location.href = buildContactMailto(form, payload);
        setPrepared(true);
      }}
    >
      <div className="form-row">
        <label>
          Nombre
          <input name="name" autoComplete="name" required placeholder="Tu nombre" maxLength={100} />
        </label>
        <label>
          Empresa
          <input
            name="company"
            autoComplete="organization"
            required
            placeholder="Nombre de tu empresa"
            maxLength={140}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Correo electrónico
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="nombre@empresa.com"
            maxLength={180}
          />
        </label>
        <label>
          Teléfono <span>(opcional)</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+52" maxLength={30} />
        </label>
      </div>
      {payload && (
        <p className="selected-integration">
          Integración de interés: <strong>{payload}</strong>
        </p>
      )}
      <label>
        Cuéntanos sobre tu proyecto
        <textarea
          name="message"
          required
          rows={3}
          placeholder="¿Qué necesita hacer tu operación?"
          maxLength={3000}
        />
      </label>
      <div className="form-submit">
        <button className="button primary" type="submit">
          Solicitar información <ArrowUpRight size={18} />
        </button>
        <span>Continúa desde tu aplicación de correo.</span>
      </div>
      {prepared && (
        <p className="form-status" role="status">
          <Check size={16} /> Solicitud preparada. Revisa y envía el mensaje en tu aplicación de
          correo. También puedes escribir a {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  );
}
