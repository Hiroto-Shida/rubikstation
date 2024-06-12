import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { ComponentProps, useCallback, useRef } from "react";
import { useResize } from "../../../hooks/useResize";
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
  const canvasWindowSize = useResize(
    canvasDivRef,
    noBracketScrambleList.length
  );
  const lookfromRightRef = useRef<boolean>(lookfromRight ?? true);

  const changeLookFrom = useCallback(
    (index: number, lookChangeIndexList: number[]) => {
      if (lookChangeIndexList.includes(index)) {
        lookfromRightRef.current = !lookfromRightRef.current;
      }
    },
    []
  );

  return (
    <div ref={canvasDivRef} style={{ width: "100%" }}>
      <Canvas
        orthographic
        camera={{
          zoom: 20,
          position: [0, 0, 10],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#bdbdbd"));
        }}
        gl={{ antialias: true }}
      >
        {isKeepRotate
          ? noBracketScrambleList.map((_, index) => {
              changeLookFrom(index, lookChangeIndexList);
              return (
                <React.Fragment key={index}>
                  <Cubes
                    status={status}
                    moveCharList={noBracketScrambleList.slice(0, index + 1)}
                    canvasWindowSize={canvasWindowSize}
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
                    canvasWindowSize={canvasWindowSize}
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
