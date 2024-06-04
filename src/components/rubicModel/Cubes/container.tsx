import * as THREE from "three";
import { CubesPresenter } from "./presenter";
import { ROTATE_DIRECTION } from "../rotateDirection";
import { MutableRefObject, useEffect, useRef } from "react";
import { useRotateCube } from "../../../hooks/useRotateCube";
import { useFrame } from "@react-three/fiber";
import { useCubePosition } from "../../../hooks/useCubePosition";
import { CanvasWindowSize } from "../../../hooks/useResize";

type Props = {
  moveCharList?: string[];
  status?: string;
  canvasWindowSize?: MutableRefObject<CanvasWindowSize>;
  cubesNum?: number;
  index?: number;
  needBraketIndex: { start: number[]; end: number[] };
  supportText?: string;
  isHighlightRotateGroup?: boolean;
  isRotate?: boolean;
};

export const Cubes = ({
  moveCharList,
  status,
  canvasWindowSize,
  cubesNum = 1,
  index = 0,
  supportText,
  needBraketIndex,
  isHighlightRotateGroup = false,
  isRotate = false,
}: Props) => {
  const { rotate } = useRotateCube();
  const { getCubeGroupPosition, updateCubesPosition } = useCubePosition();

  const cubeGroupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);
  const moveTextRef = useRef<THREE.Group>(null!);
  const supportTextRef = useRef<THREE.Group>(null!);
  const braketRef = useRef<THREE.Group>(null!);

  const prevCanvasWidth = useRef<number>(0);
  const isSetupCompletion = useRef<boolean>(false);

  // リサイズ時(canvasWidth.currentが変化した時)に各キューブの位置を再調整
  useFrame(() => {
    if (
      moveCharList &&
      moveCharList.length > 0 &&
      canvasWindowSize &&
      prevCanvasWidth.current != canvasWindowSize.current.width &&
      cubeGroupRef.current &&
      isSetupCompletion.current
    ) {
      updateCubesPosition(
        cubeGroupRef.current,
        moveTextRef.current,
        braketRef.current,
        supportTextRef.current,
        index,
        cubesNum,
        canvasWindowSize.current.width
      );
      prevCanvasWidth.current = canvasWindowSize.current.width;
    }
    if (!moveCharList && cubeGroupRef.current && isRotate) {
      cubeGroupRef.current.rotation.y += 0.02;
    }
  });

  useEffect(() => {
    if (
      cubeGroupRef.current &&
      canvasWindowSize &&
      canvasWindowSize.current &&
      moveCharList &&
      moveCharList.length > 0
    ) {
      updateCubesPosition(
        cubeGroupRef.current,
        moveTextRef.current,
        braketRef.current,
        supportTextRef.current,
        index,
        cubesNum,
        canvasWindowSize.current.width
      );
      moveCharList.forEach((moveChar, movingIndex) => {
        // console.log(moveChar);
        const regexMoveChar = /2/;
        const removedTwoMoveChar = moveChar.replace(regexMoveChar, "");
        const cubePos = getCubeGroupPosition(index, cubesNum, canvasWindowSize.current.width);
        if (ROTATE_DIRECTION[removedTwoMoveChar]) {
          rotate(
            cubeGroupRef.current,
            rotationGroupRef.current,
            cubePos,
            ROTATE_DIRECTION[removedTwoMoveChar],
            moveChar.match(/2/) ? true : false,
            movingIndex !== moveCharList.length - 1,
            isHighlightRotateGroup
          );
        }
      });
      cubeGroupRef.current.rotation.set(Math.PI / 5, -Math.PI / 4, 0);
      isSetupCompletion.current = true; // セットアップ完了
    }
  }, [
    canvasWindowSize,
    cubesNum,
    getCubeGroupPosition,
    index,
    isHighlightRotateGroup,
    moveCharList,
    rotate,
    updateCubesPosition,
  ]);

  return (
    <CubesPresenter
      cubeGroupRef={cubeGroupRef}
      moveTextRef={moveTextRef}
      moveChar={
        moveCharList && moveCharList.length > 0 ? moveCharList[moveCharList.length - 1] : undefined
      }
      rotationGroupRef={rotationGroupRef}
      braketRef={braketRef}
      supportText={needBraketIndex?.start.includes(index) ? supportText : undefined}
      supportTextRef={supportTextRef}
      braketNeed={{
        start: needBraketIndex?.start.includes(index),
        end: needBraketIndex?.end.includes(index),
      }}
      status={status}
    />
  );
};
