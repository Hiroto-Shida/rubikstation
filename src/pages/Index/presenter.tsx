import { Box, Stack } from "@mui/material";
import { Scramble } from "../../components/scramble/Scramble/container";
import { Timer } from "../../components/timer/Timer/container";
import { useContext } from "react";
import { TimerStateContext } from "../../providers/TimerStateProvider";
import { Record } from "../../components/timer/Record/container";

export const IndexPagePresenter = () => {
  const timerState = useContext(TimerStateContext);
  return (
    <Box
      component="div"
      sx={
        timerState.isStarted || timerState.startingState.isCanStart
          ? {
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
          : {
              height: "100%",
            }
      }
    >
      <Stack width="100%">
        <Timer />
        <Record />
        <Scramble />
      </Stack>
    </Box>
  );
};
