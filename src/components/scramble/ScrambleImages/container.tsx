import { TimerState } from "../../../providers/TimerStateProvider";
import { ScrambleImagesPresenter } from "./presenter";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScrambleImages = ({ timerState, multiTextList }: Props) => {
  return (
    <ScrambleImagesPresenter
      timerState={timerState}
      multiTextList={multiTextList}
    />
  );
};
