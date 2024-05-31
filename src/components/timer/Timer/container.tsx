import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TimerPresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import Cookies from "js-cookie";

export const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const timeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timerState = useContext(TimerStateContext);

  function handleStart() {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      timeRef.current += 10;
    }, 10);
  }

  const checkNewRecord = useCallback((timeRecordList: string[]) => {
    const timeList: number[] = [];
    timeRecordList.forEach((recordText) => {
      const matchRecord = recordText.match(/^scramble:.*-time:([0-9]+)$/);
      if (matchRecord && matchRecord[1]) {
        return timeList.push(Number(matchRecord[1]));
      }
    });

    if (timeList.length !== 0) {
      const aryMin = (a: number, b: number) => Math.min(a, b);
      const fastestTimeIndex = timeList.indexOf(timeList.reduce(aryMin));

      if (fastestTimeIndex === 0) {
        setIsNewRecord(true);
      } else {
        setIsNewRecord(false);
      }
    }
  }, []);

  const handlePause = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);

    const time_record_txt = Cookies.get("time_record");
    if (time_record_txt) {
      const time_record_list = time_record_txt.split(",");
      const last_record_txt = time_record_list[0];
      const reg = last_record_txt.match(/(scramble:.*)-time:null/);
      if (reg) {
        time_record_list[0] = `${reg[1]}-time:${timeRef.current}`;
        if (time_record_list.length > 12) {
          Cookies.set("time_record", time_record_list.slice(0, 12).join());
        } else {
          Cookies.set("time_record", time_record_list.join());
        }
        checkNewRecord(time_record_list);
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

  return (
    <TimerPresenter
      time={time}
      timerState={timerState}
      isNewRecord={isNewRecord}
    />
  );
};
