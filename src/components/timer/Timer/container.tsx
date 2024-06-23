import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TimerPresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import Cookies from "js-cookie";
import { useInspectionStore } from "../../../stores/inspectionStore";

export type InspectionState = "normal" | "penalty" | "dnf";

export const Timer = () => {
  const [time, setTime] = useState<number>(0); // presenterの参照用
  const timeRef = useRef<number>(0); // container参照用
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { inspection } = useInspectionStore();
  const timerState = useContext(TimerStateContext);
  const [inspectionState, setInspectionState] = useState<InspectionState>("normal"); // presenterの参照用
  const inspectionStateRef = useRef<InspectionState>("normal"); // container参照用

  const handleMainStart = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      timeRef.current += 10;
    }, 10);
  };

  const handleInspectionStart = () => {
    setInspectionState("normal");
    inspectionStateRef.current = "normal";
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timeRef.current -= 1000;
      if (timeRef.current < -2000) {
        setInspectionState("dnf");
        inspectionStateRef.current = "dnf";
        intervalRef.current && clearInterval(intervalRef.current); // dnfまで行ったらタイマー止める
        return;
      } else if (timeRef.current < 0) {
        setInspectionState("penalty");
        inspectionStateRef.current = "penalty";
        setTime(0); // penaltyまで行ったらpresenterに渡す用のtimeは0に固定(タイマースタート時のcontainerの反映が若干遅れるため先に0にしておく)
        return;
      }
      setTime((prevTime) => prevTime - 1000);
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
        let penaltyText = "";
        if (inspectionStateRef.current === "penalty") {
          timeRef.current += 2000;
          penaltyText = "(+2.0)";
        }
        if (inspectionStateRef.current === "dnf") {
          penaltyText = "(DNF)";
        }
        time_record_list[0] = `${reg[1]}-time:${timeRef.current}${penaltyText}`;
        if (time_record_list.length > 12) {
          Cookies.set("time_record", time_record_list.slice(0, 12).join());
        } else {
          Cookies.set("time_record", time_record_list.join());
        }
        checkNewRecord(time_record_list);
        inspectionStateRef.current = "normal";
      }
    }
  }, [checkNewRecord]);

  const handleReset = (resetTime: number) => {
    intervalRef.current && clearInterval(intervalRef.current);
    setTime(resetTime);
    timeRef.current = resetTime;
  };

  useEffect(() => {
    // インスペクション計測タイマー開始時
    if (timerState.startingState.isStartedInspection) {
      handleReset(15000);
      handleInspectionStart();
      return;
    }
    // メイン計測タイマー開始時
    if (timerState.startingState.isStarted) {
      handleReset(0);
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
    timerState.startingState.isStartedInspection,
    inspection,
  ]);

  return (
    <TimerPresenter
      time={time}
      timerState={timerState}
      isNewRecord={isNewRecord}
      inspection={inspection}
      inspectionState={inspectionState}
    />
  );
};
