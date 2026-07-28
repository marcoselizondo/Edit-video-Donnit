import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./load-fonts";
import { FONTS, COLORS } from "./theme";
import { useEdgeFade } from "./util";
import { ItemCard } from "./ds/ItemCard";
import { MomentCard } from "./ds/MomentCard";
import { RentalItemCard } from "./ds/RentalItemCard";
import { CO2Counter } from "./ds/CO2Counter";
import { StatCard } from "./ds/StatCard";
import { Button } from "./ds/Button";
import { Fab } from "./ds/Fab";
import { MapPin } from "./ds/MapPin";
import { Avatar } from "./ds/Avatar";
import { Badge } from "./ds/Badge";

// ---- helpers de animación (DS ease-spring) ----
const Rise: React.FC<{
  delay?: number;
  y?: number;
  from?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 70, from = 0.9, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.8, stiffness: 110 } });
  const o = interpolate(frame - delay, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        transform: `translateY(${(1 - s) * y}px) scale(${from + (1 - from) * s})`,
        opacity: o,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Title: React.FC<{ kicker: string; text: string; color: string }> = ({
  kicker,
  text,
  color,
}) => (
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <Rise delay={2} y={30}>
      <div
        style={{
          font: `800 30px ${FONTS.display}`,
          letterSpacing: 6,
          color,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {kicker}
      </div>
    </Rise>
    <Rise delay={6} y={40}>
      <div style={{ font: `800 78px ${FONTS.display}`, color: COLORS.ink, letterSpacing: -2 }}>
        {text}
      </div>
    </Rise>
  </div>
);

const Stage: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => {
  const opacity = useEdgeFade();
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: bg || "var(--bg-app)",
        justifyContent: "center",
        alignItems: "center",
        padding: 70,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Escala los componentes (diseñados a tamaño móvil) para que lean en 9:16
const Zoom: React.FC<{ z?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  z = 2.3,
  children,
  style,
}) => <div style={{ zoom: z, ...style }}>{children}</div>;

// ---------------- Secciones ----------------

const SecOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade(1, 8);
  const logo = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: "var(--bg-app)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Img
        src={staticFile("DonnitLogo.png")}
        style={{
          width: 240,
          height: 240,
          borderRadius: 56,
          transform: `scale(${logo})`,
          boxShadow: "var(--shadow-brand)",
        }}
      />
      <Rise delay={12} y={40}>
        <div style={{ font: `800 110px ${FONTS.display}`, color: COLORS.greenInk, letterSpacing: -3, marginTop: 24 }}>
          donnit
        </div>
      </Rise>
      <Rise delay={22} y={30}>
        <div style={{ font: `700 46px ${FONTS.display}`, marginTop: 8, textAlign: "center" }}>
          <span style={{ color: COLORS.greenDeep }}>Dona lo que no usas</span>
          <span style={{ color: COLORS.ink }}>, </span>
          <span style={{ color: COLORS.turquoiseDeep }}>alquila lo que necesitas</span>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

const SecDonar: React.FC = () => (
  <Stage>
    <Title kicker="Gratis · de vecino a vecino" text="Donar" color={COLORS.greenDeep} />
    <Zoom z={2.15}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
        <Rise delay={10}>
          <ItemCard emoji="🪑" title="Silla de enea" neighborhood="el Poble-sec" distance="200 m" badge={{ label: "Gratis", tone: "available" }} />
        </Rise>
        <div style={{ display: "flex", gap: 16 }}>
          <Rise delay={20} style={{ flex: 1 }}>
            <ItemCard emoji="📚" title="Libros" neighborhood="el Clot" badge={{ label: "Nuevo", tone: "new" }} />
          </Rise>
          <Rise delay={28} style={{ flex: 1 }}>
            <ItemCard emoji="🧥" title="Chaqueta" neighborhood="Sant Antoni" />
          </Rise>
        </div>
      </div>
    </Zoom>
  </Stage>
);

const SecMoments: React.FC = () => (
  <Stage bg="linear-gradient(160deg, var(--turq-50), var(--bg-app))">
    <Title kicker="Próximamente" text="Moments" color={COLORS.turquoiseDeep} />
    <Zoom z={2.15}>
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Rise delay={8}><MomentCard moment="playa" name="Playa" count={12} /></Rise>
          <Rise delay={14}><MomentCard moment="noche" name="Noche" count={8} /></Rise>
          <Rise delay={20}><MomentCard moment="montana" name="Montaña" locked /></Rise>
          <Rise delay={26}><MomentCard moment="fiesta" name="Fiesta" locked /></Rise>
        </div>
        <Rise delay={34}>
          <RentalItemCard
            image={staticFile("ds/rental-demo-paddle.png")}
            title="Tabla de paddle surf"
            pricePerDay={15}
            distance="350 m"
            neighborhood="el Poble-sec"
            ownerGivesBack
          />
        </Rise>
      </div>
    </Zoom>
  </Stage>
);

const SecCo2: React.FC = () => {
  const frame = useCurrentFrame();
  const co2 = interpolate(frame, [16, 74], [0, 128], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Stage>
      <Title kicker="El motor de Donnit" text="Impacto CO₂" color={COLORS.greenDeep} />
      <Zoom z={2.15}>
        <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 14 }}>
          <Rise delay={8}>
            <CO2Counter value={co2} caption="Equivalente a plantar 6 árboles" />
          </Rise>
          <div style={{ display: "flex", gap: 12 }}>
            <Rise delay={22} style={{ flex: 1 }}>
              <StatCard value="37" label="objetos donados" tone="mint" icon="leaf" />
            </Rise>
            <Rise delay={30} style={{ flex: 1 }}>
              <StatCard value="9" label="barrios" tone="neutral" icon="map-pin" />
            </Rise>
          </div>
        </div>
      </Zoom>
    </Stage>
  );
};

const SecAlquiler: React.FC = () => (
  <Stage bg="linear-gradient(160deg, var(--turq-50), var(--bg-app))">
    <Title kicker="Alquiler · Moments" text="Pide y acepta" color={COLORS.turquoiseDeep} />
    <Zoom z={2.15}>
      <Rise delay={8}>
        <div
          style={{
            width: 340,
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-high)",
            padding: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar src={staticFile("ds/rental-request-avatar.png")} name="Marcos" size={44} />
            <div style={{ flex: 1, font: "var(--fw-bold) 16px var(--font-display)", color: "var(--text-strong)" }}>
              Marcos <span style={{ font: "var(--fw-regular) 15px var(--font-body)", color: "var(--text-secondary)" }}>quiere alquilar</span>
            </div>
          </div>
          <div style={{ margin: "12px 0" }}>
            <Badge tone="reserved">Solicitada</Badge>
          </div>
          <div style={{ font: "var(--fw-bold) 19px var(--font-display)", color: "var(--text-strong)" }}>
            Tabla de paddle surf
          </div>
          <div style={{ font: "var(--fw-regular) 14px var(--font-body)", color: "var(--text-secondary)", marginTop: 4 }}>
            Del 24 al 25 jul · 2 días
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              background: "var(--turq-50)",
              font: "var(--fw-semibold) 15px var(--font-body)",
              color: "var(--rent-strong)",
            }}
          >
            Recibirás <b>€10.5</b>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Rise delay={22} style={{ flex: 1 }}>
              <Button variant="secondary" block>Rechazar</Button>
            </Rise>
            <Rise delay={28} style={{ flex: 1 }}>
              <Button variant="rent" block>Aceptar</Button>
            </Rise>
          </div>
        </div>
      </Rise>
    </Zoom>
  </Stage>
);

const SecSistema: React.FC = () => {
  const cats = ["hogar", "ropa", "tecnologia", "movilidad"];
  return (
    <Stage>
      <Title kicker="Un sistema completo" text="Cada detalle" color={COLORS.greenDeep} />
      <Zoom z={2.3}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Rise delay={6}><Button variant="primary">Publicar</Button></Rise>
            <Rise delay={12}><Button variant="secondary">Ver más</Button></Rise>
            <Rise delay={18}><Fab size={48} /></Rise>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-end" }}>
            {cats.map((c, i) => (
              <Rise key={c} delay={22 + i * 6} y={-40}>
                <MapPin category={c} selected={i === 0} />
              </Rise>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Rise delay={44}><Badge tone="available" dot>Disponible</Badge></Rise>
            <Rise delay={48}><Badge tone="rent">Alquiler</Badge></Rise>
            <Rise delay={52}><Badge tone="reserved">Reservado</Badge></Rise>
            <Rise delay={56}><Avatar name="Ana" size={40} badge="verified" /></Rise>
          </div>
        </div>
      </Zoom>
    </Stage>
  );
};

const SecCierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade(8, 6);
  const logo = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: "var(--bg-app)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Img
        src={staticFile("DonnitLogo.png")}
        style={{ width: 210, height: 210, borderRadius: 50, transform: `scale(${logo})`, boxShadow: "var(--shadow-brand)" }}
      />
      <Rise delay={16} y={30}>
        <div style={{ font: `800 84px ${FONTS.display}`, color: COLORS.greenInk, letterSpacing: -2, marginTop: 20 }}>
          Descarga Donnit
        </div>
      </Rise>
      <Rise delay={26} y={24}>
        <div style={{ font: `700 40px ${FONTS.body}`, color: COLORS.inkSoft, marginTop: 10 }}>
          Ya en App Store y Google Play
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

// ---------------- Timeline ----------------
export const DonnitShowcase: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgWarm }}>
      <Audio
        src={staticFile("music/house-vibez.mp3")}
        volume={(f) =>
          interpolate(f, [0, 18, 800, 840], [0, 0.72, 0.72, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={0} durationInFrames={90}><SecOpen /></Sequence>
      <Sequence from={90} durationInFrames={150}><SecDonar /></Sequence>
      <Sequence from={240} durationInFrames={150}><SecMoments /></Sequence>
      <Sequence from={390} durationInFrames={150}><SecCo2 /></Sequence>
      <Sequence from={540} durationInFrames={120}><SecAlquiler /></Sequence>
      <Sequence from={660} durationInFrames={105}><SecSistema /></Sequence>
      <Sequence from={765} durationInFrames={75}><SecCierre /></Sequence>
    </AbsoluteFill>
  );
};
