import { Box, Button, Dialog, List, Slide, Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { RecordType } from "./container";
import { convertToTimerText } from "../convertToTimerText";
import { RecordListItem } from "../RecordListItem/container";
import { useModalOpenStore } from "../../../stores/modalOpenStore";

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

    let fastestTimeIndex: number | null = null;
    let latestTimeIndex: number | null = null;
    let ao5: number | null = null;
    let ao12: number | null = null;
    let mo3: number | null = null;
    let removeTimeIndexListOfAo5: number[] = [];
    let removeTimeIndexListOfAo12: number[] = [];
    if (recordList.length !== 0) {
      const timeList = recordList.map((record) => record.time);
      fastestTimeIndex = timeList.indexOf(timeList.reduce(aryMin));
      latestTimeIndex = timeList.indexOf(timeList.reduce(aryMax));

      if (timeList.length >= 3) {
        mo3 = culcMoTime(timeList.slice(0, 3));
      }

      if (timeList.length >= 5) {
        removeTimeIndexListOfAo5 = findMinMaxTimeIndex(timeList.slice(0, 5));
        ao5 = culcAoTime(timeList.slice(0, 5), removeTimeIndexListOfAo5);
      }
      if (timeList.length >= 12) {
        removeTimeIndexListOfAo12 = findMinMaxTimeIndex(timeList.slice(0, 12));
        ao12 = culcAoTime(timeList.slice(0, 12), removeTimeIndexListOfAo12);
      }
    }

    const isDisplay: boolean = !timerState.isStarted && !timerState.startingState.isCanStart;

    return (
      isDisplay && (
        <>
          <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">MO3: {mo3 ? convertToTimerText(mo3) : "-"}</Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                ml: theme.spacing(3),
              })}
            >
              AO5: {ao5 ? convertToTimerText(ao5) : "-"}
            </Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                ml: theme.spacing(3),
              })}
            >
              AO12: {ao12 ? convertToTimerText(ao12) : "-"}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClickOpenRecord}
              size="small"
              sx={(theme) => ({
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
            aria-describedby="alert-dialog-slide-description"
            sx={{ zIndex: 16777272 }} // react-three/dreiのHtmlのzIndexRange={[16777271, 0]}の上に配置するため
          >
            {recordList.length === 0 ? (
              <Box
                component="div"
                sx={(theme) => ({
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
              <List>
                {recordList.map((record, index) => (
                  <RecordListItem
                    record={record}
                    index={index}
                    recordListLength={recordList.length}
                    fastestTimeIndex={fastestTimeIndex}
                    latestTimeIndex={latestTimeIndex}
                    handleDeleteRecord={handleDeleteRecord}
                    key={index}
                  />
                ))}
              </List>
            )}
          </Dialog>
        </>
      )
    );
  }
);
