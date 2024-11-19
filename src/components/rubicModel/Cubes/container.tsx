import * as THREE from "three";
import { CubesPresenter } from "./presenter";
import { ROTATE_DIRECTION } from "../rotateDirection";
import { MutableRefObject, useEffect, useRef } from "react";
import { useRotateCube } from "../../../hooks/useRotateCube";
import { useFrame } from "@react-three/fiber";
import { useCubePosition } from "../../../hooks/useCubePosition";
import { CanvasInfo } from "../../../hooks/useResize";

type Props = {
  moveCharList?: string[];
  status?: string;
  canvasInfo?: MutableRefObject<CanvasInfo>;
  cubesNum?: number;
  index?: number;
  needBraketIndex?: { start: number[]; end: number[] };
  supportTextList?: string[];
  isHighlightRotateGroup?: boolean;
  isRotate?: boolean;
  lookfromRight?: boolean;
};

export const Cubes = ({
  moveCharList,
  status,
  canvasInfo,
  cubesNum = 1,
  index = 0,
  supportTextList,
  needBraketIndex = { start: [], end: [] },
  isHighlightRotateGroup = false,
  isRotate = false,
  lookfromRight = true,
}: Props) => {
  const { rotate } = useRotateCube();
  const { getCubeGroupPosition, updateCubesPosition } = useCubePosition();

  const cubeGroupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);
  const hiddenGroupRef = useRef<THREE.Group>(null!);
  const moveTextRef = useRef<THREE.Group>(null!);
  const supportTextRef = useRef<THREE.Group>(null!);
  const braketRef = useRef<THREE.Group>(null!);

  // const prevCanvasWidth = useRef<number>(0);
  const prevMaxCubeNumInWidth = useRef<number>(0);
  const isSetupCompletion = useRef<boolean>(false);

  // 矢印2本(面)分のrefを用意
  const arrowRef1 = useRef<THREE.Group>(null!);
  const arrowRef2 = useRef<THREE.Group>(null!);
  const arrowRefList = useRef<
    MutableRefObject<THREE.Group<THREE.Object3DEventMap>>[]
  >([arrowRef1, arrowRef2]);

  // リサイズ時(canvasWidth.currentが変化した時)に各キューブの位置を再調整
  useFrame(() => {
    if (
      moveCharList &&
      moveCharList.length > 0 &&
      canvasInfo &&
      prevMaxCubeNumInWidth.current != canvasInfo.current.maxCubeNumInWidth &&
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
        canvasInfo.current.maxCubeNumInWidth
      );
      prevMaxCubeNumInWidth.current = canvasInfo.current.maxCubeNumInWidth;
    }
    if (!moveCharList && cubeGroupRef.current && isRotate) {
      cubeGroupRef.current.rotation.y += 0.02;
    }
  });

  useEffect(() => {
    if (
      cubeGroupRef.current &&
      canvasInfo &&
      canvasInfo.current &&
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
        canvasInfo.current.maxCubeNumInWidth
      );
      moveCharList.forEach((moveChar, movingIndex) => {
        const regexMoveChar = /2/;
        const removedTwoMoveChar = moveChar.replace(regexMoveChar, "");
        const cubePos = getCubeGroupPosition(
          index,
          cubesNum,
          canvasInfo.current.maxCubeNumInWidth
        );
        if (ROTATE_DIRECTION[removedTwoMoveChar]) {
          rotate(
            cubeGroupRef.current,
            rotationGroupRef.current,
            hiddenGroupRef.current,
            cubePos,
            ROTATE_DIRECTION[removedTwoMoveChar],
            moveChar.match(/2/) ? true : false,
            movingIndex !== moveCharList.length - 1,
            isHighlightRotateGroup,
            arrowRefList.current
          );
        }
      });
      if (lookfromRight) {
        cubeGroupRef.current.rotation.set(Math.PI / 6, -Math.PI / 11, 0);
      } else {
        cubeGroupRef.current.rotation.set(Math.PI / 6, Math.PI / 11, 0);
      }
      isSetupCompletion.current = true; // セットアップ完了
    }
  }, [
    canvasInfo,
    cubesNum,
    getCubeGroupPosition,
    index,
    isHighlightRotateGroup,
    lookfromRight,
    moveCharList,
    rotate,
    updateCubesPosition,
  ]);

  const supportText = supportTextList
    ? supportTextList[needBraketIndex?.start.indexOf(index)] ??
      supportTextList[0]
    : undefined;

  return (
    <CubesPresenter
      cubeGroupRef={cubeGroupRef}
      moveTextRef={moveTextRef}
      moveChar={
        moveCharList && moveCharList.length > 0
          ? moveCharList[moveCharList.length - 1]
          : undefined
      }
      canvasInfo={canvasInfo}
      rotationGroupRef={rotationGroupRef}
      hiddenGroupRef={hiddenGroupRef}
      braketRef={braketRef}
      supportText={
        needBraketIndex?.start.includes(index) ? supportText : undefined
      }
      supportTextRef={supportTextRef}
      braketNeed={{
        start: needBraketIndex?.start.includes(index),
        end: needBraketIndex?.end.includes(index),
      }}
      status={status}
      arrowRefList={arrowRefList.current}
    />
  );
};
