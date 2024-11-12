import { Stack } from "@mui/material";
import { Scramble } from "../../components/scramble/Scramble/container";
import { Timer } from "../../components/timer/Timer/container";
import { useContext } from "react";
import { TimerStateContext } from "../../providers/TimerStateProvider";
import { Record } from "../../components/record/Record/container";
import styles from "./index.module.scss";
import clsx from "clsx";

export const IndexPagePresenter = () => {
  const timerState = useContext(TimerStateContext);
  const isCenter =
    timerState.startingState.isStarted ||
    timerState.startingState.isStartedInspection ||
    timerState.standbyState.isCanStart;
  return (
    <div
      className={clsx(styles.indexPage, {
        [styles.Center]: isCenter,
      })}
    >
      <Stack width="100%">
        <Timer />
        <Record />
        <Scramble />
      </Stack>
    </div>
  );
};
