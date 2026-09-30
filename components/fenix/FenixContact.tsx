import { ArrowUpRight } from "lucide-react";
import { fenixCopy } from "@/lib/fenix/data";
import FenixContactForm from "./FenixContactForm";

export default function FenixContact() {
  return (
    <section className="contact wrap" id="contacto">
      <div className="contact-heading">
        <span className="section-index">{fenixCopy.contact.label}</span>
        <h2 data-motion="text">
          {fenixCopy.contact.title[0]}
          <br />
          {fenixCopy.contact.title[1]}
          <span>.</span>
        </h2>
        <p>
          {fenixCopy.contact.description[0]}
          <br />
          {fenixCopy.contact.description[1]}
        </p>
        <a href={"mailto:" + fenixCopy.contact.email} className="contact-email">
          {fenixCopy.contact.email} <ArrowUpRight size={20} />
        </a>
        <a href={fenixCopy.contact.phoneHref} className="contact-phone">
          {fenixCopy.contact.phone}
        </a>
      </div>
      <FenixContactForm />
    </section>
  );
}
