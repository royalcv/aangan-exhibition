import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type ScrollRevealOptions = {
  /** CSS selector (relative to the container) for items to stagger in. Omit to animate the container itself. */
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
};

/**
 * Fades + slides elements up into place once, the first time they enter the viewport.
 * No-ops entirely when the user prefers reduced motion.
 */
export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const { selector, y = 32, duration = 0.7, stagger = 0.1, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = selector ? el.querySelectorAll(selector) : el;
    if (selector && (targets as NodeListOf<Element>).length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, start]);

  return ref;
}
