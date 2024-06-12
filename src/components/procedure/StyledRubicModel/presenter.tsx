import { ComponentProps } from "react";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { Box } from "@mui/material";
import { StyledRubicModel } from "./container";

type Props = ComponentProps<typeof StyledRubicModel>;

export const StyledRubicModelPresenter = ({
  orthographic,
  cameraControls,
  canvasStyle = { width: "300px", height: "300px" },
  status,
  canvasCamera,
  isRotate,
}: Props) => {
  return (
    <Box component="div" sx={(theme) => ({ m: `${theme.spacing(2)} 0` })}>
      <RubicModel
        orthographic={orthographic}
        cameraControls={cameraControls}
        canvasStyle={canvasStyle}
        status={status}
        canvasCamera={canvasCamera}
        isRotate={isRotate}
      />
    </Box>
  );
};
