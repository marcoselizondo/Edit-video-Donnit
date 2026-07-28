import React from "react";
import { AbsoluteFill } from "remotion";
import { PhoneScreen } from "../components/PhoneScreen";
import { Caption, Hi } from "../components/Caption";
import { COLORS } from "../theme";
import { useEdgeFade } from "../util";

// DONAR · feed del barrio (verde)
export const DonarFeed: React.FC = () => {
  const opacity = useEdgeFade();
  return (
    <AbsoluteFill style={{ opacity }}>
      <PhoneScreen src="clip_feed.mp4" zoom={[1.04, 1.12]} panY={[0, -30]} />
      <Caption accent={COLORS.greenDeep} startAt={4}>
        Regálalo <Hi>gratis</Hi> en tu barrio
      </Caption>
    </AbsoluteFill>
  );
};
