import { useEffect, type RefObject } from "react";

/**
 * Moves the element at `factor` × scroll, capped at `max` px. Uses a transform in
 * requestAnimationFrame (background-attachment: fixed is broken on iOS Safari).
 * Off under 768 px and for prefers-reduced-motion.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, factor = 0.15, max = 60) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = ok.matches ? Math.min(window.scrollY * factor, max) : 0;
      el.style.transform = y ? `translate3d(0, ${y}px, 0)` : "";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    ok.addEventListener("change", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      ok.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, [ref, factor, max]);
}
