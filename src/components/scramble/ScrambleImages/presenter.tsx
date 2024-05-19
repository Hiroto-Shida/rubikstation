import { Grid, Stack, Typography } from "@mui/material";
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
          <Stack key={index}>
            <RubicModel
              moveChar={moveChar}
              axis={false}
              cameraControls={false}
            />
            <Typography variant="h6" sx={{ mt: -0.5, mb: 1 }}>
              {moveChar}
            </Typography>
          </Stack>
        ))}
      </Grid>
    )
  );
};
