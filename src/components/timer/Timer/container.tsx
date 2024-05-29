import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TimerPresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import Cookies from "js-cookie";

export const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timerState = useContext(TimerStateContext);

  function handleStart() {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      timeRef.current += 10;
    }, 10);
  }

  const handlePause = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);

    const time_record_txt = Cookies.get("time_record");
    if (time_record_txt) {
      const time_record_list = time_record_txt.split(",");
      const last_record_txt = time_record_list[time_record_list.length - 1];
      const reg = last_record_txt.match(/(scramble:.*)-time:null/);
      if (reg) {
        // const milliseconds = `0${(timeRef.current % 1000) / 10}`.slice(-2);
        // const seconds = `0${Math.floor(timeRef.current / 1000) % 60}`.slice(-2);
        // const minutes = `0${Math.floor(timeRef.current / 60000) % 60}`.slice(-2);
        time_record_list[time_record_list.length - 1] = `${reg[1]}-time:${timeRef.current}`;

        if (time_record_list.length > 12) {
          Cookies.set("time_record", time_record_list.slice(time_record_list.length - 12).join());
        } else {
          Cookies.set("time_record", time_record_list.join());
        }
      }
    }
  }, []);

  function handleReset() {
    intervalRef.current && clearInterval(intervalRef.current);
    setTime(0);
    timeRef.current = 0;
  }

  useEffect(() => {
    if (timerState.startingState.isCanStart) {
      handleReset();
    }
    if (timerState.isStarted) {
      handleStart();
      return;
    }
    timeRef.current !== 0 && handlePause();
  }, [handlePause, timerState.isStarted, timerState.startingState.isCanStart]);

  return <TimerPresenter time={time} timerState={timerState} />;
};
