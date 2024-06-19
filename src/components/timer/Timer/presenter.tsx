import { Box, Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import { styled } from "@mui/material/styles";
import { convertToTimerText } from "../convertToTimerText";
import { InspectionSwitch } from "../InspectionSwitch/container";
type Props = {
  time: number;
  timerState: TimerState;
  isNewRecord: boolean;
};

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
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
  return (
    <>
      {isNewRecord && !timerState.isStarted && !timerState.startingState.isCanStart && (
        <StyledTypography variant="h6">New Record !!!</StyledTypography>
      )}
      <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="div" sx={{ position: "relative" }}>
          <Typography
            variant={timerState.isStarted || timerState.startingState.isCanStart ? "h1" : "h2"}
            color={
              timerState.startingState.isKeyDownSpace
                ? timerState.startingState.isCanStart
                  ? "themeBase.green"
                  : "themeBase.red"
                : "text.primary"
            }
            // sx={{ position: "relative" }}
          >
            {convertToTimerText(time)}
          </Typography>
          <InspectionSwitch />
        </Box>
      </Box>
    </>
  );
};
