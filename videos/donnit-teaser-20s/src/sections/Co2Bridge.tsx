import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Co2Flywheel } from "../components/Co2Flywheel";
import { COLORS, FONTS } from "../theme";
import { useEdgeFade } from "../util";

// PUENTE · mecánica CO₂ (verde → turquesa, con criterio)
export const Co2Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade();
  const titleUp = interpolate(frame, [4, 16], [40, 0], {
    extrapolateRight: "clamp",
  });
  const titleOp = interpolate(frame, [4, 16], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <Co2Flywheel />
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `translateY(${titleUp}px)`,
          opacity: titleOp,
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 66,
          color: COLORS.ink,
          letterSpacing: -1.5,
        }}
      >
        Donas y ganas impacto
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 165,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [40, 55], [0, 1], {
            extrapolateRight: "clamp",
          }),
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.inkSoft,
        }}
      >
        …que gastas para alquilar más barato
      </div>
    </AbsoluteFill>
  );
};
