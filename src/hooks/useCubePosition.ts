import * as THREE from "three";
import { useCallback } from "react";

export const oneCubeNeedCanvasWidth = 120; // zoom=20,distance=6の時は120がちょうど良い
export const oneCubeNeedCanvasHeight = 170; // zoom=20,distance=6の時は120がちょうど良い
const distanceWidth = 6; // cube間のx軸間隔
const distanceHeight = 8; // cube間のy軸間隔

export const useCubePosition = () => {
  const getCubeGroupPosition = useCallback(
    (index: number, cubesNum: number, canvasWidth: number) => {
      const maxCubeInWidth = Math.min(Math.floor(canvasWidth / oneCubeNeedCanvasWidth), cubesNum);
      const maxCubeInHeight = Math.ceil(cubesNum / maxCubeInWidth);
      const y =
        -Math.floor(index / maxCubeInWidth) * distanceHeight +
        ((maxCubeInHeight - 1) * distanceHeight) / 2;
      const x =
        Math.floor(index % maxCubeInWidth) * distanceWidth -
        ((maxCubeInWidth - 1) * distanceWidth) / 2;
      return [x, y, 0];
    },
    []
  );

  const updateCubesPosition = useCallback(
    (
      cubeGoupRef: THREE.Group,
      moveTextRef: THREE.Group,
      index: number,
      cubesNum: number,
      canvasWidth: number
    ) => {
      const cubePos = getCubeGroupPosition(index, cubesNum, canvasWidth);
      cubeGoupRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
      moveTextRef.position.set(cubePos[0], cubePos[1], cubePos[2]);
    },
    [getCubeGroupPosition]
  );

  return {
    getCubeGroupPosition,
    updateCubesPosition,
  } as const;
};
