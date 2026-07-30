import { Composition } from "remotion";
import { DonnitTeaser } from "./DonnitTeaser";
import { DonnitCinematic } from "./DonnitCinematic";
import { HiggsfieldReveal } from "./HiggsfieldReveal";
import { FootageReel, FOOTAGE_REEL_TOTAL } from "./FootageReel";
import { ReelViral, REEL_VIRAL_TOTAL } from "./ReelViral";
import { DonnitShowcase } from "./DonnitShowcase";
import { ProofDS } from "./ProofDS";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelViral"
        component={ReelViral}
        durationInFrames={REEL_VIRAL_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FootageReel"
        component={FootageReel}
        durationInFrames={FOOTAGE_REEL_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HiggsfieldReveal"
        component={HiggsfieldReveal}
        durationInFrames={160}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DonnitCinematic"
        component={DonnitCinematic}
        durationInFrames={1272}
        fps={30}
        width={1080}
        height={1920}
      />
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
