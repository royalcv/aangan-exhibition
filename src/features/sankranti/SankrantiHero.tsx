import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, LayoutGrid, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/WhatsAppButton';
import { mapsLink, site } from '@/data/site';
import { sankrantiEdition } from '@/data/sankranti';

/* ────────────────────────────────────────────────────────────────────────────
 * 1. EVENT DETAILS: edit the dates and venue in src/data/sankranti.ts (the stall
 *    availability page reads the same values).
 * ──────────────────────────────────────────────────────────────────────────── */
const EVENT = sankrantiEdition;

/* ────────────────────────────────────────────────────────────────────────────
 * 2. COLOURS: edit the palette here. Everything in the scene reads these tokens.
 *    The gold is the site's own turmeric (--primary), so the title matches the rest of the site.
 * ──────────────────────────────────────────────────────────────────────────── */
const PALETTE = `
  .skh {
    --skh-night: #050407;            /* base black background */
    --skh-gold: hsl(var(--primary)); /* title + accents (#FAB00F) */
    --skh-saffron: #ff7a1a;          /* Sankranti saffron */
    --skh-sky: #3fa9f5;              /* kite-sky blue */
    --skh-teal: #1c9c9c;
    --skh-magenta: #d6336c;
    --skh-ivory: #f6f1e7;
    --skh-dusk: #120f2b;             /* sky, top to horizon: night, dusk, plum, sunset, ember */
    --skh-plum: #4a1a44;
    --skh-sunset: #d2462f;
    --skh-ember: #f59a3a;
    --skh-silhouette: #0e0911;       /* rooftops and people */
  }
`;

/* ────────────────────────────────────────────────────────────────────────────
 * 3. MOTION: transform and opacity only, so mid-range phones stay smooth.
 *    Paused while the hero is off screen; frozen into a still scene for reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */
const MOTION = `
  .skh-scene .skh-sway { transform-box: view-box; animation: skh-sway 7s ease-in-out infinite alternate; }
  .skh-scene .skh-flutter { transform-box: fill-box; transform-origin: 50% 40%; animation: skh-flutter 2.4s ease-in-out infinite; }
  .skh-scene .skh-tail { transform-box: fill-box; transform-origin: 50% 0; animation: skh-tail 1.3s ease-in-out infinite; }
  .skh-scene .skh-drift { animation: skh-drift 22s ease-in-out infinite; }
  .skh-scene .skh-pallu { transform-box: fill-box; transform-origin: 0 0; animation: skh-pallu 3.2s ease-in-out infinite; }
  .skh-scene .skh-spin { transform-box: fill-box; transform-origin: center; animation: skh-spin 4.5s linear infinite; }
  .skh-scene .skh-bob { transform-box: fill-box; transform-origin: 50% 100%; animation: skh-bob 1.7s ease-in-out infinite; }
  .skh-scene .skh-wave { transform-box: fill-box; transform-origin: 100% 100%; animation: skh-wave 1.1s ease-in-out infinite; }
  .skh-scene .skh-wind { animation: skh-wind 6s linear infinite; }
  .skh-scene .skh-twinkle { animation: skh-twinkle 3s ease-in-out infinite; }
  .skh-scene .skh-glow { animation: skh-glow 8s ease-in-out infinite alternate; }
  .skh-scene .skh-cloud { animation: skh-cloud 40s ease-in-out infinite alternate; }
  .skh-scene .skh-birds { animation: skh-birds 34s linear infinite; }
  .skh-scene .skh-flap { transform-box: fill-box; transform-origin: center; animation: skh-flap 0.9s ease-in-out infinite; }

  @keyframes skh-sway { from { transform: rotate(-2.4deg); } to { transform: rotate(2.4deg); } }
  @keyframes skh-flutter { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(5deg) translateY(-2px); } }
  @keyframes skh-tail { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
  @keyframes skh-drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(140px, -40px); } }
  @keyframes skh-pallu { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(5deg) scale(1.05, 0.96); } }
  @keyframes skh-spin { to { transform: rotate(360deg); } }
  @keyframes skh-bob { 0%, 100% { transform: translateY(0); } 45%, 55% { transform: translateY(-7px); } }
  @keyframes skh-wave { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(12deg); } }
  @keyframes skh-wind {
    0% { transform: translateX(-80px); opacity: 0; }
    15% { opacity: 0.55; }
    85% { opacity: 0.4; }
    100% { transform: translateX(260px); opacity: 0; }
  }
  @keyframes skh-twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.95; } }
  @keyframes skh-glow { from { opacity: 0.75; } to { opacity: 1; } }
  @keyframes skh-cloud { from { transform: translateX(-30px); } to { transform: translateX(40px); } }
  @keyframes skh-birds {
    0% { transform: translate(0, 0); opacity: 0; }
    10%, 90% { opacity: 1; }
    100% { transform: translate(420px, -60px); opacity: 0; }
  }
  @keyframes skh-flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.4); } }

  /* Off screen: stop spending frames. */
  .skh[data-paused] .skh-scene * { animation-play-state: paused; }
  /* Phones and tablets: drop the far-sky extras (they sit outside the cropped view anyway). */
  @media (max-width: 1023px) { .skh-scene .skh-far { display: none; } }
  /* Reduced motion: the same scene, standing still. */
  @media (prefers-reduced-motion: reduce) {
    .skh-scene, .skh-scene * { animation: none !important; }
  }
`;

const SILHOUETTE = 'var(--skh-silhouette)';
const RIM = { stroke: 'var(--skh-ember)', strokeOpacity: 0.3, strokeWidth: 1 };
const fillVar = (name: string) => ({ fill: `var(--skh-${name})` });
const stop = (name: string, opacity = 1) => ({ stopColor: `var(--skh-${name})`, stopOpacity: opacity });

type Point = readonly [number, number];

/** A patang: two-tone diamond, gold centre motif, and a ribbon tail that flicks in the wind. */
const Kite = ({ a, b, flutter = '2.4s', delay = '0s' }: { a: string; b: string; flutter?: string; delay?: string }) => (
  <g className="skh-flutter" style={{ animationDuration: flutter, animationDelay: delay }}>
    <path d="M0 -36 L-28 -4 L0 40 Z" style={fillVar(a)} />
    <path d="M0 -36 L28 -4 L0 40 Z" style={fillVar(b)} />
    <path d="M0 -36 V40 M-28 -4 Q0 -18 28 -4" fill="none" stroke="#000" strokeOpacity={0.3} strokeWidth={1.4} />
    <path d="M0 -14 L7 -4 L0 6 L-7 -4 Z" style={fillVar('gold')} />
    <path d="M-7 40 L7 40 L0 52 Z" style={fillVar(a)} />
    <g className="skh-tail" style={{ animationDelay: delay }}>
      <path
        d="M0 52 C-7 62 7 72 0 82 C-7 92 7 100 0 110"
        fill="none"
        style={{ stroke: `var(--skh-${b})` }}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path d="M-7 76 L0 80 L-7 84 Z M7 76 L0 80 L7 84 Z M-6 98 L0 101 L-6 104 Z M6 98 L0 101 L6 104 Z" style={fillVar(a)} />
    </g>
  </g>
);

/**
 * A kite on a string. The kite and its string swing together around the flyer's hand, so the
 * string always stays attached however the kite drifts.
 */
const TetheredKite = ({
  hand: [hx, hy],
  at: [kx, ky],
  tilt,
  scale,
  a,
  b,
  sway,
  flutter,
  delay,
}: {
  hand: Point;
  at: Point;
  tilt: number;
  scale: number;
  a: string;
  b: string;
  sway: string;
  flutter: string;
  delay: string;
}) => (
  <g className="skh-sway" style={{ transformOrigin: `${hx}px ${hy}px`, animationDuration: sway, animationDelay: delay }}>
    <path
      d={`M${hx} ${hy} Q${(hx + kx) / 2 + 40} ${(hy + ky) / 2 + 30} ${kx} ${ky}`}
      fill="none"
      style={{ stroke: 'var(--skh-ivory)' }}
      strokeOpacity={0.55}
      strokeWidth={1.2}
    />
    <g transform={`translate(${kx} ${ky}) rotate(${tilt}) scale(${scale})`}>
      <Kite a={a} b={b} flutter={flutter} delay={delay} />
    </g>
  </g>
);

/** A woman in a saree, facing the kites, her pallu streaming downwind. Feet at (x, y). */
const Woman = ({ x, y, pallu, arms, delay, children }: { x: number; y: number; pallu: string; arms: string; delay: string; children?: ReactNode }) => (
  <g transform={`translate(${x} ${y})`}>
    <g fill={SILHOUETTE} {...RIM}>
      <path d="M-30 0 C-24 -30 -18 -52 -14 -72 L14 -72 C17 -50 22 -26 30 0 Z" />
      <path d="M-14 -72 C-15 -88 -13 -102 -11 -112 L11 -112 C13 -100 15 -86 14 -72 Z" />
      <rect x={-3.5} y={-121} width={7} height={11} />
      <circle cx={1} cy={-131} r={11} />
      <circle cx={-9} cy={-134} r={6.5} />
    </g>
    {/* Zari border along the saree hem */}
    <path d="M-28 -6 C-10 -2 10 -2 28 -6" fill="none" style={{ stroke: 'var(--skh-gold)' }} strokeOpacity={0.75} strokeWidth={2} />
    <path d={arms} fill="none" stroke={SILHOUETTE} strokeWidth={6.5} strokeLinecap="round" strokeLinejoin="round" />
    <g className="skh-pallu" style={{ animationDelay: delay }}>
      <path
        d="M-11 -110 C-4 -84 18 -74 42 -72 C62 -70 78 -62 92 -52 L88 -43 C74 -52 58 -59 40 -60 C14 -61 -8 -74 -16 -100 Z"
        style={{ fill: `url(#${pallu})`, stroke: 'var(--skh-gold)' }}
        strokeOpacity={0.6}
        strokeWidth={1.2}
      />
    </g>
    {children}
  </g>
);

/** A girl in a festive frock. Feet at (x, y), drawn at `scale`. */
const Girl = ({ x, y, scale, frock, className, children }: { x: number; y: number; scale: number; frock: string; className?: string; children: ReactNode }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g className={className}>
      <path d="M-8 0 V-34 M8 0 V-34" stroke={SILHOUETTE} strokeWidth={6.5} strokeLinecap="round" />
      <path d="M-30 -30 C-20 -54 -16 -74 -13 -96 L13 -96 C16 -74 20 -54 30 -30 Z" style={{ fill: `url(#${frock})` }} />
      <path d="M-30 -30 Q0 -24 30 -30" fill="none" style={{ stroke: 'var(--skh-gold)' }} strokeWidth={2.5} strokeOpacity={0.85} />
      <g fill={SILHOUETTE} {...RIM}>
        <rect x={-3} y={-104} width={6} height={9} />
        <circle cx={1} cy={-114} r={12} />
        <circle cx={-12} cy={-110} r={5} />
        <circle cx={14} cy={-110} r={5} />
      </g>
      <circle cx={-12} cy={-104} r={2.2} style={fillVar('saffron')} />
      <circle cx={14} cy={-104} r={2.2} style={fillVar('saffron')} />
      {children}
    </g>
  </g>
);

/* Scene layout, in the SVG's 1600 × 900 space. Hands are where the strings start. */
const HAND_WOMAN = [1244, 630] as const; // woman flying the big saffron kite
const HAND_SPOOL = [1090, 694] as const; // woman holding the charkhi (string spool)
const HAND_GIRL = [1351.6, 697.8] as const; // girl flying the blue kite

const FAR_KITES = [
  { x: 420, y: 170, s: 0.5, tilt: -14, a: 'ember', b: 'sunset', o: 0.85, dur: '24s', delay: '-3s' },
  { x: 640, y: 300, s: 0.38, tilt: 10, a: 'sky', b: 'gold', o: 0.7, dur: '20s', delay: '-11s' },
  { x: 180, y: 320, s: 0.42, tilt: -8, a: 'magenta', b: 'saffron', o: 0.6, dur: '27s', delay: '-6s' },
  { x: 820, y: 130, s: 0.32, tilt: 16, a: 'ivory', b: 'sky', o: 0.6, dur: '19s', delay: '-14s' },
  { x: 1010, y: 250, s: 0.45, tilt: -12, a: 'teal', b: 'gold', o: 0.75, dur: '23s', delay: '-8s' },
] as const;

const WIND = [
  [260, 230, '5.5s', '-1s'],
  [520, 400, '6.5s', '-3s'],
  [980, 330, '5s', '-2s'],
  [1180, 520, '7s', '-5s'],
  [700, 560, '6s', '-4s'],
] as const;

const DUST = [
  [120, 90], [340, 60], [510, 130], [690, 48], [860, 92],
  [1040, 60], [1220, 80], [1500, 60], [1580, 150], [980, 160],
] as const;

/** Festive lights strung along the terrace wall: points on two sagging arcs. */
const LIGHT_COLOURS = ['gold', 'saffron', 'sky', 'magenta'] as const;
const TORAN = [0, 1].flatMap((arc) => {
  const [x0, x1] = arc === 0 ? [965, 1130] : [1130, 1295];
  return Array.from({ length: 6 }, (_, i) => {
    const t = (i + 0.5) / 6;
    return { x: x0 + (x1 - x0) * t, y: 794 + 24 * t * (1 - t), colour: LIGHT_COLOURS[(arc * 6 + i) % 4] };
  });
});

/** The animated Makar Sankranti sky: decorative, so hidden from assistive tech. */
const KiteScene = () => (
  <svg className="skh-scene h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="skh-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop('night')} />
        <stop offset="0.42" style={stop('dusk')} />
        <stop offset="0.62" style={stop('plum')} />
        <stop offset="0.82" style={stop('sunset')} />
        <stop offset="1" style={stop('ember')} />
      </linearGradient>
      <radialGradient id="skh-sun">
        <stop offset="0" stopColor="#fff3c4" />
        <stop offset="0.55" style={stop('gold')} />
        <stop offset="1" style={stop('ember')} />
      </radialGradient>
      <radialGradient id="skh-sun-glow">
        <stop offset="0" style={stop('ember', 0.55)} />
        <stop offset="0.45" style={stop('sunset', 0.18)} />
        <stop offset="1" style={stop('sunset', 0)} />
      </radialGradient>
      <radialGradient id="skh-haze">
        <stop offset="0" style={stop('ember', 0.35)} />
        <stop offset="1" style={stop('ember', 0)} />
      </radialGradient>
      <linearGradient id="skh-pallu-saffron" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style={stop('saffron')} />
        <stop offset="1" style={stop('magenta')} />
      </linearGradient>
      <linearGradient id="skh-pallu-gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style={stop('gold')} />
        <stop offset="1" style={stop('sunset')} />
      </linearGradient>
      <linearGradient id="skh-frock-magenta" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop('magenta')} />
        <stop offset="1" style={stop('saffron')} />
      </linearGradient>
      <linearGradient id="skh-frock-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop('sky')} />
        <stop offset="1" style={stop('teal')} />
      </linearGradient>
    </defs>

    {/* Sky, haze and the setting sun */}
    <rect width="1600" height="900" fill="url(#skh-sky)" />
    <ellipse className="skh-cloud" cx="600" cy="600" rx="320" ry="26" fill="url(#skh-haze)" />
    <ellipse className="skh-cloud" cx="1250" cy="520" rx="260" ry="20" fill="url(#skh-haze)" style={{ animationDelay: '-18s' }} />
    <circle className="skh-glow" cx="900" cy="770" r="380" fill="url(#skh-sun-glow)" />
    <circle cx="900" cy="770" r="74" fill="url(#skh-sun)" />

    {/* Gold dust in the upper sky */}
    {DUST.map(([cx, cy], i) => (
      <circle
        key={`${cx}-${cy}`}
        className="skh-twinkle"
        cx={cx}
        cy={cy}
        r={1.6 + (i % 3) * 0.4}
        style={{ ...fillVar('gold'), animationDelay: `${-i * 0.7}s`, animationDuration: `${2.6 + (i % 4) * 0.6}s` }}
      />
    ))}

    {/* Distant kites drifting free (desktop only) */}
    <g className="skh-far">
      {FAR_KITES.map((k) => (
        <g key={`${k.x}-${k.y}`} transform={`translate(${k.x} ${k.y}) rotate(${k.tilt}) scale(${k.s})`} opacity={k.o}>
          <g className="skh-drift" style={{ animationDuration: k.dur, animationDelay: k.delay }}>
            <Kite a={k.a} b={k.b} flutter="2.8s" delay={k.delay} />
          </g>
        </g>
      ))}
      <g className="skh-birds">
        {[
          [700, 210],
          [735, 195],
          [762, 222],
        ].map(([bx, by], i) => (
          <g key={bx} transform={`translate(${bx} ${by})`}>
            <path
              className="skh-flap"
              d="M0 0 q6 -6 12 0 q6 -6 12 0"
              fill="none"
              stroke={SILHOUETTE}
              strokeWidth={2}
              strokeLinecap="round"
              style={{ animationDelay: `${-i * 0.3}s` }}
            />
          </g>
        ))}
      </g>
    </g>

    {/* Wind */}
    {WIND.map(([wx, wy, dur, delay]) => (
      <g key={`${wx}-${wy}`} transform={`translate(${wx} ${wy})`}>
        <path
          className="skh-wind"
          d="M0 0 q50 -8 100 0"
          fill="none"
          style={{ stroke: 'var(--skh-ivory)', animationDuration: dur, animationDelay: delay }}
          strokeOpacity={0.6}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.3}
        />
      </g>
    ))}

    {/* Far skyline: houses and a temple shikhara against the sunset */}
    <path
      d="M0 900 V770 H60 V752 H140 V770 H210 V745 L230 730 L250 745 V770 H330 V758 H410 V776 H560 V750 H600 L640 690 L680 750 H720 V766 H840 V748 H900 V770 H1000 V755 H1080 V770 H1360 V758 H1480 V772 H1600 V900 Z"
      fill="#24142a"
    />
    {/* Near terraces, rim-lit by the sun, with a water tank on the right */}
    <path
      d="M0 900 V832 H90 V812 H240 V838 H380 V800 H470 V786 H520 V800 H640 V822 H760 V796 H900 V812 H960 V780 H1300 V790 H1440 V770 H1460 V735 H1525 V770 H1600 V900 Z"
      fill={SILHOUETTE}
      style={{ stroke: 'var(--skh-gold)' }}
      strokeOpacity={0.35}
      strokeWidth={1.5}
    />
    {/* Festive lights along the terrace wall */}
    <path d="M965 794 Q1047 806 1130 794 Q1212 806 1295 794" fill="none" stroke="#3a2a2a" strokeWidth={1} />
    {TORAN.map((light, i) => (
      <circle
        key={`${light.x}`}
        className="skh-twinkle"
        cx={light.x}
        cy={light.y}
        r={2.8}
        style={{ ...fillVar(light.colour), animationDelay: `${-i * 0.35}s`, animationDuration: '2.2s' }}
      />
    ))}

    {/* The kite flyers */}
    <Woman x={1060} y={780} pallu="skh-pallu-gold" delay="-1.1s" arms="M8 -108 L22 -96 L30 -88 M-6 -106 L10 -92 L24 -84">
      {/* Charkhi: the string spool, spinning as she lets the string out */}
      <g transform="translate(30 -86)">
        <path d="M0 0 V22" stroke={SILHOUETTE} strokeWidth={3} />
        <g className="skh-spin">
          <circle r={11} fill="#2a160c" style={{ stroke: 'var(--skh-gold)' }} strokeWidth={2} />
          <path d="M-11 0 H11 M0 -11 V11" style={{ stroke: 'var(--skh-gold)' }} strokeWidth={1.5} />
          <circle r={3} style={fillVar('gold')} />
        </g>
      </g>
    </Woman>
    <Girl x={1130} y={780} scale={0.66} frock="skh-frock-sky" className="skh-bob">
      {/* Pointing up at the kites, waving with the other hand */}
      <path d="M8 -90 L26 -122 L40 -150" fill="none" stroke={SILHOUETTE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path className="skh-wave" d="M-30 -124 L-20 -106 L-8 -90" fill="none" stroke={SILHOUETTE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </Girl>
    <Woman x={1210} y={780} pallu="skh-pallu-saffron" delay="0s" arms="M8 -108 L22 -128 L34 -150 M-6 -106 L12 -124 L28 -142" />
    <Girl x={1330} y={790} scale={0.72} frock="skh-frock-magenta">
      <path d="M8 -90 L20 -110 L30 -128 M-6 -88 L12 -106 L24 -122" fill="none" stroke={SILHOUETTE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </Girl>

    {/* Their kites */}
    <TetheredKite hand={HAND_SPOOL} at={[1290, 160]} tilt={14} scale={1} a="gold" b="teal" sway="9s" flutter="2.6s" delay="-2s" />
    <TetheredKite hand={HAND_WOMAN} at={[1450, 215]} tilt={18} scale={1.25} a="saffron" b="magenta" sway="7s" flutter="2.2s" delay="0s" />
    <TetheredKite hand={HAND_GIRL} at={[1545, 360]} tilt={22} scale={0.9} a="sky" b="ivory" sway="5.5s" flutter="1.9s" delay="-1.4s" />
  </svg>
);

/**
 * Makar Sankranti hero for the January 2027 edition: event name, dates and venue above the fold,
 * one primary action (directions), and an animated rooftop kite-flying scene.
 * The text is plain HTML, so it is pre-rendered and readable before any animation starts.
 */
const SankrantiHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Pause the scene while it is scrolled out of view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.toggleAttribute('data-paused', !entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="skh relative isolate flex min-h-[calc(100svh-72px)] flex-col overflow-hidden lg:block"
      style={{ backgroundColor: 'var(--skh-night)' }}
      aria-labelledby="skh-title"
    >
      <style>{PALETTE + MOTION}</style>

      <div className="page-wrap relative z-10 pb-4 pt-12 sm:pt-16 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:py-20">
        <div className="max-w-xl">
          <h1
            id="skh-title"
            className="font-display text-[2.75rem] leading-[1.05] tracking-wide text-primary [text-wrap:balance] sm:text-6xl lg:text-7xl"
          >
            {EVENT.title}
          </h1>
          <p className="mt-4 font-display text-2xl text-white sm:text-3xl">{EVENT.edition}</p>

          <ul className="mt-8 space-y-4 text-lg text-white sm:text-xl">
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-6 w-6 shrink-0" style={{ color: 'var(--skh-saffron)' }} aria-hidden="true" />
              <span className="sr-only">Dates: </span>
              <time dateTime={EVENT.startDate}>{EVENT.dates}</time>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0" style={{ color: 'var(--skh-saffron)' }} aria-hidden="true" />
              <span className="sr-only">Venue: </span>
              <span>{EVENT.venue}</span>
            </li>
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <a href={mapsLink(EVENT.mapsQuery)} target="_blank" rel="noopener noreferrer">
                Get Directions
                <span className="sr-only"> to {EVENT.venue} (opens Google Maps in a new tab)</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="light">
              <Link to="/stalls">
                <LayoutGrid />
                Check Stall Availability
              </Link>
            </Button>
            <Button asChild size="lg" variant="light">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Ask on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Phones: the scene sits below the text. Desktop: it fills the hero behind the text. */}
      <div className="pointer-events-none relative h-[52svh] min-h-[300px] w-full lg:absolute lg:inset-0 lg:h-full">
        <KiteScene />
        <div
          className="absolute inset-x-0 top-0 h-16 lg:hidden"
          style={{ background: 'linear-gradient(var(--skh-night), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(90deg, var(--skh-night) 0%, rgb(5 4 7 / 0.85) 30%, rgb(5 4 7 / 0) 60%)' }}
          aria-hidden="true"
        />
      </div>

      <div className="dot-rule relative z-10 lg:absolute lg:inset-x-0 lg:bottom-0" aria-hidden="true" />
    </section>
  );
};

export default SankrantiHero;
