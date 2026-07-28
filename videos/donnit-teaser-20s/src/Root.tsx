import { Composition } from "remotion";
import { DonnitTeaser } from "./DonnitTeaser";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DonnitTeaser"
      component={DonnitTeaser}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
};
