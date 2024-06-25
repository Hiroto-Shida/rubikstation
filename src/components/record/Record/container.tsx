import { useContext, useEffect, useState } from "react";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import { RecordPresenter } from "./presenter";
import Cookies from "js-cookie";

export type RecordType = {
  id: number;
  scramble: string;
  time: number;
  penalty: string | undefined;
};

export const Record = () => {
  const timerState = useContext(TimerStateContext);
  const [recordList, setRecordList] = useState<RecordType[]>([]);

  const handleDeleteRecord = (id: number) => {
    setRecordList((prevRecordList) => {
      Cookies.set(
        "time_record",
        prevRecordList
          .filter((record) => record.id !== id)
          .map((record) => `scramble:${record.scramble}-time:${record.time}${record.penalty ?? ""}`)
          .join()
      );
      // 再セットsetする時に、idを振り直し
      return prevRecordList
        .filter((record) => record.id !== id)
        .map((record, index) => {
          record.id = index;
          return record;
        });
    });
  };

  useEffect(() => {
    const cookie_time_record = Cookies.get("time_record");
    if (cookie_time_record) {
      const tmpRecordList: RecordType[] = [];
      cookie_time_record.split(",").forEach((txt, index) => {
        const matchTime = txt.match(/^scramble:(.*)-time:([0-9]+)(\(.+\))*$/);
        if (matchTime && matchTime[1] && matchTime[2]) {
          tmpRecordList.push({
            id: index,
            scramble: matchTime[1],
            time: Number(matchTime[2]),
            penalty: matchTime[3],
          });
        }
      });

      setRecordList(tmpRecordList);
    }
  }, [timerState.startingState.isStarted]);

  return (
    <RecordPresenter
      timerState={timerState}
      recordList={recordList}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
