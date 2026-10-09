import { fenixCopy } from "@/lib/fenix/data";
import FenixDroneCanvas from "./FenixDroneCanvas";

export default function FenixDroneEntrance() {
  return (
    <section className="arrival" id="vuelo">
      <div className="arrival-text wrap">
        <span className="section-index">{fenixCopy.entrance.label}</span>
        <h2 data-motion="text">
          {fenixCopy.entrance.title[0]}
          <br />
          <em>{fenixCopy.entrance.title[1]}</em>
        </h2>
      </div>
      <FenixDroneCanvas arrival />
      <div className="arrival-bottom wrap">
        <span>ASCENSO CONTROLADO / HOVER ESTABLE</span>
        <span>MOVIMIENTO ILUSTRATIVO</span>
      </div>
    </section>
  );
}
