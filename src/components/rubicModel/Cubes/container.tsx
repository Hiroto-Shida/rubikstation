import * as THREE from "three";
import { CubesPresenter } from "./presenter";
import { ROTATE_DIRECTION } from "../rotateDirection";
import { useEffect, useRef } from "react";
import { useRotateCube } from "../../../hooks/useRotateCube";

type Props = {
  moveChar?: string;
  status?: string;
  cubeGroupPosition?: number[];
};

export const Cubes = ({ moveChar, status, cubeGroupPosition = [0, 0, 0] }: Props) => {
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
          cubeGroupPosition,
          ROTATE_DIRECTION[removedTwoMoveChar][0],
          ROTATE_DIRECTION[removedTwoMoveChar][1],
          ROTATE_DIRECTION[removedTwoMoveChar][2]
        );
      } else {
        console.log(`回転記号 ${moveChar} は存在しません`);
      }
      cubeGroupRef.current.rotation.set(Math.PI / 5, -Math.PI / 4, 0);
    }
  }, [moveChar, cubeGroupPosition, rotate]);

  return (
    <CubesPresenter
      cubeGroupRef={cubeGroupRef}
      rotationGroupRef={rotationGroupRef}
      status={status}
      cubesPosition={
        new THREE.Vector3(cubeGroupPosition[0], cubeGroupPosition[1], cubeGroupPosition[2])
      }
    />
  );
};
