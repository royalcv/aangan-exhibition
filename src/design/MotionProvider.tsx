import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

/**
 * Loads only the animation + gesture features (a fraction of the full Motion bundle) and makes
 * transform animations respect the visitor's reduced-motion setting everywhere.
 * Use the `m` component (not `motion`) inside this provider.
 */
const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
