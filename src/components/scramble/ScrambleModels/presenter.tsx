import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { useRef } from "react";
import { useResize } from "../../../hooks/useResize";
import { CameraControls } from "@react-three/drei";

type Props = {
  scrambleList: string[];
  isKeepRotate: boolean;
};

export const ScrambleModelsPresenter = ({ scrambleList, isKeepRotate }: Props) => {
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const canvasWindowSize = useResize(canvasDivRef, scrambleList.length);

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
          ? scrambleList.map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <Cubes
                    moveCharList={scrambleList.slice(0, index + 1)}
                    canvasWindowSize={canvasWindowSize}
                    cubesNum={scrambleList.length}
                    index={index}
                    // isHighlightRotateGroup={!isKeepRotate}
                  />
                </React.Fragment>
              );
            })
          : scrambleList.map((moveChar, index) => {
              return (
                <React.Fragment key={index}>
                  <Cubes
                    moveCharList={[moveChar]}
                    canvasWindowSize={canvasWindowSize}
                    cubesNum={scrambleList.length}
                    index={index}
                    isHighlightRotateGroup={true}
                  />
                </React.Fragment>
              );
            })}
        <CameraControls />
      </Canvas>
    </div>
  );
};
