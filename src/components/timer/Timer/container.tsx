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
    if (timerState.isStarted) {
      handleReset();
      handleStart();
      return;
    }
    handlePause();
  }, [timerState.isStarted]);

  return (
    <TimerPresenter
      time={time}
      timerStateStartingState={timerState.startingState}
    />
  );
};
