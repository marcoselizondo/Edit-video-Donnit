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
import { Grain } from "./cine/atmosphere";
import { PhoneFrame, ScreenPublish, ScreenMap, ScreenFeed } from "./reel/appui";

// ═══════════════════════════════════════════════════════════════════════════
//  Reel 01 v2 · "De la basura a tu casa" (9:16 · 24s · 30fps)
//  Calle (metraje real) → APP (secuencia kinética: publicar · mapa · feed)
//  → FINAL con glow (estética ref. Higgsfield).
//  Copy en español peninsular · hook <3s · CTA = continuación del hook.
// ═══════════════════════════════════════════════════════════════════════════

const SRC = "footage/reel-base.mp4";
const F = 30;

// ── Metraje de calle ────────────────────────────────────────────────────────
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

const Scrim: React.FC<{ top?: boolean; bottom?: boolean }> = ({ top = true, bottom = true }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {top && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 470, background: "linear-gradient(180deg, rgba(8,20,14,0.58) 0%, rgba(8,20,14,0) 100%)" }} />}
    {bottom && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 640, background: "linear-gradient(0deg, rgba(8,20,14,0.82) 0%, rgba(8,20,14,0) 100%)" }} />}
  </AbsoluteFill>
);

// Texto que aparece COMPLETO (sin tipeo progresivo)
const TextCard: React.FC<{
  lines: { seg: { t: string; hi?: boolean }[] }[];
  dur: number;
  size?: number;
  bottom?: number;
  top?: number;
  center?: boolean;
}> = ({ lines, dur, size = 64, bottom, top, center }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 5, dur - 6, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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

// Etiqueta kinética compacta para la fase de app (no tapa la pantalla)
const AppLabel: React.FC<{ text: string; hi?: string; dur: number; atTop?: boolean }> = ({ text, hi, dur, atTop = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, mass: 0.7, stiffness: 130 } });
  const op = interpolate(frame, [0, 5, dur - 6, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [atTop ? "top" : "bottom"]: 96,
        textAlign: "center",
        opacity: op,
        transform: `translateY(${interpolate(s, [0, 1], [atTop ? -26 : 26, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 62,
          color: "#fff",
          letterSpacing: -1,
          textShadow: "0 4px 22px rgba(0,0,0,0.7)",
        }}
      >
        {text}
        {hi ? (
          <span style={{ background: COLORS.freeGreen, color: COLORS.greenInk, padding: "2px 14px", borderRadius: 12, marginLeft: 12 }}>
            {hi}
          </span>
        ) : null}
      </span>
    </div>
  );
};

// Fondo de la fase app (verde profundo con luz)
const AppStage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(70% 50% at 50% 45%, ${COLORS.green800} 0%, ${COLORS.green900} 100%)`, overflow: "hidden" }}>
    {children}
    <Grain opacity={0.045} />
  </AbsoluteFill>
);

// Destello de transición calle → app
const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 3, 10], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: COLORS.freeGreen, opacity: op, pointerEvents: "none", zIndex: 50 }} />;
};

const Sfx: React.FC<{ src: string; vol?: number }> = ({ src, vol = 0.3 }) => (
  <Audio src={staticFile(`audio/${src}`)} volume={vol} />
);

// ── FINAL con glow ──────────────────────────────────────────────────────────
// La silla se funde en el halo de marca; barrido de luz sobre el wordmark.
const FinaleGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 126;

  const rise = spring({ frame: frame - 4, fps, config: { damping: 16, mass: 1 } });
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);
  const rings = interpolate(frame, [0, 70], [0, 1], { extrapolateRight: "clamp" });
  const line1 = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoS = spring({ frame: frame - 46, fps, config: { damping: 14, mass: 0.85 } });
  const tag = interpolate(frame, [72, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweep = interpolate(frame, [70, 108], [-140, 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [dur - 8, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(80% 60% at 50% 44%, ${COLORS.green600} 0%, ${COLORS.green900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        opacity: out,
      }}
    >
      {/* aros de energía */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "44%",
            left: "50%",
            width: 380 + i * 230,
            height: 380 + i * 230,
            marginLeft: -(380 + i * 230) / 2,
            marginTop: -(380 + i * 230) / 2,
            borderRadius: "50%",
            border: `2px solid rgba(143,214,120,${0.26 - i * 0.055})`,
            transform: `scale(${interpolate(rings, [0, 1], [0.35, 1])})`,
            opacity: rings,
          }}
        />
      ))}

      {/* halo que respira */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          width: 820,
          height: 820,
          transform: "translate(-50%,-50%)",
          filter: "blur(100px)",
          background: `radial-gradient(circle, rgba(143,214,120,${0.5 * pulse}) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* la silla, fundida en el halo */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          width: 560,
          height: 560,
          marginLeft: -280,
          marginTop: -280,
          borderRadius: 40,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 12, 46, 72], [0, 1, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(rise, [0, 1], [1.25, 1])})`,
          maskImage: "radial-gradient(circle at 50% 50%, #000 46%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 46%, transparent 74%)",
          filter: `saturate(0.85) brightness(${interpolate(frame, [30, 70], [1, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
        }}
      >
        <Img src={staticFile("ds/chair-item.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* frase que remata el gancho */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 120,
          right: 120,
          textAlign: "center",
          opacity: line1,
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 66,
          lineHeight: 1.18,
          color: "#fff",
          letterSpacing: -1,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        Lo que tú tiras,
        <br />
        tu vecino lo{" "}
        <span style={{ background: COLORS.freeGreen, color: COLORS.greenInk, padding: "2px 16px", borderRadius: 14 }}>
          necesita
        </span>
      </div>

      {/* logo + wordmark con barrido de luz */}
      <div style={{ position: "absolute", bottom: 470, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <Img
          src={staticFile("DonnitLogo.png")}
          style={{
            width: 190,
            height: 190,
            borderRadius: 46,
            transform: `scale(${logoS})`,
            boxShadow: `0 0 ${50 + pulse * 40}px rgba(143,214,120,0.75), 0 24px 60px rgba(0,0,0,0.45)`,
          }}
        />
        <div style={{ position: "relative", overflow: "hidden", padding: "0 10px", opacity: logoS }}>
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 104, color: "#fff", letterSpacing: -3 }}>
            donnit
          </span>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sweep}px`,
              width: 120,
              background: "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)",
              filter: "blur(6px)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 4,
            opacity: tag,
            fontFamily: FONTS.body,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.green200,
            letterSpacing: 0.5,
          }}
        >
          Búscala en Donnit
        </div>
      </div>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// ── Timeline ────────────────────────────────────────────────────────────────
export const DeLaBasuraACasaV2: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
      {/* HOOK 0-3s */}
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

      {/* DESARROLLO — jump cuts */}
      <Sequence from={90} durationInFrames={68}>
        <Clip startSec={10.5} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Scrim top={false} />
        <TextCard dur={68} size={62} bottom={235} lines={[{ seg: [{ t: "Una silla de oficina." }] }]} />
        <Sequence from={0} durationInFrames={9}><Sfx src="click.mp3" /></Sequence>
      </Sequence>
      <Sequence from={158} durationInFrames={68}>
        <Clip startSec={12.9} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>
      <Sequence from={226} durationInFrames={70}>
        <Clip startSec={15.2} rate={0.85} ambient={0.7} punchTo={1.05} punchFrames={8} />
        <Scrim top={false} />
        <TextCard dur={70} size={62} bottom={235} lines={[{ seg: [{ t: "Y " }, { t: "funciona", hi: true }, { t: " perfecta." }] }]} />
        <Sequence from={0} durationInFrames={9}><Sfx src="whoosh.mp3" /></Sequence>
      </Sequence>

      {/* CONTRASTE */}
      <Sequence from={296} durationInFrames={80}>
        <Clip startSec={0.0} ambient={0.5} punchTo={1.0} />
        <Scrim bottom={false} />
        <TextCard dur={80} size={80} center lines={[{ seg: [{ t: "Estado: " }, { t: "PERFECTO", hi: true }, { t: "  ✅" }] }]} />
      </Sequence>

      {/* ── APP · publicar ── */}
      <Sequence from={376} durationInFrames={74}>
        <AppStage>
          <PhoneFrame>
            <ScreenPublish />
          </PhoneFrame>
        </AppStage>
        <AppLabel text="Así que la" hi="publiqué" dur={74} />
        <Flash />
        <Sequence from={0} durationInFrames={12}><Sfx src="zoom-hit.mp3" vol={0.45} /></Sequence>
        <Sequence from={30} durationInFrames={10}><Sfx src="click.mp3" vol={0.35} /></Sequence>
        <Sequence from={56} durationInFrames={14}><Sfx src="confirm.mp3" vol={0.4} /></Sequence>
      </Sequence>

      {/* ── APP · mapa ── */}
      <Sequence from={450} durationInFrames={74}>
        <AppStage>
          <PhoneFrame>
            <ScreenMap />
          </PhoneFrame>
        </AppStage>
        <AppLabel text="A 400 m de" hi="tu casa" dur={74} />
        <Sequence from={0} durationInFrames={10}><Sfx src="whoosh.mp3" vol={0.35} /></Sequence>
        <Sequence from={10} durationInFrames={12}><Sfx src="click.mp3" vol={0.4} /></Sequence>
      </Sequence>

      {/* ── APP · feed / la pilla un vecino ── */}
      <Sequence from={524} durationInFrames={80}>
        <AppStage>
          <PhoneFrame>
            <ScreenFeed />
          </PhoneFrame>
        </AppStage>
        <AppLabel text="Alguien ya la" hi="está buscando" dur={80} />
        <Sequence from={0} durationInFrames={10}><Sfx src="whoosh.mp3" vol={0.35} /></Sequence>
        <Sequence from={46} durationInFrames={14}><Sfx src="confirm.mp3" vol={0.45} /></Sequence>
      </Sequence>

      {/* ── FINAL con glow ── */}
      <Sequence from={604} durationInFrames={126}>
        <FinaleGlow />
        <Sequence from={0} durationInFrames={16}><Sfx src="zoom-hit.mp3" vol={0.4} /></Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};

export const DE_LA_BASURA_V2_TOTAL = 730;
