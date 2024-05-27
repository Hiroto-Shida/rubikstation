import * as THREE from "three";
import { CubesPresenter } from "./presenter";
import { ROTATE_DIRECTION } from "../rotateDirection";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useRotateCube } from "../../../hooks/useRotateCube";
import { useFrame } from "@react-three/fiber";
import { useCubePosition } from "../../../hooks/useCubePosition";

type Props = {
  moveChar?: string;
  status?: string;
  canvasWidth: MutableRefObject<number>;
  cubesNum: number;
  index: number;
};

// const oneCubeNeedCanvasWidth = 120; // zoom=20,distance=6の時は120がちょうど良い
// const oneCubeNeedCanvasHeight = 170; // zoom=20,distance=6の時は120がちょうど良い
// const distanceWidth = 6; // cube間のx軸間隔
// const distanceHeight = 8; // cube間のy軸間隔

export const Cubes = ({
  moveChar,
  status,
  canvasWidth,
  cubesNum,
  index,
}: Props) => {
  const { rotate } = useRotateCube();
  const { getCubeGroupPosition, updateCubesPosition } = useCubePosition();

  const cubeGroupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);
  const moveTextRef = useRef<THREE.Group>(null!);

  const prevCanvasWidth = useRef<number>(0);
  const isSetupCompletion = useRef<boolean>(false);

  // リサイズ時(canvasWidth.currentが変化した時)に各キューブの位置を再調整
  useFrame(() => {
    if (
      prevCanvasWidth.current != canvasWidth.current &&
      cubeGroupRef.current &&
      moveTextRef.current &&
      isSetupCompletion.current
    ) {
      updateCubesPosition(
        cubeGroupRef.current,
        moveTextRef.current,
        index,
        cubesNum,
        canvasWidth.current
      );
      prevCanvasWidth.current = canvasWidth.current;
    }
  });

  useEffect(() => {
    if (cubeGroupRef.current && canvasWidth.current && moveChar) {
      const regexMoveChar = /2/;
      const removedTwoMoveChar = moveChar.replace(regexMoveChar, "");
      const cubePos = getCubeGroupPosition(
        index,
        cubesNum,
        canvasWidth.current
      );
      if (ROTATE_DIRECTION[removedTwoMoveChar]) {
        rotate(
          cubeGroupRef.current,
          rotationGroupRef.current,
          cubePos,
          ROTATE_DIRECTION[removedTwoMoveChar][0],
          ROTATE_DIRECTION[removedTwoMoveChar][1],
          ROTATE_DIRECTION[removedTwoMoveChar][2]
        );
      } else {
        console.log(`回転記号 ${moveChar} は存在しません`);
      }
      cubeGroupRef.current.rotation.set(Math.PI / 5, -Math.PI / 4, 0);
      isSetupCompletion.current = true; // セットアップ完了
    }
  }, [canvasWidth, cubesNum, getCubeGroupPosition, index, moveChar, rotate]);

  return (
    <CubesPresenter
      cubeGroupRef={cubeGroupRef}
      moveTextRef={moveTextRef}
      moveChar={moveChar}
      rotationGroupRef={rotationGroupRef}
      status={status}
    />
  );
};
