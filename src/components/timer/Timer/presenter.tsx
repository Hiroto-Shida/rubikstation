import { Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";

type Props = {
  time: number;
  timerState: TimerState;
};

export const TimerPresenter = ({ time, timerState }: Props) => {
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);

  return (
    <>
      <Typography
        variant={timerState.isStarted || timerState.startingState.isCanStart ? "h1" : "h2"}
        color={
          timerState.startingState.isKeyDownSpace
            ? timerState.startingState.isCanStart
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
