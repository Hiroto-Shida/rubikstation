import { ComponentProps } from "react";
import { RubicModelPresenter } from "./presenter";
import { Canvas } from "@react-three/fiber";

type Props = {
  moveChar?: string; // 回転記号なければundefined
  axis?: boolean; // 軸の表示
  cameraControls?: boolean; // カメラコントロールの有無
  status?: string;
  canvasStyle?: Pick<ComponentProps<typeof Canvas>, "style">["style"];
  canvasCamera?: Pick<ComponentProps<typeof Canvas>, "camera">["camera"];
};

export const RubicModel = ({
  moveChar,
  axis,
  cameraControls,
  status,
  canvasStyle,
  canvasCamera,
}: Props) => {
  return (
    <RubicModelPresenter
      moveChar={moveChar}
      axis={axis}
      cameraControls={cameraControls}
      status={status}
      canvasStyle={canvasStyle}
      canvasCamera={canvasCamera}
    />
  );
};
