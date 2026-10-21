    import SupportSection from "@/components/shared/SupportSection";
    export default function FenixSupport() {
      return (
        <SupportSection variant="fenix"
          quoteHref="mailto:info@flytek.com.mx?subject=Cotizaci%C3%B3n%20F%C3%89NIX"
          email="info@flytek.com.mx"
          phones={["+52 56 5440 7312", "+52 55 2218 8546"]} />
      );
    }