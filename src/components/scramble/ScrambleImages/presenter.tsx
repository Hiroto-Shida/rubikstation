import { Grid } from "@mui/material";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { TimerState } from "../../../providers/TimerStateProvider";

type Props = {
  timerState: TimerState;
  multiTextList: string[][];
};

export const ScrambleImagesPresenter = ({
  timerState,
  multiTextList,
}: Props) => {
  if (timerState.isStarted) {
    return <></>;
  }

  if (timerState.isPause) {
    return <></>;
  }

  if (timerState.isStay) {
    return (
      multiTextList[0].length && (
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
      )
    );
  }
};
