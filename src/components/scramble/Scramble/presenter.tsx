import { Box } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import { ScrambleText } from "../ScrambleText/container";
import { Theme } from "@mui/material/styles";
import { ScrambleModels } from "../ScrambleModels/container";

type Props = {
  timerState: TimerState;
  scrambleList: string[];
};

const marginTopStyle = (theme: Theme) => ({
  marginTop: theme.spacing(2),
});

export const ScramblePresenter = ({ timerState, scrambleList }: Props) => {
  const isDisplay: boolean =
    !timerState.isStarted && !timerState.startingState.isCanStart;
  return (
    isDisplay &&
    scrambleList.length > 1 && (
      <>
        <Box component="div" sx={(theme) => marginTopStyle(theme)} />
        <ScrambleText scrambleList={scrambleList} />
        <Box component="div" sx={(theme) => marginTopStyle(theme)} />
        <ScrambleModels scrambleList={scrambleList} />
      </>
    )
  );
};
