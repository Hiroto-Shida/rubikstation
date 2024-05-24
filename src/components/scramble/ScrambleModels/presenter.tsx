import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Cubes } from "../../rubicModel/Cubes/container";
import React from "react";
import { Html } from "@react-three/drei";

const MoveText = ({
  moveChar,
  cubeGroupPosition,
}: {
  moveChar: string;
  cubeGroupPosition: [number, number, number];
}) => {
  const regexMoveChar = /.2/;
  const shadowColor = regexMoveChar.test(moveChar) ? "#cc0000" : "#000000";

  return (
    <>
      {regexMoveChar.test(moveChar) && (
        <Html
          as="div"
          position={
            new THREE.Vector3(cubeGroupPosition[0], cubeGroupPosition[1] + 1, cubeGroupPosition[2])
          }
          style={{
            color: "#ffffff",
            fontSize: "10px",
            textShadow: `2px 2px 0 ${shadowColor}, -2px -2px 0 ${shadowColor}, -2px 2px 0 ${shadowColor}, 2px -2px 0 ${shadowColor}`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>180°</h1>
        </Html>
      )}
      <Html
        as="div"
        position={
          new THREE.Vector3(cubeGroupPosition[0], cubeGroupPosition[1] - 3.3, cubeGroupPosition[2])
        }
        style={{
          color: "#ffffff",
          textShadow: `2px 2px 0 ${shadowColor}, -2px -2px 0 ${shadowColor}, -2px 2px 0 ${shadowColor}, 2px -2px 0 ${shadowColor}`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>{moveChar}</h1>
      </Html>
    </>
  );
};

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleModelsPresenter = ({ isDisplay, scrambleList }: Props) => {
  const maxCubeInWidth = 7;
  const maxCubeInHeight = Math.ceil(scrambleList.length / maxCubeInWidth);
  const distanceWidth = 6;
  const distanceHeight = 8;
  const oneCubeNeedCanvasWidth = 120; // zoom=20,distance=6の時は120がちょうど良い
  const oneCubeNeedCanvasHeight = 170; // zoom=20,distance=6の時は120がちょうど良い

  return (
    isDisplay &&
    scrambleList.length && (
      <>
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
          style={{
            width: `${oneCubeNeedCanvasWidth * maxCubeInWidth}px`,
            height: `${oneCubeNeedCanvasHeight * maxCubeInHeight}px`,
          }}
        >
          {scrambleList.map((moveChar, index) => {
            const y =
              -Math.floor(index / maxCubeInWidth) * distanceHeight +
              ((maxCubeInHeight - 1) * distanceHeight) / 2;
            const x =
              Math.floor(index % maxCubeInWidth) * distanceWidth -
              ((maxCubeInWidth - 1) * distanceWidth) / 2;
            return (
              <React.Fragment key={index}>
                <Cubes moveChar={moveChar} cubeGroupPosition={[x, y, 0]} />
                <MoveText moveChar={moveChar} cubeGroupPosition={[x, y, 0]} />
              </React.Fragment>
            );
          })}
        </Canvas>
      </>
    )
  );
};
