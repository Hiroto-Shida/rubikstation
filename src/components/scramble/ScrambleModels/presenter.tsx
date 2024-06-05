import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { ComponentProps, useRef } from "react";
import { useResize } from "../../../hooks/useResize";
import { ScrambleModels } from "./container";

type Props = ComponentProps<typeof ScrambleModels>;

export const ScrambleModelsPresenter = ({
  status,
  supportTextList,
  scrambleList,
  isKeepRotate,
}: Props) => {
  const needBraketIndex: { start: number[]; end: number[] } = {
    start: [],
    end: [],
  };
  let braketNum = 0;
  const noBracketScrambleList: string[] = [];
  scrambleList.forEach((moveChar, index) => {
    if (moveChar === "(") {
      needBraketIndex.start.push(index - braketNum);
      braketNum += 1;
    } else if (moveChar === ")") {
      needBraketIndex.end.push(index - 1 - braketNum);
      braketNum += 1;
    } else {
      noBracketScrambleList.push(moveChar);
    }
  });

  const canvasDivRef = useRef<HTMLDivElement>(null);
  const canvasWindowSize = useResize(
    canvasDivRef,
    noBracketScrambleList.length
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
                    // isHighlightRotateGroup={!isKeepRotate}
                  />
                </React.Fragment>
              );
            })
          : noBracketScrambleList.map((moveChar, index) => {
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
                  />
                </React.Fragment>
              );
            })}
      </Canvas>
    </div>
  );
};
