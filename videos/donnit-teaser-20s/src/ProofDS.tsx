import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFonts } from "./load-fonts";
import { FONTS } from "./theme";
import { MomentCard } from "./ds/MomentCard";
import { CO2Counter } from "./ds/CO2Counter";
import { RentalItemCard } from "./ds/RentalItemCard";

// PROOF: render nativo de componentes reales del Donnit DS con tus tokens.
export const ProofDS: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  const co2 = interpolate(frame, [10, 60], [0, 128], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "var(--bg-app)",
        fontFamily: `${FONTS.body}, "Noto Color Emoji"`,
        padding: 80,
        gap: 60,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          font: "var(--fw-bold) 60px var(--font-display)",
          color: "var(--text-strong)",
          letterSpacing: "-0.02em",
        }}
      >
        Componentes reales, en movimiento
      </div>

      <div style={{ zoom: 2.2 }}>
        <CO2Counter
          value={co2}
          caption="Equivalente a plantar 6 árboles"
        />
      </div>

      <div style={{ zoom: 2.2, display: "flex", gap: 12 }}>
        <MomentCard moment="playa" name="Playa" count={12} style={{ width: 150 }} />
        <MomentCard moment="montana" name="Montaña" locked style={{ width: 150 }} />
      </div>

      <div style={{ zoom: 2.2 }}>
        <RentalItemCard
          image={staticFile("ds/rental-demo-paddle.png")}
          title="Tabla de paddle surf"
          pricePerDay={15}
          distance="350 m"
          neighborhood="el Poble-sec"
          ownerGivesBack
        />
      </div>
    </AbsoluteFill>
  );
};
