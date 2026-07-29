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
import { loadFonts } from "./load-fonts";
import { COLORS, FONTS } from "./theme";
import { KineticWords, Token } from "./components/Kinetic";
import { PressButton } from "./proto/PressButton";
import { IntroChat } from "./proto/IntroChat";
import { CO2Counter } from "./ds/CO2Counter";
import { StatCard } from "./ds/StatCard";
import { MomentCard } from "./ds/MomentCard";
import { RentalItemCard } from "./ds/RentalItemCard";
import { Icon } from "./ds/Icon";

const GLOW = "0 0 2px #fff, 0 0 14px rgba(255,255,255,0.92), 0 0 34px rgba(255,255,255,0.5)";
const DARK = "linear-gradient(160deg, #0C1611, #080D0A)";

// ---------------- Móvil con cámara ----------------
const PhoneFrame: React.FC<{
  children: React.ReactNode;
  zoomButtonAt?: number;
  pullAt?: number;
}> = ({ children, zoomButtonAt, pullAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 680, H = 1400, bez = 18;
  const enter = spring({ frame, fps, config: { damping: 18, mass: 1.2, stiffness: 55 } });
  const focus = interpolate(enter, [0, 1], [1.26, 1]);
  const blur = interpolate(frame, [0, 20], [14, 0], { extrapolateRight: "clamp" });
  const push = interpolate(frame, [20, 260], [0, 0.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bz = zoomButtonAt !== undefined ? interpolate(frame, [zoomButtonAt, zoomButtonAt + 20, zoomButtonAt + 50, zoomButtonAt + 68], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const pull = pullAt !== undefined ? interpolate(frame, [pullAt, pullAt + 20], [0, -0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const scale = focus * (1 + push + bz * 0.26 + pull);
  const dX = Math.sin(frame / 22) * 5;
  const dY = Math.cos(frame / 27) * 5;
  const dR = Math.sin(frame / 33) * 0.35;

  return (
    <AbsoluteFill style={{ background: DARK }}>
      <AbsoluteFill style={{ background: "radial-gradient(42% 40% at 50% 46%, rgba(143,214,120,0.22), rgba(0,0,0,0) 70%)" }} />
      <div style={{ position: "absolute", left: (1080 - W - bez * 2) / 2, top: (1920 - H - bez * 2) / 2, transformOrigin: "center", transform: `translate(${dX}px, ${bz * -320 + dY}px) rotate(${dR}deg) scale(${scale})`, opacity: enter, filter: blur ? `blur(${blur}px)` : undefined }}>
        <div style={{ width: W + bez * 2, height: H + bez * 2, borderRadius: 84, background: "linear-gradient(160deg,#20242b,#0c0e12)", padding: bez, boxShadow: "0 50px 120px rgba(0,0,0,0.6)" }}>
          <div style={{ width: W, height: H, borderRadius: 66, overflow: "hidden", background: "#fff", position: "relative" }}>
            {children}
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 116, height: 32, borderRadius: 999, background: "#000", zIndex: 5 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// pantalla de app a escala (los componentes DS se diseñan a tamaño móvil)
const AppScreen: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <div style={{ width: "100%", height: "100%", background: bg || "var(--bg-app)", fontFamily: "var(--font-body)", color: "var(--text-strong)", position: "relative", overflow: "hidden" }}>
    {children}
  </div>
);

// ---------------- Secciones ----------------

// 2 · DONAR
const donarWords: Token[] = [
  { text: "Dona", x: 27, y: 14, size: 168, delay: 8, color: COLORS.green, weight: 900, entrance: "assemble", perChar: 3, exitAt: 120 },
  { text: "gratis", x: 70, y: 25, size: 116, delay: 26, color: COLORS.green, weight: 900, entrance: "bounce", exitAt: 120 },
  { text: "un vecino lo recibe hoy", x: 50, y: 92, size: 58, delay: 150, color: "#1B4332", shadow: GLOW, weight: 800, entrance: "fromBottom" },
];
const SecDonar: React.FC = () => (
  <>
    <PhoneFrame zoomButtonAt={128}>
      <Img src={staticFile("clip2/item_detail.png")} style={{ width: "100%", display: "block" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 42, display: "flex", justifyContent: "center" }}>
        <PressButton pressAt={140} width={560} />
      </div>
    </PhoneFrame>
    <KineticWords tokens={donarWords} />
  </>
);

// 3 · CO2
const co2Words: Token[] = [
  { text: "Y ganas", x: 28, y: 13, size: 96, delay: 8, color: "#1B4332", shadow: GLOW, weight: 900, entrance: "fromLeft", exitAt: 210 },
  { text: "impacto", x: 68, y: 22, size: 128, delay: 18, color: COLORS.green, weight: 900, entrance: "assemble", perChar: 3, exitAt: 210 },
  { text: "guarda tus créditos", x: 50, y: 92, size: 56, delay: 120, color: "#1B4332", shadow: GLOW, weight: 800, entrance: "fromBottom" },
];
const SecCo2: React.FC = () => {
  const frame = useCurrentFrame();
  const co2 = interpolate(frame, [30, 100], [0, 128], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <PhoneFrame>
        <AppScreen bg="linear-gradient(160deg, var(--green-50), var(--bg-app))">
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 453, zoom: 1.5 }}>
              <div style={{ font: "var(--fw-bold) 22px var(--font-display)", color: "var(--text-strong)", marginBottom: 14, textAlign: "center" }}>Tu impacto crece</div>
              <CO2Counter value={co2} caption="Equivalente a plantar 6 árboles" />
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <StatCard value="37" label="objetos donados" tone="mint" icon="leaf" />
                <StatCard value="9" label="barrios" tone="neutral" icon="map-pin" />
              </div>
            </div>
          </div>
        </AppScreen>
      </PhoneFrame>
      <KineticWords tokens={co2Words} />
    </>
  );
};

// 4 · PUBLICAR CON IA (el moat)
const AiField: React.FC<{ label: string; value: string; at: number; type?: boolean; chip?: boolean }> = ({ label, value, at, type = false, chip = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 14 } });
  const chars = [...value];
  const shown = type ? Math.min(chars.length, Math.max(0, Math.floor((frame - at) / 1.6))) : chars.length;
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 16}px)`, marginBottom: 14 }}>
      <div style={{ font: "var(--fw-semibold) 13px var(--font-body)", color: "var(--text-secondary)", marginBottom: 4 }}>{label}</div>
      {chip ? (
        <span style={{ display: "inline-block", padding: "8px 16px", borderRadius: 999, background: "var(--turq-50)", color: "var(--rent-strong)", font: "var(--fw-bold) 17px var(--font-display)" }}>{value}</span>
      ) : (
        <div style={{ font: "var(--fw-bold) 20px var(--font-display)", color: "var(--text-strong)" }}>{chars.slice(0, shown).join("")}</div>
      )}
    </div>
  );
};
const iaWords: Token[] = [
  { text: "Publicar", x: 30, y: 13, size: 128, delay: 8, color: COLORS.green, weight: 900, entrance: "assemble", perChar: 3, exitAt: 250 },
  { text: "en segundos", x: 66, y: 24, size: 74, delay: 28, color: "#1B4332", shadow: GLOW, weight: 800, entrance: "fromRight", exitAt: 250 },
  { text: "solo una foto · lo demás lo pone la IA", x: 50, y: 93, size: 46, delay: 150, color: "#1B4332", shadow: GLOW, weight: 700, entrance: "fromBottom" },
];
const SecIA: React.FC = () => {
  const frame = useCurrentFrame();
  const sparkle = interpolate(frame, [40, 55, 70], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <PhoneFrame>
        <AppScreen>
          <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", paddingTop: 64 }}>
            <div style={{ width: 470, zoom: 1.3 }}>
            <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "4/3", boxShadow: "var(--shadow-low)" }}>
              <Img src={staticFile("ds/rental-demo-paddle.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 10, left: 10, padding: "6px 12px", borderRadius: 999, background: "rgba(0,0,0,0.55)", color: "#fff", font: "var(--fw-semibold) 12px var(--font-body)" }}>📷 Tu foto</div>
              <div style={{ position: "absolute", inset: 0, background: "rgba(143,214,120,0.35)", opacity: sparkle }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0 12px" }}>
              <span style={{ padding: "6px 14px", borderRadius: 999, background: "var(--green-100)", color: "var(--brand-deep)", font: "var(--fw-bold) 13px var(--font-body)" }}>✨ Generado con IA</span>
            </div>
            <AiField label="Título" value="Tabla de paddle surf" at={42} type />
            <AiField label="Precio sugerido" value="15 €/día" at={64} />
            <AiField label="Momento" value="Playa" at={80} chip />
            <div style={{ marginTop: 8, height: 54, borderRadius: "var(--radius-md)", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--fw-bold) 18px var(--font-display)", opacity: interpolate(frame, [96, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>Publicar</div>
            </div>
          </div>
        </AppScreen>
      </PhoneFrame>
      <KineticWords tokens={iaWords} />
    </>
  );
};

// 5 · MOMENTS
const momentsWords: Token[] = [
  { text: "Alquila lo que necesitas", x: 50, y: 12, size: 60, delay: 10, color: "#1B4332", shadow: GLOW, weight: 800, entrance: "fromTop", exitAt: 260 },
  { text: "Moments", x: 50, y: 90, size: 150, delay: 150, color: "#1B4332", shadow: GLOW, weight: 900, entrance: "assemble", perChar: 3 },
];
const SecMoments: React.FC = () => (
  <>
    <PhoneFrame pullAt={150}>
      <AppScreen bg="linear-gradient(160deg, var(--turq-50), var(--bg-app))">
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", paddingTop: 70 }}>
          <div style={{ width: 453, zoom: 1.42 }}>
          <div style={{ font: "var(--fw-bold) 22px var(--font-display)", color: "var(--rent-strong)", marginBottom: 14 }}>Moments · alquiler</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <MomentCard moment="playa" name="Playa" count={12} />
            <MomentCard moment="noche" name="Noche" count={8} />
            <MomentCard moment="camping" name="Camping" count={5} />
            <MomentCard moment="fiesta" name="Fiesta" locked />
          </div>
          <RentalItemCard image={staticFile("ds/rental-demo-paddle.png")} title="Tabla de paddle surf" pricePerDay={15} distance="350 m" neighborhood="el Poble-sec" ownerGivesBack />
          </div>
        </div>
      </AppScreen>
    </PhoneFrame>
    <KineticWords tokens={momentsWords} />
  </>
);

// 6 · COMUNIDAD
const commWords: Token[] = [
  { text: "Tu barrio,", x: 30, y: 13, size: 104, delay: 8, color: COLORS.green, weight: 900, entrance: "fromLeft", exitAt: 240 },
  { text: "tu comunidad", x: 62, y: 24, size: 92, delay: 20, color: "#1B4332", shadow: GLOW, weight: 900, entrance: "assemble", perChar: 3, exitAt: 240 },
  { text: "de vecino a vecino", x: 50, y: 92, size: 56, delay: 120, color: "#1B4332", shadow: GLOW, weight: 800, entrance: "fromBottom" },
];
const SecComunidad: React.FC = () => (
  <>
    <PhoneFrame>
      <OffthreadVideo src={staticFile("clip_map.mp4")} muted startFrom={20} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
      <AbsoluteFill style={{ background: "rgba(143,214,120,0.28)", mixBlendMode: "soft-light" }} />
    </PhoneFrame>
    <KineticWords tokens={commWords} />
  </>
);

// 7 · CIERRE
const SecCierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  const line = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cta = interpolate(frame, [70, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [255, 280], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", flexDirection: "column", opacity: out }}>
      <AbsoluteFill style={{ background: "radial-gradient(45% 40% at 50% 42%, rgba(143,214,120,0.22), rgba(0,0,0,0) 70%)" }} />
      <Img src={staticFile("DonnitLogo.png")} style={{ width: 220, height: 220, borderRadius: 52, transform: `scale(${logo})`, boxShadow: "0 0 70px rgba(143,214,120,0.6)" }} />
      <div style={{ marginTop: 26, font: `900 130px ${FONTS.display}`, color: COLORS.green, letterSpacing: -4, textShadow: "0 0 40px rgba(143,214,120,0.5)", transform: `scale(${logo})` }}>Donnit</div>
      <div style={{ marginTop: 6, font: `800 52px ${FONTS.display}`, color: "#EAF3EC", opacity: line }}>Comparte, no compres</div>
      <div style={{ marginTop: 40, font: `700 34px ${FONTS.body}`, color: "rgba(234,243,236,0.7)", opacity: cta }}>Descarga Donnit · App Store y Google Play</div>
    </AbsoluteFill>
  );
};

// ---------------- Timeline 60s ----------------
export const DonnitFilm: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ background: "#0C1611" }}>
      <Audio src={staticFile("music/house-vibez.mp3")} volume={(f) => interpolate(f, [0, 24, 1740, 1800], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Sequence from={0} durationInFrames={160}><IntroChat /></Sequence>
      <Sequence from={160} durationInFrames={270}><SecDonar /></Sequence>
      <Sequence from={430} durationInFrames={230}><SecCo2 /></Sequence>
      <Sequence from={660} durationInFrames={300}><SecIA /></Sequence>
      <Sequence from={960} durationInFrames={290}><SecMoments /></Sequence>
      <Sequence from={1250} durationInFrames={270}><SecComunidad /></Sequence>
      <Sequence from={1520} durationInFrames={280}><SecCierre /></Sequence>
    </AbsoluteFill>
  );
};
