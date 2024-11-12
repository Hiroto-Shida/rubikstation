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
  // TODO: useMemoとかで最適化する
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
          top: 0,
          right: 0,
          // top: "60%",
          // transform: "translate(140%, -50%)",
          // transform: "translate(0, -50%)",
          width: "110px",
          // height: "50px",
          height: "100%",
          zIndex: 16777273,
        }}
      >
        <Box
          component="div"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
            }}
          >
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
