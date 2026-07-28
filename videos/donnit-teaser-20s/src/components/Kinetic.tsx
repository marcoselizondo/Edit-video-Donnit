import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";

export type Entrance =
  | "pop"
  | "slam"
  | "fromLeft"
  | "fromRight"
  | "fromTop"
  | "fromBottom"
  | "whip"
  | "blurUp";

export type Token = {
  text: string;
  x: number; // % horizontal (centro de la palabra)
  y: number; // % vertical
  size: number;
  delay?: number;
  color?: string;
  weight?: number;
  rot?: number;
  entrance?: Entrance;
  chip?: string; // color de fondo tipo píldora (opcional, para legibilidad)
  font?: string;
  align?: "left" | "center" | "right";
  exitAt?: number; // frame local en el que empieza a salir
};

const useToken = (t: Token) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = t.delay ?? 0;
  const f = frame - delay;
  const ent = t.entrance ?? "pop";

  const s = spring({ frame: f, fps, config: { damping: 13, mass: 0.8, stiffness: 110 } });
  const lin = interpolate(f, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let tx = 0;
  let ty = 0;
  let scale = 1;
  let blur = 0;
  let rot = t.rot ?? 0;
  let opacity = lin;

  switch (ent) {
    case "pop":
      scale = interpolate(s, [0, 1], [0, 1]);
      break;
    case "slam":
      scale = interpolate(s, [0, 1], [2.6, 1]);
      blur = interpolate(f, [0, 6], [22, 0], { extrapolateRight: "clamp" });
      break;
    case "fromLeft":
      tx = interpolate(s, [0, 1], [-520, 0]);
      break;
    case "fromRight":
      tx = interpolate(s, [0, 1], [520, 0]);
      break;
    case "fromTop":
      ty = interpolate(s, [0, 1], [-360, 0]);
      break;
    case "fromBottom":
      ty = interpolate(s, [0, 1], [360, 0]);
      break;
    case "whip":
      tx = interpolate(s, [0, 1], [420, 0]);
      rot = (t.rot ?? 0) + interpolate(s, [0, 1], [-12, 0]);
      blur = interpolate(f, [0, 5], [16, 0], { extrapolateRight: "clamp" });
      break;
    case "blurUp":
      ty = interpolate(s, [0, 1], [70, 0]);
      blur = interpolate(f, [0, 10], [18, 0], { extrapolateRight: "clamp" });
      break;
  }

  // salida opcional
  if (t.exitAt !== undefined) {
    const e = frame - t.exitAt;
    opacity *= interpolate(e, [0, 8], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    scale *= interpolate(e, [0, 8], [1, 1.15], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  return { tx, ty, scale, blur, rot, opacity };
};

const Word: React.FC<{ t: Token }> = ({ t }) => {
  const { tx, ty, scale, blur, rot, opacity } = useToken(t);
  return (
    <div
      style={{
        position: "absolute",
        left: `${t.x}%`,
        top: `${t.y}%`,
        transform: `translate(-50%,-50%) translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${scale})`,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: t.font ?? FONTS.display,
          fontWeight: t.weight ?? 800,
          fontSize: t.size,
          color: t.color ?? COLORS.ink,
          letterSpacing: -1.5,
          lineHeight: 1,
          padding: t.chip ? "12px 26px" : 0,
          borderRadius: t.chip ? 999 : 0,
          background: t.chip ?? "transparent",
          boxShadow: t.chip ? "0 14px 34px rgba(23,51,31,0.22)" : undefined,
          textShadow: t.chip ? undefined : "0 6px 22px rgba(23,51,31,0.28)",
        }}
      >
        {t.text}
      </span>
    </div>
  );
};

// Tipografía cinética: palabras dispersas por la pantalla con tamaños y efectos distintos.
export const KineticWords: React.FC<{ tokens: Token[] }> = ({ tokens }) => (
  <>
    {tokens.map((t, i) => (
      <Word key={i} t={t} />
    ))}
  </>
);
