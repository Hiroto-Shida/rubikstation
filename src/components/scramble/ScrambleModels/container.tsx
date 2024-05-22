import { useRef } from "react";
import { ScrambleModelsPresenter } from "./presenter";
import { CameraControls } from "@react-three/drei";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleModels = ({ isDisplay, scrambleList }: Props) => {
  // const cameraControlRef = useRef<CameraControls | null>(null); // カメラのref．回転や方向の参照や調整に使用

  return (
    <ScrambleModelsPresenter
      isDisplay={isDisplay}
      scrambleList={scrambleList}
      // cameraControlRef={cameraControlRef}
    />
  );
};
