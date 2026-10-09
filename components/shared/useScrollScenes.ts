"use client";
import { useEffect, type RefObject } from "react";
type Page = "home" | "orion" | "vega";
export function useScrollScenes(root: RefObject<HTMLElement | null>, page: Page, enabled = true) {
  useEffect(() => {
    const host = root.current;
    if (!host || !enabled) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(host);
      media.add({ desktop: "(min-width: 1025px) and (min-height: 740px) and (pointer: fine)", small: "(max-width: 1024px), (max-height: 739px), (pointer: coarse)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
        if (context.conditions?.reduce) return;
        const desktop = !!context.conditions?.desktop;
        host.classList.add("scroll-scenes-active");
        if (page === "home") {
          const distance = desktop ? 1 : .7;
          gsap.timeline({ scrollTrigger: { trigger: ".home-hero", start: "top top", end: () => "+=" + innerHeight * (desktop ? 1.05 : .65), pin: desktop, scrub: 1, invalidateOnRefresh: true } })
            .to(".home-word-group", { y: -140 * distance, scale: 1.22, opacity: .12, ease: "none" }, 0)
            .to(".home-hero-video", { scale: 1.2, yPercent: 5, ease: "none" }, 0)
            .to(".home-hero-copy", { y: -90 * distance, ease: "none" }, 0)
            .to(".home-hero-meta, .home-hero-foot", { opacity: .2, ease: "none" }, 0);
        } else if (page === "orion") {
          gsap.timeline({ scrollTrigger: { trigger: ".orion-hero", start: "top top+=58", end: () => "+=" + innerHeight * .9, pin: desktop, scrub: .9, invalidateOnRefresh: true } })
            .to(".orion-hero__title", { xPercent: -8, opacity: .18, ease: "none" }, 0)
            .to(".orion-hero__visual", { scale: 1.12, xPercent: -8, ease: "none" }, 0)
            .to(".orion-hero__grid", { opacity: .15, ease: "none" }, 0);
          gsap.fromTo(".orion-capabilities__line", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".orion-capabilities", start: "top 90%", end: "top 40%", scrub: .9 } });
          const track = host.querySelector<HTMLElement>(".orion-application-list");
          const viewport = host.querySelector<HTMLElement>(".orion-application-viewport");
          if (desktop && track && viewport) gsap.to(track, { x: () => -Math.max(0, track.scrollWidth - viewport.clientWidth + parseFloat(getComputedStyle(viewport).paddingLeft)), ease: "none", scrollTrigger: { trigger: ".orion-applications", start: "top top+=58", end: () => "+=" + Math.max(innerWidth, track.scrollWidth - viewport.clientWidth), pin: true, scrub: .9, invalidateOnRefresh: true } });
        } else {
          gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } })
            .to(".hero h1", { yPercent: 20, opacity: .15, ease: "none" }, 0)
            .to(".hero-product", { yPercent: 14, scale: 1.035, rotation: 2, ease: "none" }, 0)
            .to(".hero-top,.hero-bottom", { opacity: 0, ease: "none" }, 0);
          gsap.fromTo(".product-motion img", { xPercent: -6, yPercent: 6, rotation: -5, scale: .93 }, { xPercent: 4, yPercent: -3, rotation: 3, scale: 1, ease: "none", scrollTrigger: { trigger: ".product-motion", start: "top bottom", end: "bottom top", scrub: 1.2 } });
        }
        const targets = page === "home" ? ".home-company-grid h2, .home-fleet-heading h2, .home-sectors-title h2, .home-support h2, .home-contact h2, .home-application-image, .home-sector-detail>img" : page === "orion" ? ".orion-intro h2, .orion-anatomy h2, .orion-explorer h2, .orion-applications h2, .orion-contact h2, .orion-anatomy__media img" : "h2, .feature-image, .design-image, .performance-stage img";
        gsap.utils.toArray<HTMLElement>(targets, host).forEach(element => {
          gsap.fromTo(element, { y: desktop ? 44 : 32 }, { y: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 95%", end: "top 55%", scrub: 1 } });
        });
        return () => { host.classList.remove("scroll-scenes-active"); };
      });
      let frame = 0;
      const refresh = () => { if (disposed) return; cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); }); };
      if (page !== "home") host.addEventListener("load", refresh, true);
      void document.fonts.ready.then(refresh);
      cleanup = () => { cancelAnimationFrame(frame); host.removeEventListener("load", refresh, true); media.revert(); };
    });
    return () => { disposed = true; cleanup(); };
  }, [root, page, enabled]);
}
