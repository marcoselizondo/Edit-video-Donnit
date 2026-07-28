import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../theme";

// Botón "¡Lo quiero!" que se HUNDE al pulsarse (press → sink → release con rebote),
// con dedo que baja y confirmación al soltar.
export const PressButton: React.FC<{
  label?: string;
  pressAt: number; // frame local en el que empieza la pulsación
  width?: number;
}> = ({ label = "¡Lo quiero!", pressAt, width = 560 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - pressAt;

  // fases: baja (0-5) · mantiene (5-11) · suelta con rebote (>11)
  const down = interpolate(f, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const release = spring({ frame: f - 11, fps, config: { damping: 9, stiffness: 140 } });
  const pressed = Math.max(0, down - release); // 1 = hundido, 0 = arriba

  const scale = 1 - pressed * 0.07;
  const ty = pressed * 7;
  const done = f > 11;

  // sombra: elevada arriba → hundida (inset) al pulsar
  const shadow = pressed > 0.5
    ? "inset 0 4px 10px rgba(20,60,43,0.45)"
    : `0 ${10 - pressed * 8}px ${22 - pressed * 16}px rgba(111,191,106,0.45)`;

  // dedo que baja hacia el botón
  const fingerY = interpolate(f, [-14, 0, 11, 20], [-120, -8, -8, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerO = interpolate(f, [-14, -8, 14, 20], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width, display: "flex", justifyContent: "center" }}>
      {/* ripple al soltar */}
      {done && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.8)",
            transform: `translate(-50%,-50%) scale(${interpolate(f, [11, 30], [0.4, 6], { extrapolateRight: "clamp" })})`,
            opacity: interpolate(f, [11, 30], [0.6, 0], { extrapolateRight: "clamp" }),
          }}
        />
      )}
      <div
        style={{
          width: "100%",
          height: 96,
          borderRadius: 999,
          background: pressed > 0.5
            ? "linear-gradient(180deg,#5FB85B,#4FA95B)"
            : "linear-gradient(180deg,#8FD678,#6FBF6A)",
          boxShadow: shadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${ty}px) scale(${scale})`,
          color: "#fff",
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 0.3,
        }}
      >
        {done && f > 16 ? "Enviado ✓" : label}
      </div>

      {/* dedo / punto de toque */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "rgba(20,60,43,0.28)",
          border: "3px solid rgba(255,255,255,0.7)",
          transform: `translate(-50%, ${fingerY}px)`,
          opacity: fingerO,
        }}
      />
    </div>
  );
};
