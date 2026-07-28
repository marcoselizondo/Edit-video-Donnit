import React from "react";
import { AbsoluteFill } from "remotion";
import { PhoneScreen } from "../components/PhoneScreen";
import { Caption, Hi } from "../components/Caption";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · mapa hiperlocal por barrios (verde) — pantalla oscura "calentada" con verde
export const DonarMap: React.FC = () => {
  const opacity = useEdgeFade();
  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneScreen
        src="clip_map.mp4"
        zoom={[1.08, 1.16]}
        panY={[10, -20]}
        tint="rgba(143,214,120,0.55)"
      />
      <Caption accent={COLORS.greenDeep} startAt={4}>
        Tu barrio está lleno de <Hi>tesoros</Hi>
      </Caption>
    </AbsoluteFill>
  );
};
