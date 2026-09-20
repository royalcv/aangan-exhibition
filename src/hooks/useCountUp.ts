import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Animates a numeric-prefixed string (e.g. "100K+", "2+", "90,000+") counting up
 * from 0 once the element scrolls into view. Falls back to the static value
 * immediately when it can't be parsed or the user prefers reduced motion.
 */
export function useCountUp(value: string) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);

    if (!el || !match || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    const [, numStr, suffix] = match;
    const hasComma = numStr.includes(",");
    const target = parseFloat(numStr.replace(/,/g, ""));
    const isInt = Number.isInteger(target);
    const counter = { val: 0 };

    const format = (n: number) => {
      const rounded = isInt ? Math.round(n) : Math.round(n * 10) / 10;
      const base = hasComma ? rounded.toLocaleString("en-IN") : String(rounded);
      return `${base}${suffix}`;
    };

    setDisplay(format(0));

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => setDisplay(format(counter.val)),
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return { ref, display };
}
