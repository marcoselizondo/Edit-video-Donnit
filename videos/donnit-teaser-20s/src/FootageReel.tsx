import React from "react";
import {
  AbsoluteFill,
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
import { Grain, Vignette, LightBeams, useHandheld, usePushIn } from "./cine/atmosphere";
import { HeroPhone, PillLabel } from "./cine/elements";
import { GlowReveal } from "./cine/GlowReveal";
import { useEdgeFade } from "./util";
import { REEL, REEL_TOTAL, OUTRO_DURATION, ReelClip } from "./footage/reel.config";

// ═══════════════════════════════════════════════════════════════════════════
//  FootageReel — arma un reel con los clips subidos a public/footage/.
//  El orden/estilo se define en src/footage/reel.config.ts.
//  Si no hay clips, muestra una pantalla de "sube tus clips".
// ═══════════════════════════════════════════════════════════════════════════

// Un plano: clip a pantalla completa o dentro de un teléfono, + subtítulo.
const ClipShot: React.FC<{ clip: ReelClip }> = ({ clip }) => {
  const opacity = useEdgeFade(8, 8);
  const cam = useHandheld(0.7);
  const scale = usePushIn(1.02, 1.1, 160);
  const src = `footage/${clip.file}`;

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: COLORS.green900, overflow: "hidden" }}>
      {clip.device ? (
        <>
          <AbsoluteFill
            style={{ background: `linear-gradient(158deg, ${COLORS.bgLight} 0%, ${COLORS.bgWarm} 100%)` }}
          />
          <LightBeams tint="rgba(143,214,120,0.30)" />
          <AbsoluteFill style={{ transform: `translate(${cam.x}px, ${cam.y}px) rotate(${cam.rot}deg) scale(${scale})` }}>
            <HeroPhone
              src={src}
              startFrom={clip.startFrom ?? 0}
              playbackRate={clip.playbackRate ?? 1}
              entrance="up"
              handheld={0.3}
              height={1290}
            />
          </AbsoluteFill>
          <Vignette strength={0.4} />
        </>
      ) : (
        <AbsoluteFill style={{ transform: `translate(${cam.x * 0.5}px, ${cam.y * 0.5}px) scale(${scale})` }}>
          <OffthreadVideo
            src={staticFile(src)}
            startFrom={clip.startFrom ?? 0}
            playbackRate={clip.playbackRate ?? 1}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Vignette strength={0.5} />
        </AbsoluteFill>
      )}

      {clip.caption ? (
        <PillLabel delay={12} y={clip.captionAt === "top" ? 12 : 90} dark>
          {clip.caption}
        </PillLabel>
      ) : null}
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

// Pantalla de bienvenida cuando todavía no hay clips subidos.
const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(80% 60% at 50% 42%, ${COLORS.green600} 0%, ${COLORS.green900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 90px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 150, transform: `scale(${s})` }}>📥</div>
      <div style={{ marginTop: 20, fontFamily: FONTS.display, fontWeight: 800, fontSize: 84, color: "#fff", letterSpacing: -2, opacity: s }}>
        Sube tus clips
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 44,
          color: COLORS.green,
          opacity: interpolate(frame, [16, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        public/footage/
      </div>
      <div
        style={{
          marginTop: 26,
          maxWidth: 820,
          fontFamily: FONTS.body,
          fontWeight: 500,
          fontSize: 34,
          lineHeight: 1.35,
          color: "rgba(255,255,255,0.82)",
          opacity: interpolate(frame, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        …y avisale al agente para armar el reel automáticamente.
      </div>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

export const FootageReel: React.FC = () => {
  loadFonts();

  if (REEL.clips.length === 0) {
    return (
      <AbsoluteFill style={{ backgroundColor: COLORS.green900 }}>
        <Placeholder />
      </AbsoluteFill>
    );
  }

  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.green900 }}>
      {REEL.clips.map((clip, i) => {
        const dur = clip.durationInFrames ?? 90;
        const from = cursor;
        cursor += dur;
        // solape leve de 8 frames para transición suave
        return (
          <Sequence key={i} from={Math.max(0, from - (i === 0 ? 0 : 8))} durationInFrames={dur + 8}>
            <ClipShot clip={clip} />
          </Sequence>
        );
      })}
      {REEL.outro ? (
        <Sequence from={cursor - 8} durationInFrames={OUTRO_DURATION + 8}>
          <GlowReveal
            title={REEL.outroTitle ?? "donnit"}
            subline={REEL.outroSubline}
            tagline={[
              { text: "Dona lo que no usas", color: COLORS.green },
              { text: ", ", color: "rgba(255,255,255,0.8)" },
              { text: "alquila lo que necesitas", color: COLORS.turq300 },
            ]}
          />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

export const FOOTAGE_REEL_TOTAL = REEL_TOTAL;
