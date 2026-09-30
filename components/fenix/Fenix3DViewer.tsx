import { fenixCopy } from "@/lib/fenix/data";
import FenixDroneCanvas from "./FenixDroneCanvas";

export default function Fenix3DViewer() {
  return (
    <section className="explore" id="explorar">
      <div className="wrap explore-heading">
        <h2 data-motion="text">
          {fenixCopy.viewer.title[0]}
          <br />
          {fenixCopy.viewer.title[1]}
        </h2>
        <div>
          <p>
            {fenixCopy.viewer.description[0]}
            <br />
            {fenixCopy.viewer.description[1]}
          </p>
          <span className="section-index">ARRASTRA. GIRA. DESCUBRE.</span>
        </div>
      </div>
      <div className="wrap fenix-viewer-wrap" data-motion="image">
        <FenixDroneCanvas />
      </div>
      <p className="asset-disclaimer wrap">
        Modelo tridimensional de FÉNIX. La configuración final puede variar según la integración.
      </p>
    </section>
  );
}
