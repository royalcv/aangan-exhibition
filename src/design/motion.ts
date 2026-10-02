/**
 * Shared motion tokens. Every animation in the app pulls from here so the whole site
 * moves with one rhythm: decelerate on the way in, leave faster than we arrived.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.6,
  draw: 1.1,
};

export const spring = {
  press: { type: 'spring', stiffness: 520, damping: 32 } as const,
};

/** Route change: a short crossfade. Exit is ~60% of enter so navigation feels responsive. */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.inOut } },
};
