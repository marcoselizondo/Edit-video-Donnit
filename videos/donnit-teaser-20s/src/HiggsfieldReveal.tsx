import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFonts } from "./load-fonts";
import { COLORS } from "./theme";
import { GlowReveal } from "./cine/GlowReveal";

// Demo aislado del revelado de marca con glow (estética ref. Higgsfield).
// Reutilizable como CIERRE del video institucional cambiando solo las props.
export const HiggsfieldReveal: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.green900 }}>
      <GlowReveal
        logoSrc="DonnitLogo.png"
        title="donnit"
        tagline={[
          { text: "Dona lo que no usas", color: COLORS.green },
          { text: ", ", color: "rgba(255,255,255,0.8)" },
          { text: "alquila lo que necesitas", color: COLORS.turq300 },
        ]}
        subline="Una comunidad que reutiliza · donnit.app"
      />
    </AbsoluteFill>
  );
};
