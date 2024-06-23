import { Box, Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import { styled } from "@mui/material/styles";
import { convertToTimerText } from "../convertToTimerText";
import { InspectionSwitch } from "../InspectionSwitch/container";
import { InspectionState } from "./container";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import React from "react";
type Props = {
  time: number;
  timerState: TimerState;
  isNewRecord: boolean;
  inspection: boolean;
  inspectionState: InspectionState;
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

export const TimerPresenter = React.memo(
  ({ time, timerState, isNewRecord, inspection, inspectionState }: Props) => {
    const isDisplayInspectionTimer =
      inspection &&
      timerState.startingState.isStartedInspection &&
      !timerState.startingState.isStarted;
    const isDisplayInspectionIcon =
      inspection &&
      (timerState.startingState.isStartedInspection ||
        timerState.startingState.isStarted ||
        timerState.standbyState.isCanStart);
    return (
      <>
        {isNewRecord &&
          !timerState.startingState.isStarted &&
          !timerState.startingState.isStartedInspection &&
          !timerState.standbyState.isCanStart && (
            <StyledTypography variant="h6">New Record !!!</StyledTypography>
          )}
        <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
          <Box component="div" sx={{ position: "relative" }}>
            <Typography
              variant={
                timerState.startingState.isStarted ||
                timerState.startingState.isStartedInspection ||
                timerState.standbyState.isCanStart
                  ? "h1"
                  : "h2"
              }
              color={
                timerState.standbyState.isKeyDownSpace
                  ? timerState.standbyState.isCanStart
                    ? "themeBase.green"
                    : "themeBase.red"
                  : "text.primary"
              }
            >
              {isDisplayInspectionTimer
                ? inspectionState === "normal"
                  ? time / 1000
                  : inspectionState === "penalty"
                  ? "+2.0"
                  : "DNF"
                : convertToTimerText(time)}
            </Typography>
            <InspectionSwitch />
            {isDisplayInspectionIcon && (
              <TimerOutlinedIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  transform: "translate(250%, -50%)",
                  fontSize: "50px",
                }}
              />
            )}
          </Box>
        </Box>
      </>
    );
  }
);
