import { fenixApplications, fenixCopy } from "@/lib/fenix/data";
export default function FenixApplications() {
  return (
    <section className="applications" id="aplicaciones">
      <div className="wrap">
        <div className="split-heading">
          <h2 data-motion="text">
            {fenixCopy.applications.title[0]}
            <br />
            {fenixCopy.applications.title[1]}
          </h2>
          <p>
            {fenixCopy.applications.description[0]}
            <br />
            {fenixCopy.applications.description[1]}
          </p>
        </div>
        <div className="applications-grid">
          {fenixApplications.map((item, index) => (
            <article
              key={item.id}
              className={index === 0 ? "application-main" : ""}
              data-motion="image"
            >
              <img src={item.image} alt={item.alt} width="1200" height="800" loading="lazy" />
              <div>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p id={"application-" + item.id}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
