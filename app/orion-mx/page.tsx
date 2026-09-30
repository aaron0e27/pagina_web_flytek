import type { Metadata } from "next";
import OrionPage from "@/components/orion-mx/OrionPage";
import "@/styles/orion.css";
export const metadata:Metadata={title:"ORION MX | Flytek Innovations",description:"Plataforma compacta de Flytek para inspección y operación en espacios reducidos."};
export default function Page(){return <OrionPage />;}
