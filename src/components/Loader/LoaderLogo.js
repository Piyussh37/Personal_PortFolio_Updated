import React from "react";
import "./LoaderLogo.css";

// Single monoline "P" glyph, drawn at local size 30x80.
// Reused twice (translated) so the two letters never overlap.
const P_GLYPH_D = "M0,0 L0,80 M0,0 L20,0 C32,0 32,35 20,35 L0,35";

const HEX_DOTS = [
  [150, 20],
  [255, 80],
  [255, 200],
  [150, 260],
  [45, 200],
  [45, 80],
];

class LoaderLogo extends React.Component {
  render() {
    const { theme, name = "PIYUSH PATIL", tagline = "PORTFOLIO" } = this.props;

    // Explicit color fallbacks
    const accentColor = theme?.body || "#5EEAD4";
    const accent2 = theme?.accent2 || "#3B82F6";
    const textColor = theme?.text || "#E9EEF7";
    const mutedColor = theme?.muted || "#5B6B85";

    let visibleIndex = 0;

    return (
      <div className="pp-loader">
        <div className="pp-hex-stage">
          <svg
            className="pp-hex-svg"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ppFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accentColor} />
                <stop offset="100%" stopColor={accent2} />
              </linearGradient>
            </defs>

            {/* --- Hexagon frame: draws itself on mount --- */}
            <polygon
              className="pp-hex-frame"
              points="150,20 255,80 255,200 150,260 45,200 45,80"
              fill="none"
            />

            {/* --- Corner dots, lit in sequence as the frame completes --- */}
            {HEX_DOTS.map(([cx, cy], i) => (
              <circle
                key={i}
                className="pp-hex-dot"
                cx={cx}
                cy={cy}
                r="3"
                fill={accentColor}
                style={{ animationDelay: `calc(var(--draw-duration) * ${(i + 1) * 0.15})` }}
              />
            ))}

            {/* --- Monogram: two clean, non-overlapping P glyphs --- */}
            <path
              className="pp-glyph pp-glyph--one"
              d={P_GLYPH_D}
              stroke="url(#ppFrameGradient)"
              transform="translate(118,110)"
            />
            <path
              className="pp-glyph pp-glyph--two"
              d={P_GLYPH_D}
              stroke={accentColor}
              transform="translate(155,110)"
            />

            {/* --- Traveling pulse once the frame has finished drawing --- */}
            <circle className="pp-hex-pulse" r="4" fill="#ffffff" />
          </svg>
        </div>

        {/* --- Full name below the hexagon --- */}
        <div className="pp-name" style={{ color: textColor }} aria-label={name}>
          {name.split("").map((ch, i) => {
            if (ch === " ") {
              return <span key={i} className="pp-space">&nbsp;</span>;
            }
            const delay = `calc(var(--draw-duration) + 0.15s + ${visibleIndex * 0.045}s)`;
            visibleIndex += 1;
            return (
              <span key={i} style={{ animationDelay: delay }}>
                {ch}
              </span>
            );
          })}
        </div>

        {tagline && (
          <div className="pp-tagline" style={{ color: mutedColor }}>
            {tagline}
          </div>
        )}
      </div>
    );
  }
}

export default LoaderLogo;