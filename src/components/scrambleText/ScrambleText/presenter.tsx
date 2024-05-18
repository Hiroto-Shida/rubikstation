import { Grid, Typography } from "@mui/material";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { TimerState } from "../../../providers/TimerStateProvider";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScrambleTextPresenter = ({ timerState, multiTextList }: Props) => {
  if (timerState.isStarted) {
    return (
      <>
        <Typography variant="h4">Press Space</Typography>
      </>
    );
  }

  if (timerState.isPause) {
    return <></>;
  }

  if (timerState.isStay) {
    return (
      <>
        {multiTextList[0].length ? (
          <>
            {multiTextList.map((childList, index) => (
              <Typography variant="h4" key={index}>
                {childList.join(" ")}
              </Typography>
            ))}
            <Grid container>
              {multiTextList.map((childList) =>
                childList.map((moveName, index) => (
                  <RubicModel
                    key={index}
                    moveChar={moveName}
                    axis={false}
                    cameraControls={false}
                  />
                ))
              )}
            </Grid>
          </>
        ) : (
          <Typography variant="h4">Press Space</Typography>
        )}
      </>
    );
  }
};
