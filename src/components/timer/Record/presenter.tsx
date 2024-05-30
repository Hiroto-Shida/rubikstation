import { Box, Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React from "react";

type Props = {
  timerState: TimerState;
  ao5: number;
  ao12: number;
};

export const RecordPresenter = React.memo(
  ({ timerState, ao5, ao12 }: Props) => {
    const isDisplay: boolean =
      !timerState.isStarted && !timerState.startingState.isCanStart;

    const ao5_milliseconds = `0${Math.round((ao5 % 1000) / 10)}`.slice(-2);
    const ao5_seconds = `0${Math.floor(ao5 / 1000) % 60}`.slice(-2);
    const ao5_minutes = `0${Math.floor(ao5 / 60000) % 60}`.slice(-2);

    const ao12_milliseconds = `0${Math.round((ao12 % 1000) / 10)}`.slice(-2);
    const ao12_seconds = `0${Math.floor(ao12 / 1000) % 60}`.slice(-2);
    const ao12_minutes = `0${Math.floor(ao12 / 60000) % 60}`.slice(-2);

    return (
      isDisplay && (
        <>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h6">
              AO5:{" "}
              {ao5 === 0
                ? "-"
                : `(${ao5_minutes}:${ao5_seconds}:${ao5_milliseconds})`}
            </Typography>
            <Typography variant="h6" sx={(theme) => ({ ml: theme.spacing(3) })}>
              AO12:{" "}
              {ao12 === 0
                ? "-"
                : `(${ao12_minutes}:${ao12_seconds}:${ao12_milliseconds})`}
            </Typography>
          </Box>
        </>
      )
    );
  }
);
