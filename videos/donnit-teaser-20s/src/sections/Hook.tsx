import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";
import { KineticWords, Token } from "../components/Kinetic";

// HOOK (0–2s): tipografía cinética dispersa, en verde (lado donación).
const tokens: Token[] = [
  { text: "Eso", x: 26, y: 22, size: 120, delay: 2, color: "#fff", entrance: "fromTop" },
  { text: "que no usas…", x: 55, y: 40, size: 150, delay: 8, color: "#fff", entrance: "slam" },
  { text: "le sirve", x: 62, y: 60, size: 104, delay: 26, color: "#fff", entrance: "whip", rot: -4 },
  {
    text: "a tu vecino",
    x: 43,
    y: 76,
    size: 150,
    delay: 34,
    color: COLORS.greenInk,
    chip: "rgba(255,255,255,0.95)",
    entrance: "fromBottom",
  },
];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(1, 8);
  const zoom = interpolate(frame, [0, 66], [1.02, 1.1]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `linear-gradient(155deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`,
        transform: `scale(${zoom})`,
      }}
    >
      <KineticWords tokens={tokens} />
    </AbsoluteFill>
  );
};
