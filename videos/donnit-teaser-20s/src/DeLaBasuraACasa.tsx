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
//  Reel 01 · "De la basura a tu casa" (9:16 · 18s · 30fps)
//  Metraje: silla de oficina encontrada en la calle (footage/reel-base.mp4).
//  Reglas de marca aplicadas: hook <3s · cortar, no sostener · FOMO implícito ·
//  low-production (sin color grade, sin estabilizar) · CTA = continuación del
//  hook (no logo genérico) · copy en español peninsular (tú).
//  Estructura y cortes: ver README de la branch.
// ═══════════════════════════════════════════════════════════════════════════

const SRC = "footage/reel-base.mp4";
const F = 30;

const Clip: React.FC<{ startSec: number; rate?: number; ambient?: number; punchTo?: number; punchFrames?: number }> = ({
  startSec,
  rate = 1,
  ambient = 0,
  punchTo = 1.0,
  punchFrames = 12,
}) => {
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

// Texto que aparece COMPLETO (fade in/out), márgenes seguros, sin efecto de tipeo.
const TextCard: React.FC<{
  lines: { seg: { t: string; hi?: boolean }[] }[];
  dur: number;
  size?: number;
  bottom?: number;
  top?: number;
  center?: boolean;
}> = ({ lines, dur, size = 64, bottom, top, center }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 5, dur - 6, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pos: React.CSSProperties = center
    ? { top: "42%", transform: "translateY(-50%)" }
    : top !== undefined
    ? { top }
    : { bottom: bottom ?? 230 };
  return (
    <div style={{ position: "absolute", left: 130, right: 130, textAlign: "center", opacity: op, ...pos }}>
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
    {top && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 470, background: "linear-gradient(180deg, rgba(8,20,14,0.58) 0%, rgba(8,20,14,0) 100%)" }} />}
    {bottom && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 640, background: "linear-gradient(0deg, rgba(8,20,14,0.82) 0%, rgba(8,20,14,0) 100%)" }} />}
  </AbsoluteFill>
);

const Sfx: React.FC<{ src: string; vol?: number }> = ({ src, vol = 0.3 }) => (
  <Audio src={staticFile(`audio/${src}`)} volume={vol} />
);

// Firma de marca al cierre: pequeña, como remate de la historia (no logo genérico).
const Signature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 34, fps, config: { damping: 16, mass: 0.8 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 250, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: s, transform: `translateY(${(1 - s) * 16}px)` }}>
      <Img src={staticFile("DonnitLogo.png")} style={{ width: 66, height: 66, borderRadius: 18, boxShadow: "0 8px 22px rgba(0,0,0,0.45)" }} />
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 60, color: "#fff", letterSpacing: -2, textShadow: "0 3px 14px rgba(0,0,0,0.5)" }}>donnit</span>
    </div>
  );
};

export const DeLaBasuraACasa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
      {/* HOOK (0-3s) — acción + gancho en pantalla desde el frame 1 */}
      <Sequence from={0} durationInFrames={90}>
        <Clip startSec={4.0} ambient={0.7} punchTo={1.08} punchFrames={12} />
        <Scrim />
        <TextCard
          dur={90}
          size={64}
          bottom={235}
          lines={[
            { seg: [{ t: "Esto estaba tirado" }] },
            { seg: [{ t: "en la " }, { t: "basura", hi: true }, { t: ". En Barcelona." }] },
          ]}
        />
      </Sequence>

      {/* DESARROLLO — jump cuts, cortar no sostener */}
      <Sequence from={90} durationInFrames={70}>
        <Clip startSec={10.5} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Scrim top={false} />
        <TextCard dur={70} size={62} bottom={235} lines={[{ seg: [{ t: "Una silla de oficina." }] }]} />
        <Sequence from={0} durationInFrames={9}><Sfx src="click.mp3" /></Sequence>
      </Sequence>
      <Sequence from={160} durationInFrames={70}>
        <Clip startSec={12.9} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>
      {/* corte de más movimiento (se levanta) → 85% */}
      <Sequence from={230} durationInFrames={70}>
        <Clip startSec={15.2} rate={0.85} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Scrim top={false} />
        <TextCard dur={70} size={62} bottom={235} lines={[{ seg: [{ t: "Y " }, { t: "funciona", hi: true }, { t: " perfecta." }] }]} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>

      {/* CONTRASTE — plano general (raw 0-4s), estático */}
      <Sequence from={300} durationInFrames={120}>
        <Clip startSec={0.0} ambient={0.5} punchTo={1.0} />
        <Scrim bottom={false} />
        <TextCard dur={120} size={80} center lines={[{ seg: [{ t: "Estado: " }, { t: "PERFECTO", hi: true }, { t: "  ✅" }] }]} />
      </Sequence>

      {/* CIERRE — CTA como continuación del hook (basura → casa de un vecino) */}
      <Sequence from={420} durationInFrames={120}>
        <Clip startSec={18.5} ambient={0.5} punchTo={1.0} />
        <Scrim />
        <TextCard
          dur={120}
          size={58}
          top={210}
          lines={[
            { seg: [{ t: "Lo que tú tiras," }] },
            { seg: [{ t: "tu vecino lo " }, { t: "necesita", hi: true }, { t: "." }] },
          ]}
        />
        <Signature />
      </Sequence>
    </AbsoluteFill>
  );
};

export const DE_LA_BASURA_TOTAL = 540;
