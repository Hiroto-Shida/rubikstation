import { ComponentProps } from "react";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { StyledRubicModelPresenter } from "./presenter";

export const StyledRubicModel = ({
  orthographic,
  cameraControls,
  canvasStyle,
  status,
  canvasCamera,
  isRotate,
}: Pick<
  ComponentProps<typeof RubicModel>,
  "status" | "canvasCamera" | "isRotate" | "canvasStyle" | "orthographic" | "cameraControls"
>) => {
  return (
    <StyledRubicModelPresenter
      orthographic={orthographic}
      cameraControls={cameraControls}
      canvasStyle={canvasStyle}
      status={status}
      canvasCamera={canvasCamera}
      isRotate={isRotate}
    />
  );
};
