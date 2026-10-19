import SupportSection from "@/components/shared/SupportSection";

export default function OrionSupport() {
  return (
    <SupportSection
      variant="orion"
      num="07"
      className="orion-support"
      quoteHref="mailto:info@flytek.com.mx?subject=Cotizacion%20ORION%20MX"
      email="info@flytek.com.mx"
      phones={["+52 56 5440 7312", "+52 55 2218 8546"]}
    />
  );
}
