import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TimerPresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import Cookies from "js-cookie";
import { useInspectionStore } from "../../../stores/inspectionStore";

export const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const timeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { inspection } = useInspectionStore();
  const timerState = useContext(TimerStateContext);

  const handleMainStart = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      timeRef.current += 10;
    }, 10);
  };

  const handleInspectionStart = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
      timeRef.current -= 1000;
    }, 1000);
  };

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

  const handleReset = (resetTime: number) => {
    intervalRef.current && clearInterval(intervalRef.current);
    setTime(resetTime);
    timeRef.current = resetTime;
  };

  useEffect(() => {
    // タイマースタート準備完了時(スペースキー離せばタイマーが始まる状態時)のタイマーのリセット
    if (timerState.standbyState.isCanStart) {
      if (inspection && !timerState.startingState.isStartedInspection) {
        handleReset(15000);
      } else {
        handleReset(0);
      }
    }

    // インスペクション計測タイマー開始時
    if (timerState.startingState.isStartedInspection) {
      handleInspectionStart();
      return;
    }
    // メイン計測タイマー開始時
    if (timerState.startingState.isStarted) {
      handleMainStart();
      return;
    }

    // メイン計測タイマー終了時
    if (
      !timerState.startingState.isStarted &&
      !timerState.startingState.isStartedInspection &&
      timeRef.current !== 0
    ) {
      handlePause();
    }
  }, [
    handlePause,
    timerState.startingState.isStarted,
    timerState.standbyState.isCanStart,
    timerState.startingState.isStartedInspection,
    inspection,
  ]);

  return (
    <TimerPresenter
      time={time}
      timerState={timerState}
      isNewRecord={isNewRecord}
      isInspectionStyle={inspection}
    />
  );
};
