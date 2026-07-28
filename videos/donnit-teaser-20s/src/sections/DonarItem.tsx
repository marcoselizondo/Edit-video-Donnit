import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhoneScreen } from "../components/PhoneScreen";
import { Caption, Hi } from "../components/Caption";
import { COLORS, FONTS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · ficha + botón "¡Lo quiero!" (verde)
export const DonarItem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade();

  // "toque" que resalta la acción de reclamar
  const tap = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const tapScale = interpolate(tap, [0, 1], [0, 1.15]);
  const tapFade = interpolate(frame, [30, 42, 58], [0, 0.5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneScreen src="clip_item.mp4" zoom={[1.05, 1.12]} panY={[0, -14]} />
      {/* pulso sobre la zona del botón */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "63%",
          width: 260,
          height: 260,
          borderRadius: 999,
          border: `8px solid ${COLORS.white}`,
          transform: `translate(-50%,-50%) scale(${tapScale})`,
          opacity: tapFade,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.greenInk,
          opacity: interpolate(frame, [6, 18], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Gratis · de vecino a vecino
      </div>
      <Caption accent={COLORS.greenDeep} startAt={4}>
        Un vecino lo recibe. <Hi>Cero basura.</Hi>
      </Caption>
    </AbsoluteFill>
  );
};
