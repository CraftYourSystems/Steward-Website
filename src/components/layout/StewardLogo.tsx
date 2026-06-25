// StewardLogo — inline SVG recreation of the brand mark
// The S is formed by two thick bezier arcs; the bottom arc extends
// outward as a circular swoosh that terminates in an upward-right arrow.
// Teal bar charts sit inside the lower portion of the S.

interface StewardLogoProps {
  height?: number;
}

export default function StewardLogo({ height = 40 }: StewardLogoProps) {
  // Keep aspect ratio: mark is ~68 tall, full logo is ~260 wide
  const width = Math.round(height * (260 / 68));

  return (
    <svg
      viewBox="0 0 260 68"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Steward"
      role="img"
    >
      <defs>
        {/* Warm gold: light highlight → mid gold → deep gold */}
        <linearGradient id="lg-gold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#f5e070" />
          <stop offset="45%"  stopColor="#d4a820" />
          <stop offset="100%" stopColor="#9a7010" />
        </linearGradient>

        {/* Teal / mint for bar charts */}
        <linearGradient id="lg-teal" x1="0" y1="60" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#34a87a" />
          <stop offset="100%" stopColor="#7eecc8" />
        </linearGradient>
      </defs>

      {/* ══════════════════════════════════════════════
          S MARK  (lives in the 0–68 × 0–68 square)
          ══════════════════════════════════════════════ */}

      {/* — Upper half of the S —
          Sweeps from upper-right, arcs over the top, down the left, into the centre crossing */}
      <path
        d="M 50,19
           C 55,7  47,1  33,3
           C 17,5  6,15  9,26
           C 11,32 19,35 32,35"
        stroke="url(#lg-gold)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* — Lower half of the S —
          From the centre crossing, sweeps right, down, and round to the lower-left */}
      <path
        d="M 32,35
           C 45,35 54,38 54,47
           C 54,57 43,62 27,60
           C 14,58 8,51 10,45"
        stroke="url(#lg-gold)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* — Outer circular swoosh —
          Starts at the lower-left end of the S, sweeps broadly around the bottom
          and up the right side, ending at the top-right where the arrow head sits */}
      <path
        d="M 8,46
           C 1,56  5,68  26,67
           C 48,66  64,52  64,36
           C 64,24  57,16  50,13"
        stroke="url(#lg-gold)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* — Arrow head at top-right of swoosh, pointing upper-right — */}
      <path
        d="M 43,9  L 52,14  L 47,23"
        stroke="url(#lg-gold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* — Teal bar charts inside lower portion of the S —
          Three ascending bars: short / medium / tall */}
      <rect x="14" y="47" width="5.5" height="9"  rx="1.5" fill="url(#lg-teal)" />
      <rect x="22" y="42" width="5.5" height="14" rx="1.5" fill="url(#lg-teal)" />
      <rect x="30" y="37" width="5.5" height="19" rx="1.5" fill="url(#lg-teal)" />

      {/* ══════════════════════════════════════════════
          STEWARD wordmark — starts to the right of the mark
          ══════════════════════════════════════════════ */}
      <text
        x="80"
        y="43"
        fontFamily="'Outfit', 'Inter', system-ui, sans-serif"
        fontWeight="600"
        fontSize="24"
        fill="url(#lg-gold)"
        letterSpacing="5"
      >
        STEWARD
      </text>
    </svg>
  );
}
