import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { COLORS } from "../theme";

// Muestra un clip real de la app dentro de un "dispositivo" con leve movimiento 2.5D.
export const PhoneScreen: React.FC<{
  src: string;
  startFrom?: number;
  bgFrom?: string;
  bgTo?: string;
  tint?: string; // overlay para "calentar" pantallas oscuras (mapa)
  zoom?: [number, number];
  panY?: [number, number];
  deviceHeight?: number;
}> = ({
  src,
  startFrom = 0,
  bgFrom = COLORS.bgLight,
  bgTo = COLORS.bgWarm,
  tint,
  zoom = [1.0, 1.06],
  panY = [0, -24],
  deviceHeight = 1480,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], zoom, {
    extrapolateRight: "clamp",
  });
  const ty = interpolate(frame, [0, 120], panY, { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      }}
    >
      {/* halo suave detrás del dispositivo */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 42% at 50% 40%, rgba(143,214,120,0.35), rgba(143,214,120,0) 70%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `translateY(${ty}px) scale(${scale})`,
            width: deviceHeight * 0.5, // aspecto vertical del clip
            height: deviceHeight,
            borderRadius: 62,
            overflow: "hidden",
            background: "#000",
            boxShadow:
              "0 40px 90px rgba(23,51,31,0.28), 0 0 0 10px rgba(255,255,255,0.85)",
            position: "relative",
          }}
        >
          <OffthreadVideo
            src={staticFile(src)}
            startFrom={startFrom}
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          {tint ? (
            <AbsoluteFill
              style={{ background: tint, mixBlendMode: "soft-light" }}
            />
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
