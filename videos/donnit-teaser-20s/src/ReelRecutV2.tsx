import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
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
//  ReelRecutV2 — RE-CORTE + RE-ORDEN real (no decoración del original).
//  Fuente: footage/reel-base.mp4 (= reel-instagram-v1, 9:16 completo).
//  Orden de salida ≠ orden del raw:  HOOK[4-7] → PRUEBA[10.5-17] →
//  CONTRASTE[0-4] → CIERRE[18.5-22.5].  Texto COMPLETO (nunca progresivo).
//  Ver edit_log.md para la tabla de cortes.
// ═══════════════════════════════════════════════════════════════════════════

const SRC = "footage/reel-base.mp4";
const F = 30;

// Clip: recorte del raw (startSec) + punch-in opcional (ease-out y luego estático).
const Clip: React.FC<{
  startSec: number;
  rate?: number;
  ambient?: number;
  punchTo?: number; // 1.0 = sin punch
  punchFrames?: number;
}> = ({ startSec, rate = 1, ambient = 0, punchTo = 1.0, punchFrames = 12 }) => {
  const frame = useCurrentFrame();
  const scale =
    punchTo > 1.0
      ? interpolate(frame, [0, punchFrames], [1.0, punchTo], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        })
      : 1.0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(SRC)}
          startFrom={Math.round(startSec * F)}
          playbackRate={rate}
          volume={ambient > 0 ? ambient : 0}
          muted={ambient <= 0}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Overlay de texto que aparece COMPLETO (fade-in 0.15s / hold / fade-out 0.15s).
// Nunca palabra por palabra. Respeta safe margins (≥120px lados, ≥200px inferior).
const TextCard: React.FC<{
  lines: { seg: { t: string; hi?: boolean }[] }[];
  bottom?: number; // px desde el borde inferior (tercio inferior)
  top?: number; // alternativa: px desde arriba
  dur: number;
  size?: number;
  center?: boolean;
}> = ({ lines, bottom, top, dur, size = 66, center = false }) => {
  const frame = useCurrentFrame();
  const op = interpolate(
    frame,
    [0, 5, dur - 5, dur],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pos: React.CSSProperties = center
    ? { top: "42%", transform: "translateY(-50%)" }
    : top !== undefined
    ? { top }
    : { bottom: bottom ?? 220 };
  return (
    <div
      style={{
        position: "absolute",
        left: 130,
        right: 130,
        textAlign: "center",
        opacity: op,
        ...pos,
      }}
    >
      {lines.map((ln, i) => (
        <div key={i} style={{ lineHeight: 1.2 }}>
          {ln.seg.map((s, j) => (
            <span
              key={j}
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: size,
                letterSpacing: -1,
                color: s.hi ? COLORS.greenInk : "#fff",
                background: s.hi ? COLORS.freeGreen : "transparent",
                padding: s.hi ? "2px 14px" : 0,
                borderRadius: s.hi ? 12 : 0,
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                textShadow: s.hi ? "none" : "0 4px 18px rgba(0,0,0,0.6)",
                whiteSpace: "pre",
              }}
            >
              {s.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const Scrim: React.FC<{ top?: boolean; bottom?: boolean }> = ({ top = true, bottom = true }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {top && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 480, background: "linear-gradient(180deg, rgba(8,20,14,0.6) 0%, rgba(8,20,14,0) 100%)" }} />}
    {bottom && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 620, background: "linear-gradient(0deg, rgba(8,20,14,0.8) 0%, rgba(8,20,14,0) 100%)" }} />}
  </AbsoluteFill>
);

const Sfx: React.FC<{ src: string; vol?: number }> = ({ src, vol = 0.35 }) => (
  <Audio src={staticFile(`audio/${src}`)} volume={vol} />
);

// Logo de cierre: ≥15% del ancho (usa 220px ≈ 20%), centrado.
const CloseLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 24, fps, config: { damping: 15, mass: 0.8 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
      <Img src={staticFile("DonnitLogo.png")} style={{ width: 220, height: 220, borderRadius: 52, boxShadow: "0 16px 44px rgba(0,0,0,0.5)" }} />
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 88, color: "#fff", letterSpacing: -2, textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>donnit</span>
    </div>
  );
};

export const ReelRecutV2: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
      {/* 1 · HOOK — raw 4.0s (mira a cámara + se agacha) · punch 1.0→1.08 · ambiente */}
      <Sequence from={0} durationInFrames={90}>
        <Clip startSec={4.0} ambient={0.6} punchTo={1.08} punchFrames={12} />
        <Scrim />
        <TextCard
          dur={90}
          size={64}
          bottom={230}
          lines={[
            { seg: [{ t: "La encontramos tirada" }] },
            { seg: [{ t: "entre la " }, { t: "basura", hi: true }, { t: " en Barcelona" }] },
          ]}
        />
      </Sequence>

      {/* 2 · PRUEBA — jump cuts del tramo de traslado (raw 10.5 / 12.9 / 15.2) */}
      <Sequence from={90} durationInFrames={70}>
        <Clip startSec={10.5} ambient={0.6} punchTo={1.05} punchFrames={8} />
        <Sequence from={0} durationInFrames={9}><Sfx src="click.mp3" vol={0.3} /></Sequence>
      </Sequence>
      <Sequence from={160} durationInFrames={70}>
        <Clip startSec={12.9} ambient={0.6} punchTo={1.05} punchFrames={8} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" vol={0.3} /></Sequence>
      </Sequence>
      {/* corte de más movimiento (pararse) → 85% velocidad */}
      <Sequence from={230} durationInFrames={70}>
        <Clip startSec={15.2} rate={0.85} ambient={0.6} punchTo={1.05} punchFrames={8} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" vol={0.3} /></Sequence>
      </Sequence>

      {/* 3 · CONTRASTE — raw 0.0s (plano general) · ESTÁTICO · texto "PERFECTO" */}
      <Sequence from={300} durationInFrames={120}>
        <Clip startSec={0.0} ambient={0.2} punchTo={1.0} />
        <Scrim bottom={false} />
        <TextCard
          dur={120}
          size={82}
          center
          lines={[{ seg: [{ t: "Estado: " }, { t: "PERFECTO", hi: true }, { t: "  ✅" }] }]}
        />
      </Sequence>

      {/* 4 · CIERRE — raw 18.5s (silla sola) · texto + logo (sin CTA de descarga) */}
      <Sequence from={420} durationInFrames={120}>
        <Clip startSec={18.5} ambient={0.2} punchTo={1.0} />
        <Scrim />
        <TextCard
          dur={120}
          size={58}
          top={200}
          lines={[
            { seg: [{ t: "Esto podría estar en" }] },
            { seg: [{ t: "casa de un vecino," }] },
            { seg: [{ t: "no en la " }, { t: "basura", hi: true }] },
          ]}
        />
        <CloseLogo />
      </Sequence>

      {/* Música desde el inicio del CONTRASTE (frame 300): 0 → nivel en 1s */}
      <Sequence from={300} durationInFrames={240}>
        <Audio
          src={staticFile("audio/bgm.mp3")}
          startFrom={0}
          volume={(f) =>
            interpolate(f, [0, 30, 210, 240], [0, 0.42, 0.42, 0.1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const REEL_RECUT_V2_TOTAL = 540;
