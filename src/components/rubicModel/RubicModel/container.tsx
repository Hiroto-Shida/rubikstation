import { ComponentProps } from "react";
import { RubicModelPresenter } from "./presenter";
import { Canvas } from "@react-three/fiber";

type Props = {
  axis?: boolean; // 軸の表示
  cameraControls?: boolean; // カメラコントロールの有無
  status?: string;
  canvasStyle?: Pick<ComponentProps<typeof Canvas>, "style">["style"];
  canvasCamera?: Pick<ComponentProps<typeof Canvas>, "camera">["camera"];
  isRotate?: boolean; // 回転アニメーションをいれるか
};

export const RubicModel = ({
  axis,
  cameraControls,
  status,
  canvasStyle,
  canvasCamera,
  isRotate,
}: Props) => {
  return (
    <RubicModelPresenter
      axis={axis}
      cameraControls={cameraControls}
      status={status}
      canvasStyle={canvasStyle}
      canvasCamera={canvasCamera}
      isRotate={isRotate}
    />
  );
};
