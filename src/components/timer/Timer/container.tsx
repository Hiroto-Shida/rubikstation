import { useContext, useEffect, useRef, useState } from "react";
import { TimerPresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";

export const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timerState = useContext(TimerStateContext);

  function handleStart() {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  }

  function handlePause() {
    intervalRef.current && clearInterval(intervalRef.current);
  }

  function handleReset() {
    intervalRef.current && clearInterval(intervalRef.current);
    setTime(0);
  }

  useEffect(() => {
    if (timerState.startingState.isCanStart) {
      handleReset();
    }
    if (timerState.isStarted) {
      handleStart();
      return;
    }
    handlePause();
  }, [timerState.isStarted, timerState.startingState.isCanStart]);

  return <TimerPresenter time={time} timerState={timerState} />;
};
