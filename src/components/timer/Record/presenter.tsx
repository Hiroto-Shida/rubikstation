import { Box, Button, Dialog, List, Slide, Typography } from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { RecordType } from "./container";
import { VCenterTypography } from "../../parts/VCenterTypography/container";
import { convertToTimerText } from "../convertToTimerText";
import { RecordListItem } from "../RecordListItem/container";

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
  ao5: number;
  ao12: number;
  recordList: RecordType[];
  handleDeleteRecord: (index: number) => void;
};

export const RecordPresenter = React.memo(
  ({ timerState, ao5, ao12, recordList, handleDeleteRecord }: Props) => {
    const [isOpenRecord, setIsOpenRecord] = useState<boolean>(false);

    const handleClickOpenRecord = () => {
      setIsOpenRecord(true);
    };

    const handleCloseRecord = () => {
      setIsOpenRecord(false);
    };

    let fastestTimeIndex: number | null = null;
    if (recordList.length !== 0) {
      const aryMin = (a: number, b: number) => Math.min(a, b);
      const timeList = recordList.map((record) => record.time);
      fastestTimeIndex = timeList.indexOf(timeList.reduce(aryMin));
    }

    const isDisplay: boolean =
      !timerState.isStarted && !timerState.startingState.isCanStart;

    return (
      isDisplay && (
        <>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <VCenterTypography variant="h6">
              AO5: {ao5 === 0 ? "-" : convertToTimerText(ao5)}
            </VCenterTypography>
            <VCenterTypography
              variant="h6"
              sx={(theme) => ({
                ml: theme.spacing(3),
              })}
            >
              AO12: {ao12 === 0 ? "-" : convertToTimerText(ao12)}
            </VCenterTypography>
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
