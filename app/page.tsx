import type { Metadata } from "next";
import FlytekPrincipal from "@/components/principal/FlytekPrincipal";
import "@/styles/fenix.css";
import "@/styles/principal.css";
import "@/styles/motion-polish.css";
import "@/styles/scroll-scenes.css";

export const metadata: Metadata = { title: "Flytek Innovations | Ingeniería que eleva tu operación", description: "Drones industriales, integración y soporte en México. Conoce FÉNIX, ORION MX y VEGA." };

export default function Home() {
  return <FlytekPrincipal />;
}

