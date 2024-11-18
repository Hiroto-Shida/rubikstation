import * as THREE from "three";
import { useCallback } from "react";

const distanceWidth = 6; // cube間のx軸間隔
const distanceHeight = 8; // cube間のy軸間隔

export const useCubePosition = () => {
  const getCubeGroupPosition = useCallback(
    (index: number, cubesNum: number, maxCubeNumInWidth: number) => {
      const maxCubeNumInHeight = Math.ceil(cubesNum / maxCubeNumInWidth);
      const y =
        -Math.floor(index / maxCubeNumInWidth) * distanceHeight +
        ((maxCubeNumInHeight - 1) * distanceHeight) / 2;
      const x =
        Math.floor(index % maxCubeNumInWidth) * distanceWidth -
        ((maxCubeNumInWidth - 1) * distanceWidth) / 2;
      return [x, y, 0];
    },
    []
  );

  const updateCubesPosition = useCallback(
    (
      cubeGoupRef: THREE.Group,
      moveTextRef: THREE.Group,
      braketRef: THREE.Group,
      supportTextRef: THREE.Group,
      index: number,
      cubesNum: number,
      maxCubeNumInWidth: number
    ) => {
      const cubePos = getCubeGroupPosition(index, cubesNum, maxCubeNumInWidth);
      cubeGoupRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
      moveTextRef &&
        moveTextRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
      braketRef && braketRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
      supportTextRef &&
        supportTextRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
    },
    [getCubeGroupPosition]
  );

  return {
    getCubeGroupPosition,
    updateCubesPosition,
  } as const;
};
