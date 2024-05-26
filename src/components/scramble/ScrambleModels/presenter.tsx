import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React, { useRef } from "react";
import { useResize } from "../../../hooks/useResize";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleModelsPresenter = ({ isDisplay, scrambleList }: Props) => {
  // const oneCubeNeedCanvasWidth = 120; // zoom=20,distance=6の時は120がちょうど良い
  // const oneCubeNeedCanvasHeight = 170; // zoom=20,distance=6の時は120がちょうど良い

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = useResize(canvasRef);

  // const maxCubeInWidth = canvasWidth.current / oneCubeNeedCanvasWidth;

  // const maxCubeInHeight = Math.ceil(scrambleList.length / maxCubeInWidth);
  // const distanceWidth = 6;
  // const distanceHeight = 8;

  // const maxCubeInWidth = 7;
  // const maxCubeInHeight = Math.ceil(scrambleList.length / maxCubeInWidth);
  // const distanceWidth = 6;
  // const distanceHeight = 8;
  // const oneCubeNeedCanvasWidth = 120; // zoom=20,distance=6の時は120がちょうど良い
  // const oneCubeNeedCanvasHeight = 170; // zoom=20,distance=6の時は120がちょうど良い

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
      style={{
        // width: `${canvasWidth}px`,
        // width: `${oneCubeNeedCanvasWidth * maxCubeInWidth}px`,
        // height: `${oneCubeNeedCanvasHeight * maxCubeInHeight}px`,
        // width: `100%`,
        height: `800px`,
      }}
    >
      {scrambleList.map((moveChar, index) => {
        // const y =
        //   -Math.floor(index / maxCubeInWidth) * distanceHeight +
        //   ((maxCubeInHeight - 1) * distanceHeight) / 2;
        // const x =
        //   Math.floor(index % maxCubeInWidth) * distanceWidth -
        //   ((maxCubeInWidth - 1) * distanceWidth) / 2;
        return (
          <React.Fragment key={index}>
            <Cubes
              moveChar={moveChar}
              canvasWidth={canvasWidth}
              cubesNum={scrambleList.length}
              index={index}
            />
            {/* <MoveText
              moveChar={moveChar}
              canvasWidth={canvasWidth}
              cubesNum={scrambleList.length}
              index={index}
            /> */}
          </React.Fragment>
        );
      })}
      <axesHelper args={[5]} />
    </Canvas>
  );
};
