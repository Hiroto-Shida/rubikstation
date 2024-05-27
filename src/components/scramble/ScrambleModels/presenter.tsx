import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { useRef } from "react";
import { useResize } from "../../../hooks/useResize";

type Props = {
  scrambleList: string[];
};

export const ScrambleModelsPresenter = ({ scrambleList }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWindowSize = useResize(canvasRef, scrambleList.length);

  console.log("ScrambleModelsPresenter rendering");

  return (
    <Canvas
      ref={canvasRef}
      orthographic
      camera={{
        zoom: 20,
        position: [0, 0, 10],
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#bdbdbd"));
      }}
      gl={{ antialias: true }}
      // style={{
      //   height:
      //     !canvasRef.current || isNaN(canvasRef.current.style.height)
      //       ? "100px"
      //       : canvasRef.current.style.height,
      // }}
    >
      {scrambleList.map((moveChar, index) => {
        return (
          <React.Fragment key={index}>
            {/* <mesh>
              <boxGeometry args={[1, 1, 1]} />
            </mesh> */}
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
  );
};
