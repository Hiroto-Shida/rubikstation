import { Grid } from "@mui/material";
import { RubicModel } from "../../rubicModel/RubicModel/container";

type Props = {
  isDisplay: boolean;
  multiTextList: string[][];
};

export const ScrambleImagesPresenter = ({
  isDisplay,
  multiTextList,
}: Props) => {
  return (
    isDisplay &&
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
};
