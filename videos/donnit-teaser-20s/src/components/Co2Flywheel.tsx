import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const Chip: React.FC<{
  label: string;
  color: string;
  x: number;
  y: number;
  delay: number;
}> = ({ label, color, x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${s})`,
        padding: "18px 30px",
        borderRadius: 999,
        background: color,
        color: "#fff",
        fontFamily: FONTS.display,
        fontWeight: 800,
        fontSize: 40,
        boxShadow: `0 16px 34px ${color}66`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

export const Co2Flywheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Contador de créditos CO2 (efecto odómetro).
  const count = Math.round(
    interpolate(frame, [10, 70], [0, 128], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const rot = interpolate(frame, [0, 90], [0, 300]);
  const ringIn = spring({ frame, fps, config: { damping: 200 } });
  const R = 300;
  const C = 2 * Math.PI * R;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgLight} 0%, ${COLORS.bgWarm} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 760, height: 760 }}>
        <svg width={760} height={760} viewBox="0 0 760 760">
          <defs>
            <linearGradient id="cycle" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.green} />
              <stop offset="100%" stopColor={COLORS.turquoise} />
            </linearGradient>
          </defs>
          <circle
            cx={380}
            cy={380}
            r={R}
            fill="none"
            stroke="url(#cycle)"
            strokeWidth={26}
            strokeLinecap="round"
            strokeDasharray={`${C * 0.9} ${C}`}
            strokeDashoffset={C * (1 - ringIn)}
            transform={`rotate(${rot} 380 380)`}
            opacity={0.9}
          />
          {/* punto que viaja por el aro (flyline) */}
          <circle
            cx={380 + R * Math.cos((rot * Math.PI) / 180)}
            cy={380 + R * Math.sin((rot * Math.PI) / 180)}
            r={16}
            fill="#fff"
          />
        </svg>

        <Chip label="DONAS" color={COLORS.greenDeep} x={185} y={150} delay={6} />
        <Chip
          label="ALQUILAS"
          color={COLORS.turquoiseDeep}
          x={575}
          y={610}
          delay={20}
        />

        {/* contador central */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 150,
              color: COLORS.ink,
              lineHeight: 1,
            }}
          >
            +{count}
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontWeight: 700,
              fontSize: 46,
              color: COLORS.inkSoft,
              marginTop: 6,
            }}
          >
            créditos CO₂
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
