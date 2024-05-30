import { useContext, useEffect, useState } from "react";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import { RecordPresenter } from "./presenter";
import Cookies from "js-cookie";

export const Record = () => {
  const timerState = useContext(TimerStateContext);
  const [ao5, setAo5] = useState<number>(0);
  const [ao12, setAo12] = useState<number>(0);

  useEffect(() => {
    const time_record_txt = Cookies.get("time_record");
    if (time_record_txt) {
      const timeRecordList = time_record_txt.split(",");

      const tmptimeList = timeRecordList.map((txt) => {
        const matchTime = txt.match(/^.*time:([0-9]+)$/);
        if (matchTime) {
          return Number(matchTime[1]);
        }
      });

      console.log(tmptimeList);
      let sum_5 = 0;
      let sum_12 = 0;
      if (tmptimeList.length >= 5) {
        tmptimeList.slice(tmptimeList.length - 5).forEach((time) => {
          sum_5 += time ? time : 0;
        });
      }
      if (tmptimeList.length >= 12) {
        tmptimeList.slice(tmptimeList.length - 12).forEach((time) => {
          sum_12 += time ? time : 0;
        });
      }
      setAo5(sum_5 / 5);
      setAo12(sum_12 / 12);
    }
  }, [timerState.isStarted]);

  return <RecordPresenter timerState={timerState} ao5={ao5} ao12={ao12} />;
};
