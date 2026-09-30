import FenixPayloadSelector from "./FenixPayloadSelector";
import { fenixCopy } from "@/lib/fenix/data";
export default function FenixPayloads() {
  return (
    <section className="payloads wrap" id="payloads">
      <div className="split-heading">
        <h2 data-motion="text">
          {fenixCopy.payloads.title[0]}
          <br />
          <em>{fenixCopy.payloads.title[1]}</em>
        </h2>
        <p>
          {fenixCopy.payloads.description[0]}
          <br />
          {fenixCopy.payloads.description[1]}
          <span>{fenixCopy.payloads.note}</span>
        </p>
      </div>
      <FenixPayloadSelector />
    </section>
  );
}
