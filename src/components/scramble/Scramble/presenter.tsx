import { TimerState } from "../../../providers/TimerStateProvider";
import { ScrambleImages } from "../ScrambleImages/container";
import { ScrambleText } from "../ScrambleText/container";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScramblePresenter = ({ timerState, multiTextList }: Props) => {
  return (
    <>
      <ScrambleText timerState={timerState} multiTextList={multiTextList} />
      <ScrambleImages timerState={timerState} multiTextList={multiTextList} />
    </>
  );
};
