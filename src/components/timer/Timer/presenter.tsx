import { Typography } from "@mui/material";
import { useState, useRef, useEffect, useContext } from 'react';
import { RunningStateContext } from "../../../pages/Index/presenter";

export const TimerPresenter = () => {
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef(0);

  const runningState = useContext(RunningStateContext)

  function handleStart() {
    console.log("start")
      intervalRef.current = setInterval(() => {
          setTime(prevTime => prevTime + 10);
      }, 10);
  }

  function handlePause() {
    console.log("pause")
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    console.log("reset")
    clearInterval(intervalRef.current);
      setTime(0);
  }

  useEffect(() => {
    if (runningState.isStarted) {
      handleStart()
    }
    if (runningState.isPause) {
      handlePause()
    }
    if (runningState.isStay) {
      handleReset()
    }
  }, [runningState]);

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);

  console.log("TimerPresenter rendering")

  return (
    <>
      <Typography variant="h4">
      {minutes}:{seconds}:{milliseconds}
      </Typography>
    </>
);
};