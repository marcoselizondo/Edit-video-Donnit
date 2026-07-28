import React from "react";
import { AbsoluteFill } from "remotion";
import { PhoneDevice } from "../components/PhoneDevice";
import { KineticWords, Token } from "../components/Kinetic";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · mapa hiperlocal (verde) — el móvil ya está presente (continuidad)
const tokens: Token[] = [
  {
    text: "Tu barrio",
    x: 30,
    y: 12,
    size: 108,
    delay: 6,
    color: "#fff",
    chip: COLORS.greenDeep,
    entrance: "fromLeft",
  },
  {
    text: "está lleno de",
    x: 68,
    y: 30,
    size: 66,
    delay: 16,
    color: COLORS.ink,
    chip: "rgba(255,255,255,0.92)",
    entrance: "fromRight",
    rot: 3,
  },
  {
    text: "tesoros",
    x: 50,
    y: 90,
    size: 150,
    delay: 24,
    color: COLORS.greenDeep,
    chip: "rgba(255,255,255,0.95)",
    entrance: "slam",
  },
];

export const DonarMap: React.FC = () => {
  const opacity = useEdgeFade();
  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneDevice
        src="clip_map.mp4"
        height={1360}
        tint="rgba(143,214,120,0.55)"
      />
      <KineticWords tokens={tokens} />
    </AbsoluteFill>
  );
};
