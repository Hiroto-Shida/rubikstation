import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, {
  ComponentProps,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { CanvasInfo, useResize } from "../../../hooks/useResize";
import { ScrambleModels } from "./container";

type Props = ComponentProps<typeof ScrambleModels>;

export const ScrambleModelsPresenter = ({
  status,
  supportTextList,
  scrambleList,
  isKeepRotate,
  lookfromRight,
}: Props) => {
  const needBraketIndex: { start: number[]; end: number[] } = {
    start: [],
    end: [],
  };
  let shortenNum = 0;
  const lookChangeIndexList: number[] = [];
  const noBracketScrambleList: string[] = [];
  scrambleList.forEach((moveChar, index) => {
    if (moveChar === "(") {
      needBraketIndex.start.push(index - shortenNum);
      shortenNum += 1;
    } else if (moveChar === ")") {
      needBraketIndex.end.push(index - 1 - shortenNum);
      shortenNum += 1;
    } else if (moveChar === "changelookFrom") {
      lookChangeIndexList.push(index - shortenNum);
      shortenNum += 1;
    } else {
      noBracketScrambleList.push(moveChar);
    }
  });

  const canvasDivRef = useRef<HTMLDivElement>(null);
  const { canvasInfo } = useResize(canvasDivRef, noBracketScrambleList.length);
  const lookfromRightRef = useRef<boolean>(lookfromRight ?? true);

  const changeLookFrom = useCallback(
    (index: number, lookChangeIndexList: number[]) => {
      if (lookChangeIndexList.includes(index)) {
        lookfromRightRef.current = !lookfromRightRef.current;
      }
    },
    []
  );

  // リサイズ時のzoom調整
  const CameraController = ({
    canvasInfo,
  }: {
    canvasInfo: MutableRefObject<CanvasInfo>;
  }) => {
    const zoom = canvasInfo.current.zoom ?? 20;
    const { camera } = useThree();
    useEffect(() => {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }, [zoom, camera]);
    return null;
  };

  return (
    <div ref={canvasDivRef} style={{ width: "100%" }}>
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 10],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#bdbdbd"));
        }}
        gl={{ antialias: true }}
      >
        <CameraController canvasInfo={canvasInfo} />
        {isKeepRotate
          ? noBracketScrambleList.map((_, index) => {
              changeLookFrom(index, lookChangeIndexList);
              return (
                <React.Fragment key={index}>
                  <Cubes
                    status={status}
                    moveCharList={noBracketScrambleList.slice(0, index + 1)}
                    canvasInfo={canvasInfo}
                    cubesNum={noBracketScrambleList.length}
                    index={index}
                    supportTextList={supportTextList}
                    needBraketIndex={needBraketIndex}
                    lookfromRight={lookfromRightRef.current}
                  />
                </React.Fragment>
              );
            })
          : noBracketScrambleList.map((moveChar, index) => {
              changeLookFrom(index, lookChangeIndexList);
              return (
                <React.Fragment key={index}>
                  <Cubes
                    moveCharList={[moveChar]}
                    canvasInfo={canvasInfo}
                    cubesNum={noBracketScrambleList.length}
                    index={index}
                    supportTextList={supportTextList}
                    needBraketIndex={needBraketIndex}
                    isHighlightRotateGroup={true}
                    lookfromRight={lookfromRightRef.current}
                  />
                </React.Fragment>
              );
            })}
      </Canvas>
    </div>
  );
};
