"use client";
import { useEffect } from "react";
import {
  fenixMotion as timing,
  PRODUCT_SCROLL_EVENT,
  PRODUCT_REPLAY_EVENT,
} from "@/lib/fenix/motion";

/** Owns all scroll effects. Each media context reverts its styles and pin spacer. */
export default function FenixAnimations() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".fenix-page");
    if (!root) return;
    let disposed = false,
      cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const nav = root.querySelector<HTMLElement>(".product-nav")!;
        const section = root.querySelector<HTMLElement>(".engineering")!;
        const track = root.querySelector<HTMLElement>(".engineering-track")!;
        const panels = Array.from(track.children) as HTMLElement[];
        const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-section]"));
        const navHeight = () => nav.offsetHeight;
        let horizontal: gsap.core.Tween | undefined;
        let frame = 0,
          activeId = "",
          lastScrollAt = 0;
        let refreshTimer: ReturnType<typeof setTimeout>;
        function updateActive() {
          frame = 0;
          if (disposed) return;
          const top = navHeight() + 90;
          let id = "descripcion";
          for (const link of links) {
            const target = document.getElementById(link.dataset.section!);
            if (
              target &&
              !target.closest(".engineering") &&
              target.getBoundingClientRect().top <= top
            )
              id = link.dataset.section!;
          }
          const st = horizontal?.scrollTrigger;
          if (st && window.scrollY >= st.start && section.getBoundingClientRect().bottom > top) {
            const panel = panels[Math.min(3, Math.round(st.progress * 3))];
            id = panel.id === "control" ? "tecnologia" : panel.id;
          } else if (!st) {
            for (const panel of panels)
              if (
                panel.getBoundingClientRect().top <= top &&
                panel.getBoundingClientRect().bottom > top
              )
                id = panel.id === "control" ? "tecnologia" : panel.id;
          }
          nav.dataset.pinned = String(nav.getBoundingClientRect().top <= 1);
          if (id === activeId) return;
          activeId = id;
          links.forEach((link) =>
            link.dataset.section === id
              ? link.setAttribute("aria-current", "location")
              : link.removeAttribute("aria-current"),
          );
          const active = links.find((link) => link.dataset.section === id);
          const strip = nav.querySelector<HTMLElement>(":scope > div");
          if (active && strip && strip.contains(active)) {
            const rect = active.getBoundingClientRect(),
              bounds = strip.getBoundingClientRect();
            if (rect.left < bounds.left || rect.right > bounds.right)
              strip.scrollTo({
                left: strip.scrollLeft + rect.left - bounds.left - 14,
                behavior: "auto",
              });
          }
        }
        function scheduleActive() {
          if (!frame) frame = requestAnimationFrame(updateActive);
        }
        const mm = gsap.matchMedia();
        const context = gsap.context(() => {
          mm.add(
            {
              all: "(min-width: 0px)",
              desktop: "(min-width: 1024px)",
              reduce: "(prefers-reduced-motion: reduce)",
            },
            (mediaContext) => {
              const { desktop, reduce } = mediaContext.conditions!;
              const release: (() => void)[] = [];
              if (desktop && !reduce) {
                section.classList.add("horizontal-ready");
                horizontal = gsap.to(track, {
                  x: () => -(track.scrollWidth - section.clientWidth),
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: () => `top ${navHeight()}px`,
                    end: () => "+=" + (track.scrollWidth - section.clientWidth),
                    scrub: timing.scrub,
                    invalidateOnRefresh: true,
                    onUpdate: scheduleActive,
                  },
                });
              }
              if (!reduce) {
                root.querySelectorAll<HTMLElement>("[data-motion]").forEach((el) => {
                  const panel = el.closest<HTMLElement>(".engineering-panel"),
                    type = el.dataset.motion;
                  const config =
                    panel && panel !== panels[0] && horizontal
                      ? {
                          trigger: el,
                          containerAnimation: horizontal,
                          start: "left 98%",
                          end: "left 38%",
                        }
                      : { trigger: el, start: "top 94%", end: "top 45%" };
                  const text = type === "text",
                    line = type === "line",
                    product = type === "product";
                  gsap.fromTo(
                    el,
                    line
                      ? { scaleX: 0.12, transformOrigin: "left" }
                      : {
                          y: text ? 18 : product ? 12 : 8,
                          x: text ? -5 : 0,
                          opacity: text ? 0.45 : 0.68,
                          ...(type === "image" ? { clipPath: "inset(0% 0% 5% 0%)" } : {}),
                        },
                    {
                      ...(line ? { scaleX: 1 } : { y: text ? -4 : 0, x: text ? 4 : 0, opacity: 1 }),
                      ...(type === "image" ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
                      duration: type === "image" ? timing.image : text ? timing.text : timing.tech,
                      ease: timing.ease,
                      scrollTrigger: {
                        ...config,
                        scrub: text || product ? timing.scrub : false,
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true,
                      },
                    },
                  );
                });
                gsap.from(".hero-word", {
                  y: 16,
                  opacity: 0,
                  duration: timing.image,
                  ease: timing.ease,
                });
                gsap.from(".hero-bottom", {
                  y: 12,
                  opacity: 0,
                  duration: timing.text,
                  delay: 0.12,
                  ease: timing.ease,
                });
                gsap.to(".hero h1", {
                  y: 20,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: timing.scrub,
                  },
                });
                const packet = root.querySelector<HTMLElement>(".signal-packet"),
                  rail = root.querySelector<HTMLElement>(".signal-rail");
                if (packet && rail) {
                  const vertical = matchMedia("(max-width: 767px)").matches;
                  const signal = gsap.fromTo(
                    packet,
                    { x: 0, y: 0 },
                    {
                      x: vertical ? 0 : () => rail.clientWidth - packet.clientWidth,
                      y: vertical ? () => rail.clientHeight - packet.clientHeight : 0,
                      duration: 2.4,
                      repeat: -1,
                      repeatDelay: 0.5,
                      ease: "none",
                      paused: true,
                    },
                  );
                  const signalTrigger = ScrollTrigger.create({
                    trigger: ".control-panel",
                    ...(horizontal
                      ? { containerAnimation: horizontal, start: "left 90%", end: "right 10%" }
                      : { start: "top bottom", end: "bottom top" }),
                    onToggle: (self) =>
                      self.isActive && !document.hidden ? signal.resume() : signal.pause(),
                  });
                  const visibility = () =>
                    signalTrigger.isActive && !document.hidden ? signal.resume() : signal.pause();
                  document.addEventListener("visibilitychange", visibility);
                  release.push(() => document.removeEventListener("visibilitychange", visibility));
                }
                const arrival = root.querySelector(".arrival .scene");
                if (arrival)
                  ScrollTrigger.create({
                    trigger: ".arrival",
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) =>
                      arrival.dispatchEvent(
                        new CustomEvent(PRODUCT_SCROLL_EVENT, { detail: self.progress }),
                      ),
                    onEnter: () => arrival.dispatchEvent(new Event(PRODUCT_REPLAY_EVENT)),
                    onEnterBack: () => arrival.dispatchEvent(new Event(PRODUCT_REPLAY_EVENT)),
                  });
              }
              scheduleActive();
              return () => {
                release.forEach((fn) => fn());
                section.classList.remove("horizontal-ready");
                horizontal = undefined;
              };
            },
          );
        }, root);
        const jump = (id: string, smooth: boolean) => {
          const index = panels.findIndex((panel) => panel.id === id),
            st = horizontal?.scrollTrigger;
          if (index < 0 || !st) return false;
          window.scrollTo({
            top: st.start + ((st.end - st.start) * index) / 3,
            behavior: smooth ? "smooth" : "instant",
          });
          panels[index].focus({ preventScroll: true });
          return true;
        };
        const anchors = (event: MouseEvent) => {
          const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
          if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if (jump(anchor.hash.slice(1), true)) {
            event.preventDefault();
            history.replaceState(null, "", anchor.hash);
          }
        };
        // A refresh writes scroll position. Wait for native smooth anchors to finish first.
        const refresh = () => {
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => {
            if (disposed) return;
            if (performance.now() - lastScrollAt < 240) {
              refresh();
              return;
            }
            ScrollTrigger.refresh();
            scheduleActive();
          }, 160);
        };
        const onScroll = () => {
          lastScrollAt = performance.now();
          scheduleActive();
        };
        root.addEventListener("click", anchors);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", refresh, { passive: true });
        const images = Array.from(root.querySelectorAll("img")).filter((img) => !img.complete);
        images.forEach((img) => img.addEventListener("load", refresh));
        const resize = new ResizeObserver(refresh);
        resize.observe(root);
        void document.fonts.ready.then(() => {
          if (!disposed) {
            ScrollTrigger.refresh();
            const id = location.hash.slice(1);
            if (id && !jump(id, false)) {
              const target = document.getElementById(id);
              if (target)
                window.scrollTo({
                  top:
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || "84"),
                  behavior: "instant",
                });
            }
            scheduleActive();
          }
        });
        cleanup = () => {
          clearTimeout(refreshTimer);
          cancelAnimationFrame(frame);
          resize.disconnect();
          root.removeEventListener("click", anchors);
          window.removeEventListener("scroll", scheduleActive);
          window.removeEventListener("resize", refresh);
          images.forEach((img) => img.removeEventListener("load", refresh));
          mm.revert();
          context.revert();
        };
        refresh();
      })
      .catch(() => root.querySelector(".engineering")?.classList.remove("horizontal-ready"));
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return null;
}
