import {
  Box,
  Button,
  Dialog,
  Divider,
  List,
  Slide,
  Theme,
  Typography,
} from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { RecordType } from "./container";
import { RecordListItem } from "../RecordListItem/container";
import { useModalOpenStore } from "../../../stores/modalOpenStore";
import { convertToTimerText } from "../../timer/convertToTimerText";
import { Chart } from "../Chart/container";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  timerState: TimerState;
  recordList: RecordType[];
  handleDeleteRecord: (index: number) => void;
};

const aryMin = (a: number, b: number) => Math.min(a, b);
const aryMax = (a: number, b: number) => Math.max(a, b);

// 記録リスト(recordList: RecordType[])から最速タイムのIdを取得
const findFastestTimeId = (recordList: RecordType[]) => {
  let minTime = recordList[0].time;
  let minTimeId = recordList[0].id;
  recordList.forEach((record) => {
    if (record.time < minTime) {
      minTime = record.time;
      minTimeId = record.id;
    }
  });
  return minTimeId;
};
// 記録リスト(recordList: RecordType[])から最遅タイムのIdを取得
const findLatestTimeId = (recordList: RecordType[]) => {
  let maxTime = recordList[0].time;
  let maxTimeId = recordList[0].id;
  recordList.forEach((record) => {
    if (record.time > maxTime) {
      maxTime = record.time;
      maxTimeId = record.id;
    }
  });
  return maxTimeId;
};

// MO5, MO12の計算
const culcMoTime = (timeList: number[]) => {
  let mo = 0;
  timeList.forEach((time) => {
    mo += time;
  });
  return mo / timeList.length;
};

// AO5, AO12の計算
const culcAoTime = (timeList: number[], removeTimeIndexList: number[]) => {
  let sum = 0;
  timeList.forEach((time, index) => {
    if (!removeTimeIndexList.includes(index)) {
      sum += time;
    }
  });
  return sum / (timeList.length - 2);
};

// 配列から最大値と最小値のインデックスを取得
const findMinMaxTimeIndex = (timeList: number[]) => {
  const minIndex = timeList.indexOf(timeList.reduce(aryMin));
  const maxIndex = timeList.indexOf(timeList.reduce(aryMax));
  return [minIndex, maxIndex];
};

export const RecordPresenter = React.memo(
  ({ timerState, recordList, handleDeleteRecord }: Props) => {
    const [isOpenRecord, setIsOpenRecord] = useState<boolean>(false);
    const { setModalOpen } = useModalOpenStore();

    const handleClickOpenRecord = () => {
      setIsOpenRecord(true);
      setModalOpen(true);
    };

    const handleCloseRecord = () => {
      setIsOpenRecord(false);
      setModalOpen(false);
    };

    let fastestTimeId: number | null = null;
    let latestTimeId: number | null = null;
    let ao5: number | null = null;
    let ao12: number | null = null;
    let mo3: number | null = null;
    const recordListWithoutDNF = recordList.filter(
      (record) => record.penalty !== "(DNF)"
    );
    if (recordListWithoutDNF.length !== 0) {
      const timeList = recordListWithoutDNF.map((record) => record.time);
      fastestTimeId = findFastestTimeId(recordListWithoutDNF);
      latestTimeId = findLatestTimeId(recordListWithoutDNF);

      if (timeList.length >= 3) {
        mo3 = culcMoTime(timeList.slice(0, 3));
      }

      if (timeList.length >= 5) {
        ao5 = culcAoTime(
          timeList.slice(0, 5),
          findMinMaxTimeIndex(timeList.slice(0, 5))
        );
      }
      if (timeList.length >= 12) {
        ao12 = culcAoTime(
          timeList.slice(0, 12),
          findMinMaxTimeIndex(timeList.slice(0, 12))
        );
      }
    }

    const isDisplay: boolean =
      !timerState.startingState.isStarted &&
      !timerState.startingState.isStartedInspection &&
      !timerState.standbyState.isCanStart;

    return (
      isDisplay && (
        <>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h6">
              MO3: {mo3 ? convertToTimerText(mo3) : "-"}
            </Typography>
            <Typography
              variant="h6"
              sx={(theme: Theme) => ({
                ml: theme.spacing(3),
              })}
            >
              AO5: {ao5 ? convertToTimerText(ao5) : "-"}
            </Typography>
            <Typography
              variant="h6"
              sx={(theme: Theme) => ({
                ml: theme.spacing(3),
              })}
            >
              AO12: {ao12 ? convertToTimerText(ao12) : "-"}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClickOpenRecord}
              size="small"
              sx={(theme: Theme) => ({
                ml: theme.spacing(3),
              })}
            >
              記録
            </Button>
          </Box>
          <Dialog
            open={isOpenRecord}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseRecord}
            aria-describedby="record-dialog"
            sx={{ zIndex: 16777272 }} // react-three/dreiのHtmlのzIndexRange={[16777271, 0]}の上に配置するため
          >
            {recordList.length === 0 ? (
              <Box
                component="div"
                sx={(theme: Theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  p: `${theme.spacing(2)} ${theme.spacing(5)}`,
                })}
              >
                <Typography variant="h6" color="error">
                  記録なし
                </Typography>
              </Box>
            ) : (
              <>
                <Chart recordList={recordList} />
                <Divider />
                <List>
                  {recordList.map((record, index) => (
                    <RecordListItem
                      record={record}
                      recordListLength={recordList.length}
                      fastestTimeId={fastestTimeId}
                      latestTimeId={latestTimeId}
                      handleDeleteRecord={handleDeleteRecord}
                      key={index}
                    />
                  ))}
                </List>
              </>
            )}
          </Dialog>
        </>
      )
    );
  }
);
