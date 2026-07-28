import { Composition } from "remotion";
import { DonnitTeaser } from "./DonnitTeaser";
import { ProofDS } from "./ProofDS";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DonnitTeaser"
        component={DonnitTeaser}
        durationInFrames={VIDEO.durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
      <Composition
        id="ProofDS"
        component={ProofDS}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
