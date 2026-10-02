import { m, useReducedMotion, type Variants } from 'motion/react';
import { duration, ease } from './motion';

const CENTER_PETAL = 'M0 -40 C 16 -52 16 -72 0 -84 C -16 -72 -16 -52 0 -40 Z';
const OUTER_TIP = 'M0 -90 Q 9 -101 0 -112 Q -9 -101 0 -90 Z';

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: duration.draw, ease: ease.out } },
};

const dot: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
};

const angles = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * The page's signature motion: a rangoli drawn line by line on first load (Motion), then its
 * two halves turn slowly in opposite directions for as long as the page is open (CSS keyframes
 * in index.css, so the loop costs no JS). Decorative only, so it's hidden from assistive tech.
 * With reduced motion it renders fully drawn and stays still.
 */
const Rangoli = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="-120 -120 240 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <m.g variants={group} initial={reduce ? 'show' : 'hidden'} animate="show">
        <g className="rangoli-turn">
          <m.circle variants={stroke} r={112} vectorEffect="non-scaling-stroke" />
          {angles.map((angle) => (
            <g key={`tip-${angle}`} transform={`rotate(${angle + 15})`}>
              <m.path variants={stroke} d={OUTER_TIP} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
          {angles.map((angle) => (
            <g key={`dot-${angle}`} transform={`rotate(${angle}) translate(0 -98)`}>
              <m.circle variants={dot} r={2.2} fill="currentColor" stroke="none" />
            </g>
          ))}
        </g>
        <g className="rangoli-turn rangoli-turn-reverse">
          <m.circle variants={stroke} r={84} vectorEffect="non-scaling-stroke" />
          <m.circle variants={stroke} r={40} vectorEffect="non-scaling-stroke" />
          {angles.map((angle) => (
            <g key={`petal-${angle}`} transform={`rotate(${angle})`}>
              <m.path variants={stroke} d={CENTER_PETAL} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </g>
        <m.circle variants={dot} r={5} fill="currentColor" stroke="none" />
      </m.g>
    </svg>
  );
};

export default Rangoli;
