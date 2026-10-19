import SupportSection from "@/components/shared/SupportSection";
import { vegaData } from "@/lib/vega/data";

export function VegaService() {
  return (
    <SupportSection
      variant="vega"
      className="section"
      quoteHref={vegaData.contactHref}
      email={vegaData.email}
      phones={vegaData.phones}
    />
  );
}
