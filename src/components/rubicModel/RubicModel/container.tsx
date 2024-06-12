import { ComponentProps } from "react";
import { RubicModelPresenter } from "./presenter";
import { Canvas } from "@react-three/fiber";

type Props = {
  orthographic?: boolean; // 平行透視でキューブを見るか
  axis?: boolean; // 軸の表示
  cameraControls?: boolean; // カメラコントロールの有無
  status?: string;
  canvasStyle?: Pick<ComponentProps<typeof Canvas>, "style">["style"];
  canvasCamera?: Pick<ComponentProps<typeof Canvas>, "camera">["camera"];
  isRotate?: boolean; // 回転アニメーションをいれるか
};

export const RubicModel = ({
  orthographic,
  axis,
  cameraControls,
  status,
  canvasStyle,
  canvasCamera,
  isRotate,
}: Props) => {
  return (
    <RubicModelPresenter
      orthographic={orthographic}
      axis={axis}
      cameraControls={cameraControls}
      status={status}
      canvasStyle={canvasStyle}
      canvasCamera={canvasCamera}
      isRotate={isRotate}
    />
  );
};
