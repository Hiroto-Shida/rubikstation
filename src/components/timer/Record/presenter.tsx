import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TimerState } from "../../../providers/TimerStateProvider";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";

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
};

export const RecordPresenter = React.memo(
  ({ timerState, ao5, ao12 }: Props) => {
    const [isOpenRecord, setIsOpenRecord] = useState<boolean>(false);

    const handleClickOpenRecord = () => {
      setIsOpenRecord(true);
    };

    const handleCloseRecord = () => {
      setIsOpenRecord(false);
    };

    const isDisplay: boolean =
      !timerState.isStarted && !timerState.startingState.isCanStart;

    const ao5_milliseconds = `0${Math.round((ao5 % 1000) / 10)}`.slice(-2);
    const ao5_seconds = `0${Math.floor(ao5 / 1000) % 60}`.slice(-2);
    const ao5_minutes = `0${Math.floor(ao5 / 60000) % 60}`.slice(-2);

    const ao12_milliseconds = `0${Math.round((ao12 % 1000) / 10)}`.slice(-2);
    const ao12_seconds = `0${Math.floor(ao12 / 1000) % 60}`.slice(-2);
    const ao12_minutes = `0${Math.floor(ao12 / 60000) % 60}`.slice(-2);

    return (
      isDisplay && (
        <>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              AO5:{" "}
              {ao5 === 0
                ? "-"
                : `(${ao5_minutes}:${ao5_seconds}:${ao5_milliseconds})`}
            </Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                ml: theme.spacing(3),
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              })}
            >
              AO12:{" "}
              {ao12 === 0
                ? "-"
                : `(${ao12_minutes}:${ao12_seconds}:${ao12_milliseconds})`}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClickOpenRecord}
              size="small"
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
            {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRecord}>Disagree</Button>
              <Button onClick={handleCloseRecord}>Agree</Button>
            </DialogActions> */}
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </Demo>
          </Dialog>
        </>
      )
    );
  }
);
