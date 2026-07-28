import { Composition } from "remotion";
import { DonnitTeaser } from "./DonnitTeaser";
import { DonnitShowcase } from "./DonnitShowcase";
import { ProofDS } from "./ProofDS";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DonnitShowcase"
        component={DonnitShowcase}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1920}
      />
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
