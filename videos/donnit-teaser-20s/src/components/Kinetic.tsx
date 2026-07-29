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
  | "blurUp"
  | "bounce"
  | "typewriter"
  | "assemble";

export type Token = {
  text: string;
  x: number; // % horizontal (centro)
  y: number; // % vertical
  size: number;
  delay?: number;
  color?: string;
  weight?: number;
  rot?: number;
  entrance?: Entrance;
  chip?: string;
  font?: string;
  shadow?: string; // text-shadow personalizado (p.ej. glow blanco)
  perChar?: number; // frames por carácter (typewriter/assemble)
  exitAt?: number;
};

// pseudo-aleatorio determinista por índice
const rand = (i: number, salt = 1) => {
  const x = Math.sin((i + 1) * 12.9898 * salt) * 43758.5453;
  return x - Math.floor(x);
};

const useExit = (t: Token) => {
  const frame = useCurrentFrame();
  if (t.exitAt === undefined) return 1;
  return interpolate(frame - t.exitAt, [0, 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const baseSpan = (t: Token): React.CSSProperties => ({
  fontFamily: t.font ?? FONTS.display,
  fontWeight: t.weight ?? 800,
  fontSize: t.size,
  color: t.color ?? COLORS.ink,
  letterSpacing: -1.5,
  lineHeight: 1,
  textShadow: t.shadow ?? (t.chip ? undefined : "0 6px 22px rgba(23,51,31,0.22)"),
  padding: t.chip ? "12px 26px" : 0,
  borderRadius: t.chip ? 999 : 0,
  background: t.chip ?? "transparent",
  whiteSpace: "pre",
});

// ---- palabra con transform de bloque (pop/slam/from*/whip/blurUp/bounce) ----
const BlockWord: React.FC<{ t: Token }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = t.delay ?? 0;
  const f = frame - delay;
  const ent = t.entrance ?? "pop";
  const exit = useExit(t);

  const s = spring({ frame: f, fps, config: { damping: 13, mass: 0.8, stiffness: 110 } });
  const lin = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  let tx = 0, ty = 0, scale = 1, blur = 0, rot = t.rot ?? 0;

  if (ent === "pop") scale = s;
  else if (ent === "slam") { scale = interpolate(s, [0, 1], [2.6, 1]); blur = interpolate(f, [0, 6], [22, 0], { extrapolateRight: "clamp" }); }
  else if (ent === "fromLeft") tx = interpolate(s, [0, 1], [-520, 0]);
  else if (ent === "fromRight") tx = interpolate(s, [0, 1], [520, 0]);
  else if (ent === "fromTop") ty = interpolate(s, [0, 1], [-360, 0]);
  else if (ent === "fromBottom") ty = interpolate(s, [0, 1], [360, 0]);
  else if (ent === "whip") { tx = interpolate(s, [0, 1], [420, 0]); rot = (t.rot ?? 0) + interpolate(s, [0, 1], [-12, 0]); blur = interpolate(f, [0, 5], [16, 0], { extrapolateRight: "clamp" }); }
  else if (ent === "blurUp") { ty = interpolate(s, [0, 1], [70, 0]); blur = interpolate(f, [0, 10], [18, 0], { extrapolateRight: "clamp" }); }
  else if (ent === "bounce") {
    const b = spring({ frame: f, fps, config: { damping: 6, mass: 0.9, stiffness: 200 } });
    ty = interpolate(b, [0, 1], [-360, 0]);
    scale = interpolate(b, [0, 0.7, 1], [0.7, 1.08, 1]);
  }

  return (
    <div style={{ transform: `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${scale})`, opacity: lin * exit, filter: blur ? `blur(${blur}px)` : undefined }}>
      <span style={{ display: "inline-block", ...baseSpan(t) }}>{t.text}</span>
    </div>
  );
};

// ---- máquina de escribir ----
const TypeWord: React.FC<{ t: Token }> = ({ t }) => {
  const frame = useCurrentFrame();
  const delay = t.delay ?? 0;
  const per = t.perChar ?? 3;
  const f = frame - delay;
  const chars = [...t.text];
  const shown = Math.max(0, Math.min(chars.length, Math.floor(f / per)));
  const exit = useExit(t);
  const caretOn = Math.floor(frame / 8) % 2 === 0 && shown <= chars.length;
  return (
    <div style={{ opacity: exit }}>
      <span style={{ ...baseSpan(t), display: "inline-flex", alignItems: "baseline" }}>
        {chars.map((c, i) => (
          <span key={i} style={{ opacity: i < shown ? 1 : 0 }}>{c}</span>
        ))}
        <span style={{ opacity: caretOn ? 1 : 0, marginLeft: 2, color: COLORS.green }}>|</span>
      </span>
    </div>
  );
};

// ---- ensamblado: las letras vuelan desde fuera y forman la palabra ----
const AssembleWord: React.FC<{ t: Token }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = t.delay ?? 0;
  const stagger = t.perChar ?? 2;
  const chars = [...t.text];
  const exit = useExit(t);
  return (
    <div style={{ opacity: exit }}>
      <span style={{ ...baseSpan(t), display: "inline-flex" }}>
        {chars.map((c, i) => {
          const s = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 12, mass: 0.7, stiffness: 120 } });
          const dx = (rand(i, 1) - 0.5) * 700;
          const dy = (rand(i, 2) - 0.5) * 500;
          const rot = (rand(i, 3) - 0.5) * 90;
          return (
            <span key={i} style={{
              display: "inline-block",
              transform: `translate(${(1 - s) * dx}px, ${(1 - s) * dy}px) rotate(${(1 - s) * rot}deg)`,
              opacity: s,
              whiteSpace: "pre",
            }}>{c}</span>
          );
        })}
      </span>
    </div>
  );
};

const Word: React.FC<{ t: Token }> = ({ t }) => {
  const ent = t.entrance ?? "pop";
  const inner =
    ent === "typewriter" ? <TypeWord t={t} /> :
    ent === "assemble" ? <AssembleWord t={t} /> :
    <BlockWord t={t} />;
  return (
    <div style={{ position: "absolute", left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%,-50%)", whiteSpace: "nowrap" }}>
      {inner}
    </div>
  );
};

export const KineticWords: React.FC<{ tokens: Token[] }> = ({ tokens }) => (
  <>{tokens.map((t, i) => <Word key={i} t={t} />)}</>
);
