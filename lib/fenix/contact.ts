import { fenixCopy } from "./data";
export const PAYLOAD_EVENT = "fenix-payload";
export const CONTACT_EMAIL = fenixCopy.contact.email;

/** Se llama desde el selector en el navegador. */
export function selectPayload(name: string) {
  window.dispatchEvent(new CustomEvent(PAYLOAD_EVENT, { detail: name }));
}

/** Prepara el correo; no envía mensajes ni simula una respuesta del servidor. */
export function buildContactMailto(form: FormData, payload: string) {
  const subject = "Información sobre FÉNIX — " + form.get("company");
  const body = [
    "Nombre: " + form.get("name"),
    "Empresa: " + form.get("company"),
    "Correo: " + form.get("email"),
    "Teléfono: " + (form.get("phone") || "No indicado"),
    "",
    "Integración de interés: " + (payload || "Por definir"),
    "",
    "Proyecto:",
    String(form.get("message") || ""),
  ].join("\n");
  return (
    "mailto:" +
    CONTACT_EMAIL +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
}
