import { TimerState } from "../../../providers/TimerStateProvider";
import { ScrambleImages } from "../ScrambleImages/container";
import { ScrambleText } from "../ScrambleText/container";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScramblePresenter = ({ timerState, multiTextList }: Props) => {
  const isDisplay: boolean =
    !timerState.isStarted && !timerState.startingState.isCanStart;
  return (
    <>
      <ScrambleText isDisplay={isDisplay} multiTextList={multiTextList} />
      <ScrambleImages isDisplay={isDisplay} multiTextList={multiTextList} />
    </>
  );
};
