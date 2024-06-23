import { Box, Switch, Typography } from "@mui/material";
import "./styles.css"; // スタイルシートをインポート
import React from "react";
import { TimerState } from "../../../providers/TimerStateProvider";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  activeClass: string;
  timerState: TimerState;
};

export const InspectionSwitchPresenter = ({
  handleChange,
  inspection,
  activeClass,
  timerState,
}: Props) => {
  const isDisplay: boolean =
    !timerState.startingState.isStarted &&
    !timerState.startingState.isStartedInspection &&
    !timerState.standbyState.isCanStart;
  return (
    isDisplay && (
      <Box
        component="div"
        sx={{
          position: "absolute",
          right: 0,
          top: "60%",
          transform: "translate(140%, -50%)",
          width: "110px",
          height: "50px",
        }}
      >
        <Box component="div" sx={{ position: "relative" }}>
          <Box component="div" sx={{ position: "absolute", top: "-60%" }}>
            <Typography
              className={`message ${activeClass}`}
              sx={{
                fontWeight: inspection ? "bold" : "normal",
              }}
            >
              {inspection ? "Inspection On" : "Inspection Off"}
            </Typography>
          </Box>
          <Switch checked={inspection} onChange={handleChange} sx={{}} />
        </Box>
      </Box>
    )
  );
};
