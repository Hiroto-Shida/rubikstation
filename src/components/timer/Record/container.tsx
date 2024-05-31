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

  console.log("rendering Record");

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

      setRecordList(tmpRecordList);
    }
  }, [timerState.isStarted]);

  return (
    <RecordPresenter
      timerState={timerState}
      recordList={recordList}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
