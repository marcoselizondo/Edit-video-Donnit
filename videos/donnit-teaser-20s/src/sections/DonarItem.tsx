import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhoneDevice } from "../components/PhoneDevice";
import { KineticWords, Token } from "../components/Kinetic";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · ficha + botón "¡Lo quiero!" (verde)
const tokens: Token[] = [
  {
    text: "Un vecino",
    x: 30,
    y: 12,
    size: 100,
    delay: 6,
    color: "#fff",
    chip: COLORS.greenDeep,
    entrance: "fromTop",
  },
  {
    text: "lo recibe",
    x: 71,
    y: 28,
    size: 72,
    delay: 16,
    color: COLORS.ink,
    chip: "rgba(255,255,255,0.92)",
    entrance: "fromRight",
    rot: 3,
  },
  {
    text: "Cero basura",
    x: 50,
    y: 90,
    size: 130,
    delay: 34,
    color: COLORS.greenDeep,
    chip: "rgba(255,255,255,0.95)",
    entrance: "slam",
  },
];

export const DonarItem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade();

  // pulso sobre la zona del botón "¡Lo quiero!"
  const tap = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const tapScale = interpolate(tap, [0, 1], [0, 1.2]);
  const tapFade = interpolate(frame, [30, 42, 58], [0, 0.55, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneDevice src="clip_item.mp4" height={1360} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "64%",
          width: 240,
          height: 240,
          borderRadius: 999,
          border: `8px solid ${COLORS.white}`,
          transform: `translate(-50%,-50%) scale(${tapScale})`,
          opacity: tapFade,
        }}
      />
      <KineticWords tokens={tokens} />
    </AbsoluteFill>
  );
};
