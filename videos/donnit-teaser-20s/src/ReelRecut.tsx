import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./theme";
import { loadFonts } from "./load-fonts";

// ═══════════════════════════════════════════════════════════════════════════
//  ReelRecut — re-montaje NO LINEAL del raw (silla de oficina).
//  Estructura pedida: HOOK (acción primero) → PRUEBA (jump cuts) →
//  CONTRASTE (plano general que estaba al inicio) → GIRO Donnit.
//  ~18s · 9:16 · 30fps · texto kinético · SFX en cada corte · música desde 0:10.
//  Regla: ningún plano estático >2s · legible en mudo.
// ═══════════════════════════════════════════════════════════════════════════

const SRC = "footage/WhatsApp Video 2026-07-30 at 19.42.02.mp4";

// Video con relleno desenfocado 9:16 + punch-in (zoom) + audio ambiente opcional.
const Shot: React.FC<{
  startSec: number;
  playbackRate?: number;
  ambient?: number;
  punch?: [number, number]; // escala inicio→fin
  pop?: boolean; // zoom-punch rápido al entrar
}> = ({ startSec, playbackRate = 1, ambient = 0, punch = [1.04, 1.12], pop = true }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const startFrom = Math.round(startSec * 30);
  const creep = interpolate(frame, [0, durationInFrames], punch, { extrapolateRight: "clamp" });
  const snap = pop ? spring({ frame, fps, config: { damping: 14, mass: 0.7, stiffness: 150 } }) : 1;
  const scale = pop ? creep * interpolate(snap, [0, 1], [1.06, 1]) : creep;

  const bg = (
    <OffthreadVideo
      src={staticFile(SRC)}
      startFrom={startFrom}
      playbackRate={playbackRate}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(30px) brightness(0.5)", transform: "scale(1.12)" }}
    />
  );
  const fg = (
    <OffthreadVideo
      src={staticFile(SRC)}
      startFrom={startFrom}
      playbackRate={playbackRate}
      volume={ambient > 0 ? ambient : 0}
      muted={ambient <= 0}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        {bg}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>{fg}</AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scrim para legibilidad del texto.
const Scrim: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 520, background: "linear-gradient(180deg, rgba(8,20,14,0.66) 0%, rgba(8,20,14,0) 100%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 620, background: "linear-gradient(0deg, rgba(8,20,14,0.78) 0%, rgba(8,20,14,0) 100%)" }} />
  </AbsoluteFill>
);

// Texto kinético multi-palabra: cascada de entrada (no subtítulo literal).
const KText: React.FC<{
  words: { t: string; hi?: boolean }[];
  y: number;
  size?: number;
  from?: number;
  to?: number;
}> = ({ words, y, size = 68, from = 0, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const outO = to !== undefined ? interpolate(frame, [to - 8, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  return (
    <div style={{ position: "absolute", left: 64, right: 64, top: `${y}%`, textAlign: "center", opacity: outO }}>
      {words.map((w, i) => {
        const d = from + i * 3;
        const s = spring({ frame: frame - d, fps, config: { damping: 13, mass: 0.6, stiffness: 130 } });
        const op = interpolate(frame - d, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              margin: "0 8px",
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: size,
              lineHeight: 1.18,
              letterSpacing: -1,
              color: w.hi ? COLORS.greenInk : "#fff",
              background: w.hi ? COLORS.freeGreen : "transparent",
              padding: w.hi ? "2px 16px" : 0,
              borderRadius: w.hi ? 12 : 0,
              transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
              opacity: op,
              textShadow: w.hi ? "none" : "0 4px 18px rgba(0,0,0,0.55)",
            }}
          >
            {w.t}
          </span>
        );
      })}
    </div>
  );
};

// Sello "Estado: PERFECTO ✅" — entra con impacto y leve rotación.
const Stamp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, mass: 0.8, stiffness: 130 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: "42%", textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [1.8, 1])})`,
          opacity: interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
          padding: "18px 42px",
          border: `6px solid ${COLORS.freeGreen}`,
          borderRadius: 20,
          background: "rgba(8,20,14,0.35)",
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 92,
          color: "#fff",
          letterSpacing: -1,
          boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
        }}
      >
        Estado: <span style={{ color: COLORS.freeGreen }}>PERFECTO</span> ✅
      </div>
    </div>
  );
};

// SFX puntual en un corte.
const Sfx: React.FC<{ src: string; vol?: number }> = ({ src, vol = 0.8 }) => (
  <Audio src={staticFile(`audio/${src}`)} volume={vol} />
);

// ── Timeline ────────────────────────────────────────────────────────────────
// A HOOK 0-90 · B PRUEBA 90-300 (4 cortes) · C CONTRASTE 300-420 · D GIRO 420-540
export const ReelRecut: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
      {/* A · HOOK — acción primero (ajuste/giro dinámico ~5.6s del raw) */}
      <Sequence from={0} durationInFrames={90}>
        <Shot startSec={5.6} ambient={0.35} punch={[1.08, 1.2]} />
        <Scrim />
        <KText
          from={2}
          to={84}
          y={64}
          size={72}
          words={[
            { t: "La" }, { t: "encontramos" }, { t: "tirada" }, { t: "entre" }, { t: "la" }, { t: "basura", hi: true }, { t: "en" }, { t: "Barcelona" },
          ]}
        />
        <Sequence from={0}><Sfx src="woosh-soft.mp3" vol={0.6} /></Sequence>
      </Sequence>

      {/* B · PRUEBA — jump cuts con punch + SFX */}
      <Sequence from={90} durationInFrames={54}>
        <Shot startSec={9.0} ambient={0.12} punch={[1.08, 1.16]} />
        <Sequence from={0}><Sfx src="click.mp3" /></Sequence>
      </Sequence>
      <Sequence from={144} durationInFrames={54}>
        <Shot startSec={12.0} ambient={0.12} punch={[1.1, 1.18]} />
        <Sequence from={0}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>
      {/* corte "satisfactorio" al 80% de velocidad */}
      <Sequence from={198} durationInFrames={60}>
        <Shot startSec={14.0} playbackRate={0.8} ambient={0.12} punch={[1.06, 1.16]} />
        <Sequence from={0}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>
      <Sequence from={258} durationInFrames={42}>
        <Shot startSec={15.6} ambient={0.12} punch={[1.1, 1.2]} />
        <Sequence from={0}><Sfx src="click.mp3" /></Sequence>
      </Sequence>

      {/* C · CONTRASTE — plano general que estaba PRIMERO (raw 0-4s) */}
      <Sequence from={300} durationInFrames={120}>
        <Shot startSec={0.0} ambient={0} punch={[1.0, 1.12]} pop={false} />
        <Scrim />
        <Stamp />
        <Sequence from={2}><Sfx src="zoom-hit.mp3" vol={0.7} /></Sequence>
        <Sequence from={4}><Sfx src="confirm.mp3" vol={0.6} /></Sequence>
      </Sequence>

      {/* D · GIRO Donnit — silla sola (raw ~18.5s), mensaje + logo, sin CTA de descarga */}
      <Sequence from={420} durationInFrames={120}>
        <Shot startSec={18.5} ambient={0} punch={[1.0, 1.1]} pop={false} />
        <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(8,20,14,0.6) 0%, rgba(8,20,14,0) 55%)" }} />
        <KText
          from={6}
          y={58}
          size={62}
          words={[
            { t: "Esto" }, { t: "podría" }, { t: "estar" }, { t: "en" }, { t: "casa" }, { t: "de" }, { t: "un" }, { t: "vecino," }, { t: "no" }, { t: "en" }, { t: "la" }, { t: "basura", hi: true },
          ]}
        />
        <Logo />
      </Sequence>

      {/* Música desde 0:10 (frame 300), sube gradual y baja al final */}
      <Sequence from={300} durationInFrames={240}>
        <Audio
          src={staticFile("audio/bgm.mp3")}
          startFrom={0}
          volume={(f) =>
            interpolate(f, [0, 28, 200, 240], [0, 0.5, 0.5, 0.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// Logo Donnit del cierre (sin CTA de descarga).
const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 40, fps, config: { damping: 14, mass: 0.8 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 190, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
      <Img src={staticFile("DonnitLogo.png")} style={{ width: 92, height: 92, borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }} />
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 76, color: "#fff", letterSpacing: -2, textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>donnit</span>
    </div>
  );
};

export const REEL_RECUT_TOTAL = 540;
