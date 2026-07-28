import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./theme";
import { loadFonts } from "./load-fonts";
import { Hook } from "./sections/Hook";
import { DonarFeed } from "./sections/DonarFeed";
import { DonarMap } from "./sections/DonarMap";
import { DonarItem } from "./sections/DonarItem";
import { Co2Bridge } from "./sections/Co2Bridge";
import { AlquilerTeaser } from "./sections/AlquilerTeaser";
import { CTA } from "./sections/CTA";

// Teaser Donnit · 20s · 9:16
// HOOK → DONAR (feed/mapa/ficha) → puente CO₂ → ALQUILAR (teaser) → CTA
export const DonnitTeaser: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgWarm }}>
      <Sequence from={0} durationInFrames={60}>
        <Hook />
      </Sequence>
      <Sequence from={60} durationInFrames={82}>
        <DonarFeed />
      </Sequence>
      <Sequence from={142} durationInFrames={70}>
        <DonarMap />
      </Sequence>
      <Sequence from={212} durationInFrames={76}>
        <DonarItem />
      </Sequence>
      <Sequence from={288} durationInFrames={90}>
        <Co2Bridge />
      </Sequence>
      <Sequence from={378} durationInFrames={102}>
        <AlquilerTeaser />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
