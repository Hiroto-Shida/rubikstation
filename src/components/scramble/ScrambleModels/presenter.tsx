import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { useRef } from "react";
import { useResize } from "../../../hooks/useResize";

type Props = {
  scrambleList: string[];
};

export const ScrambleModelsPresenter = ({ scrambleList }: Props) => {
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
        {scrambleList.map((moveChar, index) => {
          return (
            <React.Fragment key={index}>
              <Cubes
                moveChar={moveChar}
                canvasWindowSize={canvasWindowSize}
                cubesNum={scrambleList.length}
                index={index}
              />
            </React.Fragment>
          );
        })}
      </Canvas>
    </div>
  );
};
