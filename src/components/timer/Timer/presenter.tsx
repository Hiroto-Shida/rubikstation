import { Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import { styled } from "@mui/material/styles";
type Props = {
  time: number;
  timerState: TimerState;
  isNewRecord: boolean;
};

const StyledTypography = styled(Typography)({
  animation: "fancyBorder 0.7s ease infinite",
  "@keyframes fancyBorder": {
    "0%": {
      color: "#ff0000",
    },
    "50%": {
      color: "#ffaaaa",
    },
    "100%": {
      color: "#ff0000",
    },
  },
});

export const TimerPresenter = ({ time, timerState, isNewRecord }: Props) => {
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);

  return (
    <>
      {isNewRecord &&
        !timerState.isStarted &&
        !timerState.startingState.isCanStart && (
          <StyledTypography variant="h6">New Record !!!</StyledTypography>
        )}
      <Typography
        variant={
          timerState.isStarted || timerState.startingState.isCanStart
            ? "h1"
            : "h2"
        }
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
