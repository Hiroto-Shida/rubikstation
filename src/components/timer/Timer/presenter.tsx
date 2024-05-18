import { Typography } from "@mui/material";
import { StartingState } from "../../../providers/TimerStateProvider";

type Props = {
  time: number;
  timerStateStartingState: StartingState;
};

export const TimerPresenter = ({ time, timerStateStartingState }: Props) => {
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);

  return (
    <>
      <Typography
        variant="h4"
        color={
          timerStateStartingState.isKeyDownSpace
            ? timerStateStartingState.isCanStart
              ? "success.main"
              : "error.main"
            : "textPrimary"
        }
      >
        {minutes}:{seconds}:{milliseconds}
      </Typography>
    </>
  );
};
