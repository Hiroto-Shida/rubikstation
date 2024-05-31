import { useContext, useEffect, useState } from "react";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import { RecordPresenter } from "./presenter";
import Cookies from "js-cookie";

export type RecordType = {
  scramble: string;
  time: number;
};

export const Record = () => {
  const timerState = useContext(TimerStateContext);
  const [recordList, setRecordList] = useState<RecordType[]>([]);
  const [ao5, setAo5] = useState<number>(0);
  const [ao12, setAo12] = useState<number>(0);

  const handleDeleteRecord = (index: number) => {
    setRecordList((prevRecordList) => {
      Cookies.set(
        "time_record",
        prevRecordList
          .filter((_, i) => i !== index)
          .map((record) => `scramble:${record.scramble}-time:${record.time}`)
          .join()
      );
      return prevRecordList.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    const cookie_time_record = Cookies.get("time_record");
    if (cookie_time_record) {
      const tmpRecordList: RecordType[] = [];
      cookie_time_record.split(",").forEach((txt) => {
        const matchTime = txt.match(/^scramble:(.*)-time:([0-9]+)$/);
        if (matchTime && matchTime[1] && matchTime[2]) {
          tmpRecordList.push({
            scramble: matchTime[1],
            time: Number(matchTime[2]),
          });
        }
      });

      let sum_5 = 0;
      let sum_12 = 0;
      if (tmpRecordList.length >= 5) {
        tmpRecordList.slice(0, 5).forEach((record) => {
          sum_5 += record.time ? record.time : 0;
        });
      }
      if (tmpRecordList.length >= 12) {
        tmpRecordList.slice(0, 12).forEach((record) => {
          sum_12 += record.time ? record.time : 0;
        });
      }
      setAo5(sum_5 / 5);
      setAo12(sum_12 / 12);
      setRecordList(tmpRecordList);
    }
  }, [timerState.isStarted]);

  return (
    <RecordPresenter
      timerState={timerState}
      ao5={ao5}
      ao12={ao12}
      recordList={recordList}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
