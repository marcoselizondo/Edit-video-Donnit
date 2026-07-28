import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./theme";
import { loadFonts } from "./load-fonts";
import { KineticWords, Token } from "./components/Kinetic";
import { StoreBadges } from "./components/StoreBadges";
import { useEdgeFade } from "./util";
import { Grain, Vignette, LightBeams, useHandheld, usePushIn } from "./cine/atmosphere";
import { HeroPhone, PillLabel, ImpactPanel, BigCounter } from "./cine/elements";

// ═══════════════════════════════════════════════════════════════════════════
//  DONNIT · CINEMATIC (9:16 · 42s · 30fps)
//  Síntesis de las 4 referencias de videos/references:
//   · Cursor for iOS  → teléfono héroe con luz de ambiente + cámara en mano
//   · ElevenLabs      → paneles/chips flotantes, pastillas editoriales, aire
//   · Compile 2026    → planos de impacto full-bleed, número/palabra que golpea
//   · Higgsfield MCP  → revelado de marca con glow
//  Pensado con respiración/ritmo para añadir voz en off después.
// ═══════════════════════════════════════════════════════════════════════════

// Escenario cinematográfico compartido: fondo con luz + cámara en mano + grano.
const CineStage: React.FC<{
  children: React.ReactNode;
  bgFrom?: string;
  bgTo?: string;
  beam?: string;
  push?: [number, number];
}> = ({
  children,
  bgFrom = COLORS.bgLight,
  bgTo = COLORS.bgWarm,
  beam = "rgba(143,214,120,0.30)",
  push = [1.02, 1.1],
}) => {
  const cam = useHandheld(0.8);
  const scale = usePushIn(push[0], push[1], 190);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* fondo con leve contra-parallax */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(158deg, ${bgFrom} 0%, ${bgTo} 100%)`,
          transform: `translate(${cam.x * -0.4}px, ${cam.y * -0.4}px) scale(1.06)`,
        }}
      />
      <LightBeams tint={beam} />
      {/* contenido: se mueve con la cámara + dolly-in */}
      <AbsoluteFill
        style={{
          transform: `translate(${cam.x}px, ${cam.y}px) rotate(${cam.rot}deg) scale(${scale})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <Vignette strength={0.42} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// Chip de artículo que se despega del feed y flota (línea conectora fina).
const ItemChip: React.FC<{
  label: string;
  thumb: string;
  x: number;
  y: number;
  delay: number;
  rot?: number;
}> = ({ label, thumb, x, y, delay, rot = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.9, stiffness: 95 } });
  const op = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line = interpolate(frame - delay, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const px = interpolate(s, [0, 1], [50, x]);
  const py = interpolate(s, [0, 1], [50, y]);
  return (
    <>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <line x1="50%" y1="50%" x2={`${px}%`} y2={`${py}%`} stroke={COLORS.sage300} strokeWidth={2} strokeDasharray="3 8" opacity={line * 0.6} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: `${px}%`,
          top: `${py}%`,
          transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${interpolate(s, [0, 1], [0.5, 1])})`,
          opacity: op,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 26px 16px 16px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 22px 50px rgba(12,32,20,0.20)",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ width: 54, height: 54, borderRadius: 12, background: thumb }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.ink }}>{label}</span>
          <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 24, color: COLORS.greenDeep }}>gratis</span>
        </div>
      </div>
    </>
  );
};

// ── 1 · HOOK (impacto tipográfico, ref. Compile) ─────────────────────────────
const hookTokens: Token[] = [
  { text: "Eso", x: 28, y: 24, size: 130, delay: 2, color: "#fff", entrance: "fromTop" },
  { text: "que ya", x: 60, y: 40, size: 128, delay: 8, color: "rgba(255,255,255,0.85)", entrance: "fromRight" },
  { text: "no usas…", x: 46, y: 55, size: 176, delay: 14, color: "#fff", entrance: "slam" },
  {
    text: "es un tesoro",
    x: 50,
    y: 76,
    size: 150,
    delay: 34,
    color: COLORS.greenInk,
    chip: "rgba(255,255,255,0.96)",
    entrance: "fromBottom",
  },
];
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(1, 8);
  const zoom = interpolate(frame, [0, 96], [1.03, 1.14]);
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `linear-gradient(150deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`,
        transform: `scale(${zoom})`,
      }}
    >
      <LightBeams tint="rgba(255,255,255,0.22)" />
      <KineticWords tokens={hookTokens} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

// ── 2 · FEED (teléfono héroe + chips flotantes) ──────────────────────────────
const FeedHero: React.FC = () => {
  const opacity = useEdgeFade(8, 8);
  return (
    <AbsoluteFill style={{ opacity }}>
      <CineStage push={[1.0, 1.08]}>
        <HeroPhone src="clip_feed.mp4" playbackRate={0.85} entrance="up" handheld={0.3} height={1290} offsetX={-30} />
        <ItemChip label="Silla de madera" thumb="#C8A97E" x={70} y={26} delay={40} rot={3} />
        <ItemChip label="Libros" thumb="#7F9BB3" x={74} y={54} delay={54} rot={-2} />
        <ItemChip label="Camiseta" thumb="#3A4750" x={71} y={80} delay={68} rot={2} />
      </CineStage>
      <PillLabel delay={20} y={90} dark>
        Regálalo <b style={{ color: COLORS.green }}>gratis</b> en tu barrio
      </PillLabel>
    </AbsoluteFill>
  );
};

// ── 3 · IMPACTO "GRATIS" (full-bleed, ref. Compile) ──────────────────────────
const GratisImpact: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(4, 8);
  const s = spring({ frame, fps: 30, config: { damping: 12, mass: 0.8 } });
  return (
    <AbsoluteFill style={{ opacity }}>
      <ImpactPanel bg={`linear-gradient(150deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`}>
        <div style={{ textAlign: "center", transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})` }}>
          <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 54, color: "rgba(255,255,255,0.85)", letterSpacing: 2 }}>
            SIEMPRE
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 250, color: "#fff", lineHeight: 0.92, letterSpacing: -6 }}>
            GRATIS
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 70, color: COLORS.greenInk }}>
            entre vecinos
          </div>
        </div>
      </ImpactPanel>
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

// ── 4 · MAPA (barrio lleno de tesoros) ───────────────────────────────────────
const MapHero: React.FC = () => {
  const opacity = useEdgeFade(8, 8);
  return (
    <AbsoluteFill style={{ opacity }}>
      <CineStage beam="rgba(143,214,120,0.34)" push={[1.02, 1.1]}>
        <HeroPhone
          src="clip_map.mp4"
          playbackRate={0.6}
          entrance="right"
          handheld={0.3}
          height={1290}
          tint="rgba(143,214,120,0.22)"
          glow="rgba(143,214,120,0.6)"
        />
      </CineStage>
      <PillLabel delay={16} y={12} dark>
        Tu barrio está lleno de <b style={{ color: COLORS.green }}>tesoros</b>
      </PillLabel>
    </AbsoluteFill>
  );
};

// ── 5 · FICHA / lo recibe un vecino ──────────────────────────────────────────
const ItemClaim: React.FC = () => {
  const opacity = useEdgeFade(8, 8);
  return (
    <AbsoluteFill style={{ opacity }}>
      <CineStage push={[1.04, 1.12]}>
        <HeroPhone src="clip_item.mp4" playbackRate={0.32} entrance="left" handheld={0.3} height={1290} />
      </CineStage>
      <PillLabel delay={16} y={90} dark>
        Un vecino lo <b style={{ color: COLORS.green }}>recibe</b> hoy
      </PillLabel>
    </AbsoluteFill>
  );
};

// ── 6 · IMPACTO CO₂ (número que golpea + volante donar↔alquilar) ──────────────
const Co2Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(6, 8);
  const rot = interpolate(frame, [0, 180], [0, 260]);
  const ringIn = spring({ frame, fps: 30, config: { damping: 200 } });
  const R = 300;
  const C = 2 * Math.PI * R;
  const chipD = spring({ frame: frame - 60, fps: 30, config: { damping: 14 } });
  const chipA = spring({ frame: frame - 78, fps: 30, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ opacity }}>
      <ImpactPanel bg={`linear-gradient(160deg, ${COLORS.bgLight} 0%, ${COLORS.bgWarm} 100%)`}>
        <LightBeams tint="rgba(143,214,120,0.28)" />
        <div style={{ position: "relative", width: 780, height: 780, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg width={780} height={780} viewBox="0 0 780 780" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="cyc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={COLORS.green} />
                <stop offset="100%" stopColor={COLORS.turquoise} />
              </linearGradient>
            </defs>
            <circle
              cx={390}
              cy={390}
              r={R}
              fill="none"
              stroke="url(#cyc)"
              strokeWidth={28}
              strokeLinecap="round"
              strokeDasharray={`${C * 0.9} ${C}`}
              strokeDashoffset={C * (1 - ringIn)}
              transform={`rotate(${rot} 390 390)`}
            />
            <circle cx={390 + R * Math.cos((rot * Math.PI) / 180)} cy={390 + R * Math.sin((rot * Math.PI) / 180)} r={16} fill="#fff" />
          </svg>
          <div style={{ textAlign: "center" }}>
            <BigCounter to={128} prefix="+" color={COLORS.ink} size={240} delay={8} over={60} />
            <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 52, color: COLORS.inkSoft, marginTop: -6 }}>
              créditos CO₂
            </div>
          </div>
          {/* etiquetas del volante */}
          <div style={{ position: "absolute", top: 96, left: 150, transform: `scale(${chipD})`, padding: "16px 30px", borderRadius: 999, background: COLORS.greenDeep, color: "#fff", fontFamily: FONTS.display, fontWeight: 800, fontSize: 40, boxShadow: `0 16px 34px ${COLORS.greenDeep}66` }}>
            DONAS
          </div>
          <div style={{ position: "absolute", bottom: 96, right: 130, transform: `scale(${chipA})`, padding: "16px 30px", borderRadius: 999, background: COLORS.turquoiseDeep, color: "#fff", fontFamily: FONTS.display, fontWeight: 800, fontSize: 40, boxShadow: `0 16px 34px ${COLORS.turquoiseDeep}66` }}>
            ALQUILAS
          </div>
        </div>
      </ImpactPanel>
      <PillLabel delay={100} y={90}>
        Cada intercambio <b style={{ color: COLORS.greenDeep }}>ahorra CO₂</b>
      </PillLabel>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// ── 7 · MOMENTS / alquiler (turquesa) ────────────────────────────────────────
const MomentsTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(8, 8);
  const title = spring({ frame, fps: 30, config: { damping: 14, mass: 0.9 } });
  const chips = ["Un taladro", "Una tabla de paddle", "Una tienda de campaña", "Una cámara"];
  return (
    <AbsoluteFill style={{ opacity }}>
      <ImpactPanel bg={`linear-gradient(160deg, ${COLORS.turquoise} 0%, ${COLORS.turquoiseDeep} 100%)`}>
        <LightBeams tint="rgba(255,255,255,0.18)" />
        <div style={{ textAlign: "center", padding: "0 60px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.2)",
              color: "#EAFBF5",
              fontFamily: FONTS.body,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: 4,
              opacity: title,
            }}
          >
            PRÓXIMAMENTE
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 210, color: "#fff", letterSpacing: -6, lineHeight: 1, marginTop: 18, transform: `scale(${interpolate(title, [0, 1], [0.8, 1])})` }}>
            Moments
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 66, color: "#E7FBF4", opacity: title }}>
            Alquila lo que necesitas
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginTop: 56, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            {chips.map((c, i) => {
              const s = spring({ frame: frame - 30 - i * 10, fps: 30, config: { damping: 15 } });
              return (
                <div
                  key={c}
                  style={{
                    transform: `translateY(${(1 - s) * 26}px) scale(${s})`,
                    opacity: s,
                    padding: "18px 34px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.95)",
                    color: COLORS.turquoiseDeep,
                    fontFamily: FONTS.display,
                    fontWeight: 800,
                    fontSize: 44,
                    boxShadow: "0 16px 40px rgba(11,60,52,0.28)",
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 46, fontFamily: FONTS.body, fontWeight: 700, fontSize: 42, color: "rgba(255,255,255,0.9)", opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            …en vez de comprarlo
          </div>
        </div>
      </ImpactPanel>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// ── 8 · REVELADO DE MARCA (glow, ref. Higgsfield) ────────────────────────────
const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade(10, 6);
  const logo = spring({ frame, fps, config: { damping: 13, mass: 0.9 } });
  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 10);
  const line = interpolate(frame, [22, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cta = spring({ frame: frame - 52, fps, config: { damping: 16 } });
  const ring = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `radial-gradient(80% 60% at 50% 42%, ${COLORS.green600} 0%, ${COLORS.green900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 70px",
        overflow: "hidden",
      }}
    >
      {/* aros de energía que se expanden */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            width: 420 + i * 220,
            height: 420 + i * 220,
            marginLeft: -(420 + i * 220) / 2,
            marginTop: -(420 + i * 220) / 2,
            borderRadius: "50%",
            border: `2px solid rgba(143,214,120,${0.25 - i * 0.07})`,
            transform: `scale(${interpolate(ring, [0, 1], [0.4, 1])})`,
            opacity: ring,
          }}
        />
      ))}
      {/* halo del logo */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          width: 700,
          height: 700,
          transform: "translate(-50%,-50%)",
          filter: "blur(90px)",
          background: `radial-gradient(circle, rgba(143,214,120,${0.45 * glowPulse}) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <Img
        src={staticFile("DonnitLogo.png")}
        style={{
          width: 250,
          height: 250,
          borderRadius: 58,
          transform: `scale(${logo})`,
          boxShadow: `0 0 ${60 + glowPulse * 40}px rgba(143,214,120,0.7), 0 30px 70px rgba(0,0,0,0.4)`,
          position: "relative",
        }}
      />
      <div style={{ marginTop: 26, fontFamily: FONTS.display, fontWeight: 800, fontSize: 118, color: "#fff", letterSpacing: -4, opacity: logo, position: "relative" }}>
        donnit
      </div>
      <div style={{ marginTop: 18, maxWidth: 900, textAlign: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 52, lineHeight: 1.18, opacity: line, position: "relative" }}>
        <span style={{ color: COLORS.green }}>Dona lo que no usas</span>
        <span style={{ color: "rgba(255,255,255,0.8)" }}>, </span>
        <span style={{ color: COLORS.turq300 }}>alquila lo que necesitas</span>
      </div>
      <div style={{ height: 54 }} />
      <div style={{ transform: `translateY(${(1 - cta) * 24}px)`, opacity: cta, position: "relative" }}>
        <StoreBadges />
      </div>
      <div style={{ marginTop: 30, fontFamily: FONTS.body, fontWeight: 700, fontSize: 38, color: "rgba(255,255,255,0.85)", opacity: cta, position: "relative" }}>
        Descarga Donnit · ya disponible
      </div>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// ── Línea de tiempo ──────────────────────────────────────────────────────────
export const DonnitCinematic: React.FC = () => {
  loadFonts();
  const seq: [React.FC, number, number][] = [
    [Hook, 0, 96],
    [FeedHero, 92, 232],
    [GratisImpact, 320, 88],
    [MapHero, 404, 200],
    [ItemClaim, 600, 184],
    [Co2Impact, 780, 184],
    [MomentsTeaser, 960, 156],
    [BrandReveal, 1112, 160],
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.green900 }}>
      {seq.map(([C, from, dur], i) => (
        <Sequence key={i} from={from} durationInFrames={dur}>
          <C />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
