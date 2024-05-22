import * as THREE from "three";
import { CubesPresenter } from "./presenter";
import { ROTATE_DIRECTION } from "../rotateDirection";
import { useEffect, useRef } from "react";
import { useRotateCube } from "../../../hooks/useRotateCube";
// import { CameraControls } from "@react-three/drei";

type Props = {
  moveChar?: string;
  status?: string;
  position?: number[];
  // cameraControlRef: React.MutableRefObject<CameraControls | null>;
};

export const Cubes = ({
  moveChar,
  status,
  position = [0, 0, 0],
}: // cameraControlRef,
Props) => {
  const { rotate } = useRotateCube();

  const cubeGroupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (cubeGroupRef.current && rotationGroupRef.current && moveChar) {
      const regexMoveChar = /2/;
      const removedTwoMoveChar = moveChar.replace(regexMoveChar, "");
      if (ROTATE_DIRECTION[removedTwoMoveChar]) {
        rotate(
          cubeGroupRef.current,
          rotationGroupRef.current,
          position,
          ROTATE_DIRECTION[removedTwoMoveChar][0],
          ROTATE_DIRECTION[removedTwoMoveChar][1],
          ROTATE_DIRECTION[removedTwoMoveChar][2]
        );
      } else {
        console.log(`回転記号 ${moveChar} は存在しません`);
      }
    }
    // if (cameraControlRef.current) {
    //   console.log(`cameraRef setting ${cameraControlRef.current.azimuthAngle}`);
    //   cubeGroupRef.current.rotation.set(
    //     0,
    //     cameraControlRef.current.azimuthAngle,
    //     0
    //   );
    // }
  }, [moveChar, position, rotate]);

  return (
    <CubesPresenter
      cubeGroupRef={cubeGroupRef}
      rotationGroupRef={rotationGroupRef}
      status={status}
      cubesPosition={new THREE.Vector3(position[0], position[1], position[2])}
    />
  );
};
