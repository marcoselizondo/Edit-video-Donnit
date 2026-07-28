import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// ── Cámara "en mano" — deriva orgánica continua (ref. Cursor for iOS) ─────────
// Devuelve un pequeño desplazamiento/rotación que se aplica a toda la escena
// para dar sensación de estar sostenida por una persona, no de estar clavada.
export const useHandheld = (amp = 1) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return {
    x: (Math.sin(t * 0.9) * 7 + Math.sin(t * 2.3) * 2.2) * amp,
    y: (Math.cos(t * 0.7) * 6 + Math.cos(t * 1.9) * 1.6) * amp,
    rot: (Math.sin(t * 0.5) * 0.55 + Math.sin(t * 1.7) * 0.15) * amp,
  };
};

// Empuje de cámara lento por plano (dolly-in) — cinematográfico y con aire para VO.
export const usePushIn = (from = 1.0, to = 1.08, over = 150) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, over], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

// ── Grano de película — textura sutil que unifica el look cinematográfico ─────
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  const seed = (frame % 12) + 1; // reanima el ruido cada frame
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`grain${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

// Viñeta suave — enfoca la mirada al centro (look de lente).
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.5 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(120% 90% at 50% 42%, rgba(0,0,0,0) 52%, rgba(12,26,18,${strength}) 100%)`,
    }}
  />
);

// Haces de luz que se cuelan y derivan — ambiente cálido/orgánico detrás del sujeto.
export const LightBeams: React.FC<{ tint?: string }> = ({
  tint = "rgba(143,214,120,0.30)",
}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const drift = Math.sin(t * 0.4) * 40;
  const drift2 = Math.cos(t * 0.33) * 30;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -300 + drift,
          left: -200,
          width: 900,
          height: 1600,
          transform: "rotate(18deg)",
          filter: "blur(80px)",
          background: `linear-gradient(180deg, ${tint} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -400 - drift2,
          right: -260,
          width: 820,
          height: 1500,
          transform: "rotate(-14deg)",
          filter: "blur(90px)",
          background: `linear-gradient(0deg, rgba(255,246,230,0.22) 0%, rgba(0,0,0,0) 68%)`,
        }}
      />
    </AbsoluteFill>
  );
};
