import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React, { ReactNode, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import DeleteIcon from "@mui/icons-material/Delete";
import { RecordType } from "./container";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VCenterTypography = ({ children, sx, ...other }: TypographyProps) => {
  const theme = useTheme(); // テーマを取得
  const resolvedSx = typeof sx === "function" ? sx(theme) : sx;

  return (
    <Typography
      variant="h6"
      {...other}
      sx={{
        ...resolvedSx,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Typography>
  );
};

const convertToTimerText = (time: number) => {
  const milliseconds = `0${Math.round((time % 1000) / 10)}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  return `${minutes}:${seconds}:${milliseconds}`;
};

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

    console.log("RecordPresenter rendering");
    const handleClickOpenRecord = () => {
      setIsOpenRecord(true);
    };

    const handleCloseRecord = () => {
      setIsOpenRecord(false);
    };

    const isDisplay: boolean = !timerState.isStarted && !timerState.startingState.isCanStart;

    return (
      isDisplay && (
        <>
          <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
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
              // size="small"
              sx={(theme) => ({
                ml: theme.spacing(3),
                // pt: "6px",
                // pb: "6px",
                // lineHeight: "23px",
                // display: "flex",
                // justifyContent: "center",
                // flexDirection: "column",
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
              <Typography>記録なし</Typography>
            ) : (
              <List>
                {recordList.map((record, index) => (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteRecord(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    key={index}
                  >
                    <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
                      <VCenterTypography variant="h6">{index + 1}</VCenterTypography>
                      <VCenterTypography variant="h5" sx={(theme) => ({ ml: theme.spacing(3) })}>
                        {convertToTimerText(record.time)}
                      </VCenterTypography>
                      <VCenterTypography variant="h6" sx={(theme) => ({ ml: theme.spacing(3) })}>
                        {record.scramble}
                      </VCenterTypography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Dialog>
        </>
      )
    );
  }
);
