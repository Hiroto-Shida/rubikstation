import { ScrambleTextPresenter } from "./presenter";
import { TimerState } from "../../../providers/TimerStateProvider";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScrambleText = ({ timerState, multiTextList }: Props) => {
  return (
    <ScrambleTextPresenter
      timerState={timerState}
      multiTextList={multiTextList}
    />
  );
};
