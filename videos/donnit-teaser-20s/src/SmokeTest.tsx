import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const SmokeTest: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#8fd678", justifyContent: "center", alignItems: "center" }}>
      <div style={{ color: "white", fontSize: 120, fontWeight: 800, opacity }}>donnit</div>
    </AbsoluteFill>
  );
};
