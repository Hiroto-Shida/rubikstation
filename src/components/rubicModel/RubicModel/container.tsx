import { ComponentProps } from "react";
import { RubicModelPresenter } from "./presenter";
import { Canvas } from "@react-three/fiber";

type Props = {
  moveChar?: string; // 回転記号なければundefined
  axis?: boolean; // 軸の表示
  cameraControls?: boolean; // カメラコントロールの有無
  canvasStyle?: Pick<ComponentProps<typeof Canvas>, "style">["style"];
};

export const RubicModel = ({
  moveChar,
  axis,
  cameraControls,
  canvasStyle,
}: Props) => {
  return (
    <RubicModelPresenter
      moveChar={moveChar}
      axis={axis}
      cameraControls={cameraControls}
      canvasStyle={canvasStyle}
    />
  );
};
