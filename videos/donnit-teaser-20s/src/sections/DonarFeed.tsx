import React from "react";
import { AbsoluteFill } from "remotion";
import { PhoneDevice } from "../components/PhoneDevice";
import { KineticWords, Token } from "../components/Kinetic";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · feed del barrio (verde) — el móvil ENTRA deslizando desde la derecha
const tokens: Token[] = [
  {
    text: "Regálalo",
    x: 30,
    y: 12,
    size: 100,
    delay: 14,
    color: COLORS.ink,
    chip: "rgba(255,255,255,0.92)",
    entrance: "fromLeft",
    rot: -3,
  },
  {
    text: "gratis",
    x: 72,
    y: 22,
    size: 156,
    delay: 20,
    color: COLORS.greenDeep,
    chip: "rgba(255,255,255,0.95)",
    entrance: "slam",
  },
  {
    text: "en tu barrio",
    x: 50,
    y: 90,
    size: 92,
    delay: 30,
    color: "#fff",
    chip: COLORS.greenDeep,
    entrance: "blurUp",
  },
];

export const DonarFeed: React.FC = () => {
  const opacity = useEdgeFade();
  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneDevice src="clip_feed.mp4" entrance="slideRight" height={1360} />
      <KineticWords tokens={tokens} />
    </AbsoluteFill>
  );
};
