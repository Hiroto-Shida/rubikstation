import { Grid } from "@mui/material";
import { RubicModel } from "../../rubicModel/RubicModel/container";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleImagesPresenter = ({ isDisplay, scrambleList }: Props) => {
  return (
    isDisplay &&
    scrambleList.length && (
      <Grid container>
        {scrambleList.map((moveChar, index) => (
          <RubicModel
            key={index}
            moveChar={moveChar}
            axis={false}
            cameraControls={false}
          />
        ))}
      </Grid>
    )
  );
};
