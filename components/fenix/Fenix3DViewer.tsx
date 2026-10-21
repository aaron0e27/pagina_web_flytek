import "@/styles/drone-viewer.css";
import { fenixCopy } from "@/lib/fenix/data";
import FenixDroneCanvas from "./FenixDroneCanvas";

export default function Fenix3DViewer() {
  return (
    <section className="v3d" id="explorar" aria-labelledby="fenix-3d-title">
      <div className="v3d__heading">
        <div className="v3d-tag"><span>3D</span> EXPLORACIÓN 3D</div>
        <h2 id="fenix-3d-title" data-motion="text">
          {fenixCopy.viewer.title[0]} {fenixCopy.viewer.title[1]}
        </h2>
        <p>
          {fenixCopy.viewer.description[0]} {fenixCopy.viewer.description[1]}
        </p>
      </div>
      <div className="v3d__stage">
        <FenixDroneCanvas />
      </div>
    </section>
  );
}
