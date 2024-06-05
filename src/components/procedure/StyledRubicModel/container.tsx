import { ComponentProps } from "react";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { StyledRubicModelPresenter } from "./presenter";

export const StyledRubicModel = ({
  status,
  canvasCamera,
  isRotate,
}: Pick<ComponentProps<typeof RubicModel>, "status" | "canvasCamera" | "isRotate">) => {
  return (
    <StyledRubicModelPresenter status={status} canvasCamera={canvasCamera} isRotate={isRotate} />
  );
};
