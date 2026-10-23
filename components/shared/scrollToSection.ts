"use client";

let cancelActiveScroll: (() => void) | null = null;

export function scrollToSection(
  id: string,
  offsetSelector: string,
  onSettled: () => void,
) {
  const target = document.getElementById(id);
  if (!target) return () => {};

  cancelActiveScroll?.();
  let cancelled = false;
  let fallback: ReturnType<typeof setTimeout> | null = null;
  let quiet: ReturnType<typeof setTimeout> | null = null;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getTop = () => {
    const offset = document.querySelector<HTMLElement>(offsetSelector)?.offsetHeight ?? 58;
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  };

  const cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    if (quiet) clearTimeout(quiet);
    if (fallback) clearTimeout(fallback);
  };

  const settle = () => {
    if (cancelled) return;
    cleanup();
    const correctedTop = getTop();
    if (Math.abs(window.scrollY - correctedTop) > 2) {
      window.scrollTo({ top: correctedTop, behavior: "instant" });
    }
    onSettled();
  };

  const onScroll = () => {
    if (quiet) clearTimeout(quiet);
    quiet = setTimeout(settle, 140);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.scrollTo({ top: getTop(), behavior: reduced ? "instant" : "smooth" });
  history.replaceState(null, "", "#" + id);

  if (reduced) requestAnimationFrame(settle);
  else fallback = setTimeout(settle, 1600);

  const cancel = () => {
    cancelled = true;
    cleanup();
  };
  cancelActiveScroll = cancel;
  return cancel;
}
