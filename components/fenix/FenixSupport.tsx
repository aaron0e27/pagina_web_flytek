import { fenixCopy, fenixSupport } from "@/lib/fenix/data";
export default function FenixSupport() {
  return (
    <section className="support" id="soporte">
      <div className="wrap">
        <div className="support-title">
          <span className="section-index" data-motion="tech">
            {fenixCopy.support.label}
          </span>
          <h2 data-motion="text">
            {fenixCopy.support.title[0]}
            <br />
            <em>{fenixCopy.support.title[1]}</em>
          </h2>
        </div>
        <div className="support-grid">
          {fenixSupport.map((item, index) => (
            <article key={item.title}>
              <div
                className={"support-image" + (item.pending ? " is-pending" : "")}
                data-motion="image"
              >
                <img src={item.image} alt={item.alt} width="1200" height="800" loading="lazy" />
                {item.pending && <span>[IMAGEN PENDIENTE]</span>}
              </div>
              <div className="support-copy">
                <span>{String(index + 1).padStart(2, "0")} /</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
