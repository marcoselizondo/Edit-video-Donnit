import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Fundido de entrada/salida dentro de cada Sequence (usa su propia duración).
export const useEdgeFade = (inN = 7, outN = 8) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(
    frame,
    [0, inN, durationInFrames - outN, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};
