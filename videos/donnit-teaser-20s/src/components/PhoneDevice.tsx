import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";

type Entrance = "slideRight" | "slideLeft" | "none";

// Móvil con marco realista (bisel + isla dinámica) que ENTRA animado desde un lado
// (desliza + rotación 3D) y luego mantiene un leve movimiento 2.5D.
export const PhoneDevice: React.FC<{
  src: string;
  startFrom?: number;
  entrance?: Entrance;
  bgFrom?: string;
  bgTo?: string;
  tint?: string;
  height?: number;
  glow?: string;
}> = ({
  src,
  startFrom = 0,
  entrance = "none",
  bgFrom = COLORS.bgLight,
  bgTo = COLORS.bgWarm,
  tint,
  height = 1420,
  glow = "rgba(143,214,120,0.5)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progreso de entrada con overshoot — más lenta y notoria
  const p = spring({
    frame,
    fps,
    config: { damping: 17, mass: 1.6, stiffness: 52 },
  });

  const dir = entrance === "slideRight" ? 1 : -1;
  const enterX = entrance === "none" ? 0 : interpolate(p, [0, 1], [dir * 1350, 0]);
  const enterRot = entrance === "none" ? 0 : interpolate(p, [0, 1], [dir * -48, 0]);
  const enterScale = entrance === "none" ? 1 : interpolate(p, [0, 1], [0.78, 1]);

  // Deriva 2.5D después de entrar
  const drift = interpolate(frame, [10, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(drift, [0, 1], [0, -22]);
  const driftScale = interpolate(drift, [0, 1], [1, 1.05]);

  const width = height * 0.492;
  const bezel = 20;

  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgTo} 100%)` }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(58% 42% at 50% 42%, ${glow}, rgba(0,0,0,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          perspective: 1800,
        }}
      >
        <div
          style={{
            transform: `translateX(${enterX}px) translateY(${driftY}px) rotateY(${enterRot}deg) scale(${enterScale * driftScale})`,
            width: width + bezel * 2,
            height: height + bezel * 2,
            borderRadius: 88,
            background: "linear-gradient(160deg,#20242b,#0c0e12)",
            padding: bezel,
            boxShadow:
              "0 55px 120px rgba(23,51,31,0.35), inset 0 0 0 2px rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          <div
            style={{
              width,
              height,
              borderRadius: 70,
              overflow: "hidden",
              background: "#000",
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
              <AbsoluteFill style={{ background: tint, mixBlendMode: "soft-light" }} />
            ) : null}
            {/* isla dinámica */}
            <div
              style={{
                position: "absolute",
                top: 22,
                left: "50%",
                transform: "translateX(-50%)",
                width: 118,
                height: 34,
                borderRadius: 999,
                background: "#000",
              }}
            />
            {/* brillo de pantalla */}
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 30%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
