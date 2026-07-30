import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { MapPin } from "../ds/MapPin";

// ═══════════════════════════════════════════════════════════════════════════
//  UI de app kinética — "la misma silla, publicada en Donnit".
//  Recreación de las pantallas de Donnit con los tokens oficiales del DS
//  (no es una captura de pantalla real: es UI reconstruida para el reel).
// ═══════════════════════════════════════════════════════════════════════════

const CHAIR = "ds/chair-item.jpg";

// ── Marco de teléfono que acepta UI como hijos (el HeroPhone solo acepta video)
export const PhoneFrame: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, mass: 1.2, stiffness: 90 } });
  const H = 1500;
  const W = H * 0.492;
  const t = frame / 30;
  // micro deriva "en mano"
  const dx = Math.sin(t * 0.9) * 5;
  const dy = Math.cos(t * 0.7) * 4;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 2000 }}>
      {/* derrame de luz de pantalla */}
      <div
        style={{
          position: "absolute",
          width: W * 2.4,
          height: H * 1.2,
          filter: "blur(120px)",
          opacity: p * 0.9,
          background: `radial-gradient(50% 45% at 50% 50%, rgba(143,214,120,0.55), rgba(0,0,0,0) 72%)`,
        }}
      />
      <div
        style={{
          width: W,
          height: H,
          transform: `translate(${dx}px, ${interpolate(p, [0, 1], [420, 0]) + dy}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
          borderRadius: 74,
          background: "linear-gradient(155deg,#252a31,#0a0c10)",
          padding: 16,
          boxShadow: "0 70px 140px rgba(6,20,12,0.6), inset 0 0 0 2px rgba(255,255,255,0.10)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 60,
            overflow: "hidden",
            background: COLORS.cream,
            position: "relative",
          }}
        >
          {children}
          {/* isla dinámica */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 29,
              borderRadius: 999,
              background: "#000",
              zIndex: 20,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Barra superior de la app
const AppBar: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      padding: "70px 26px 16px",
      background: COLORS.white,
      borderBottom: `1px solid ${COLORS.sage100}`,
      fontFamily: FONTS.display,
      fontWeight: 800,
      fontSize: 30,
      color: COLORS.ink,
      textAlign: "center",
    }}
  >
    {title}
  </div>
);

// Barra inferior de navegación
const TabBar: React.FC<{ active?: number }> = ({ active = 0 }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 84,
      background: COLORS.white,
      borderTop: `1px solid ${COLORS.sage100}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      fontSize: 30,
    }}
  >
    {["🏠", "🗺️", "👤"].map((e, i) => (
      <span key={i} style={{ opacity: i === active ? 1 : 0.35, fontFamily: '"Noto Color Emoji"' }}>
        {e}
      </span>
    ))}
  </div>
);

// ── PANTALLA 1 · PUBLICAR — la foto entra, el título se escribe, GRATIS golpea
export const ScreenPublish: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const photo = spring({ frame: frame - 6, fps, config: { damping: 12, mass: 0.7, stiffness: 130 } });
  const flash = interpolate(frame, [6, 12, 20], [0, 0.55, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = spring({ frame: frame - 20, fps, config: { damping: 200, mass: 0.5 } });
  const gratis = spring({ frame: frame - 30, fps, config: { damping: 9, mass: 0.9, stiffness: 150 } });
  const press = interpolate(frame, [48, 54, 60], [1, 0.94, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const done = spring({ frame: frame - 58, fps, config: { damping: 13 } });

  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      <AppBar title="Publicar un tesoro" />
      <div style={{ padding: "22px 26px" }}>
        {/* slot de foto */}
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: "1/1",
            background: COLORS.sage100,
            transform: `scale(${interpolate(photo, [0, 1], [0.7, 1])})`,
            opacity: photo,
            boxShadow: "0 18px 44px rgba(27,67,50,0.16)",
          }}
        >
          <Img src={staticFile(CHAIR)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
          {/* badge GRATIS que golpea */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              transform: `rotate(-8deg) scale(${interpolate(gratis, [0, 1], [2.4, 1])})`,
              opacity: interpolate(frame - 30, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              padding: "10px 22px",
              borderRadius: 999,
              background: COLORS.freeGreen,
              color: COLORS.greenInk,
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 34,
              boxShadow: "0 10px 26px rgba(27,67,50,0.3)",
            }}
          >
            GRATIS
          </div>
        </div>

        {/* título + barrio */}
        <div style={{ marginTop: 20, opacity: title, transform: `translateY(${(1 - title) * 14}px)` }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 38, color: COLORS.ink }}>
            Silla de oficina
          </div>
          <div style={{ marginTop: 6, fontFamily: FONTS.body, fontWeight: 600, fontSize: 26, color: COLORS.sage700 }}>
            📍 Sants-Badal, Barcelona
          </div>
        </div>

        {/* botón publicar */}
        <div
          style={{
            marginTop: 26,
            transform: `scale(${press})`,
            padding: "22px 0",
            borderRadius: 999,
            background: done > 0.5 ? COLORS.green600 : COLORS.green400,
            color: "#fff",
            textAlign: "center",
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: 34,
            boxShadow: "0 14px 32px rgba(111,191,106,0.45)",
          }}
        >
          {done > 0.5 ? "✓ Publicado" : "Publicar gratis"}
        </div>
      </div>
      <TabBar active={0} />
    </AbsoluteFill>
  );
};

// ── PANTALLA 2 · MAPA — el pin cae, ondas de radar, "a 400 m de ti"
export const ScreenMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame: frame - 8, fps, config: { damping: 11, mass: 0.8, stiffness: 140 } });
  const others = [
    { x: 22, y: 30, d: 24 },
    { x: 74, y: 26, d: 30 },
    { x: 30, y: 68, d: 36 },
    { x: 80, y: 62, d: 42 },
    { x: 58, y: 78, d: 48 },
    { x: 40, y: 20, d: 27 },
    { x: 64, y: 40, d: 33 },
    { x: 18, y: 50, d: 39 },
    { x: 86, y: 44, d: 45 },
    { x: 46, y: 60, d: 51 },
    { x: 70, y: 70, d: 54 },
    { x: 34, y: 40, d: 57 },
  ];

  return (
    <AbsoluteFill style={{ background: "#101c26" }}>
      {/* mapa estilizado */}
      <AbsoluteFill style={{ background: "linear-gradient(160deg,#16283a 0%,#0f1d29 100%)" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
          {[...Array(9)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 170} x2="600" y2={i * 170 - 60} stroke="#2b4459" strokeWidth="3" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`v${i}`} x1={i * 110} y1="0" x2={i * 110 + 50} y2="1500" stroke="#2b4459" strokeWidth="3" />
          ))}
        </svg>
      </AbsoluteFill>

      {/* pins vecinos */}
      {others.map((o, i) => {
        const s = spring({ frame: frame - o.d, fps, config: { damping: 12 } });
        return (
          <div key={i} style={{ position: "absolute", left: `${o.x}%`, top: `${o.y}%`, transform: `translate(-50%,-100%) scale(${s * 0.8})`, opacity: s * 0.75 }}>
            <MapPin category="hogar" />
          </div>
        );
      })}

      {/* ondas de radar sobre el pin principal */}
      {[0, 1, 2].map((i) => {
        const t = ((frame - 14 - i * 12) % 46) / 46;
        const on = frame > 14 + i * 12;
        return on ? (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "46%",
              width: 120 + t * 420,
              height: 120 + t * 420,
              marginLeft: -(120 + t * 420) / 2,
              marginTop: -(120 + t * 420) / 2,
              borderRadius: "50%",
              border: `3px solid rgba(143,214,120,${0.5 * (1 - t)})`,
            }}
          />
        ) : null;
      })}

      {/* pin principal: cae con rebote */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: `translate(-50%,-100%) translateY(${interpolate(drop, [0, 1], [-420, 0])}px) scale(${interpolate(drop, [0, 1], [0.6, 1.5])})`,
        }}
      >
        <MapPin category="hogar" selected />
      </div>

      {/* etiqueta de distancia */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "56%",
          transform: `translateX(-50%) scale(${spring({ frame: frame - 26, fps, config: { damping: 13 } })})`,
          padding: "14px 26px",
          borderRadius: 999,
          background: COLORS.white,
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 30,
          color: COLORS.greenInk,
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          whiteSpace: "nowrap",
        }}
      >
        Silla de oficina · <span style={{ color: COLORS.green600 }}>a 400 m</span>
      </div>
      <TabBar active={1} />
    </AbsoluteFill>
  );
};

// ── PANTALLA 3 · FEED — la silla entre los tesoros, y un vecino la pilla
export const ScreenFeed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardIn = spring({ frame: frame - 4, fps, config: { damping: 14, mass: 0.8 } });
  const tap = interpolate(frame, [42, 48, 54], [1, 0.93, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const claimed = spring({ frame: frame - 52, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      <AppBar title="Tesoros cerca de ti" />
      <div style={{ padding: "18px 22px" }}>
        {/* card de la silla */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: 26,
            padding: 12,
            boxShadow: "0 14px 36px rgba(27,67,50,0.14)",
            transform: `translateY(${interpolate(cardIn, [0, 1], [70, 0])}px) scale(${interpolate(cardIn, [0, 1], [0.92, 1])})`,
            opacity: cardIn,
          }}
        >
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}>
            <Img src={staticFile(CHAIR)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                padding: "8px 18px",
                borderRadius: 999,
                background: COLORS.freeGreen,
                color: COLORS.greenInk,
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 26,
              }}
            >
              GRATIS
            </div>
          </div>
          <div style={{ padding: "14px 8px 6px" }}>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.ink }}>
              Silla de oficina
            </div>
            <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 24, color: COLORS.sage700, marginTop: 4 }}>
              📍 Sants-Badal · a 400 m
            </div>
          </div>
          {/* botón lo quiero */}
          <div
            style={{
              margin: "10px 8px 6px",
              transform: `scale(${tap})`,
              padding: "18px 0",
              borderRadius: 999,
              background: claimed > 0.5 ? COLORS.green600 : COLORS.green400,
              color: "#fff",
              textAlign: "center",
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 30,
              boxShadow: "0 12px 26px rgba(111,191,106,0.4)",
            }}
          >
            {claimed > 0.5 ? "✓ ¡Es tuya!" : "¡La quiero!"}
          </div>
        </div>

        {/* siguiente card asomando (da sensación de scroll infinito) */}
        <div
          style={{
            marginTop: 16,
            background: COLORS.white,
            borderRadius: 26,
            height: 190,
            boxShadow: "0 10px 26px rgba(27,67,50,0.10)",
            opacity: interpolate(frame, [16, 30], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 14,
          }}
        >
          <div style={{ width: 150, height: 150, borderRadius: 18, background: COLORS.sage100 }} />
          <div>
            <div style={{ height: 22, width: 260, borderRadius: 8, background: COLORS.sage100 }} />
            <div style={{ height: 18, width: 180, borderRadius: 8, background: COLORS.sage100, marginTop: 12 }} />
          </div>
        </div>
      </div>
      <TabBar active={0} />
    </AbsoluteFill>
  );
};
