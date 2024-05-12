import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Typography } from "@mui/material";
import { SURFACE_COLORS } from "../surfaceColors";
import { Axis, Limit, Multiplier, ROTATE_DIRECTION } from "../rotateDirection";

const Cube = ({
  position,
  colorList,
}: {
  position: [number, number, number];
  colorList: string[];
}) => {
  const colorsDic: { [key: string]: string } = {
    green: "#188a28",
    red: "#f80208",
    yellow: "#fdde02",
    white: "#ffffff",
    orange: "#ff8005",
    blue: "#004ac3",
  }; // 6 colors for the faces

  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      {colorList.map((value, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          color={colorsDic[value]}
        />
      ))}
    </mesh>
  );
};

const Cubes = ({ moveChar }: { moveChar: string }) => {
  const cubeGroup = useRef<THREE.Group>(null!);
  const rotationGroup = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (cubeGroup.current && rotationGroup.current) {
      if (ROTATE_DIRECTION[moveChar]) {
        rotate(
          cubeGroup.current,
          rotationGroup.current,
          ROTATE_DIRECTION[moveChar][0],
          ROTATE_DIRECTION[moveChar][1],
          ROTATE_DIRECTION[moveChar][2]
        );
      } else {
        console.log(`回転記号 ${moveChar} は存在しません`);
      }
    }
  }, []);

  return (
    <>
      <group ref={cubeGroup}>
        {[...Array(3).keys()].map((x) =>
          [...Array(3).keys()].map((y) =>
            [...Array(3).keys()].map((z) => (
              <Cube
                key={`${x}${y}${z}`}
                position={[x - 1, y - 1, z - 1]}
                colorList={SURFACE_COLORS[0]}
              />
            ))
          )
        )}
      </group>
      <group ref={rotationGroup}></group>
    </>
  );
};

const resetCubeGroup = (cubeGroup: THREE.Group, rotationGroup: THREE.Group) => {
  rotationGroup.children
    .slice()
    .reverse()
    .forEach(function (c) {
      cubeGroup.attach(c);
    });
  rotationGroup.quaternion.set(0, 0, 0, 1);
};

const attachToRotationGroup = (
  cubeGroup: THREE.Group,
  rotationGroup: THREE.Group,
  axis: Axis,
  limit: Limit
) => {
  cubeGroup.children
    .slice()
    .reverse()
    .filter(function (c) {
      return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
    })
    .forEach(function (c) {
      rotationGroup.attach(c);
    });
};

const rotateGroup = (
  rotationGroup: THREE.Group,
  axis: Axis,
  multiplier: Multiplier
) => {
  rotationGroup.rotation[axis] += (Math.PI / 6) * multiplier;
};

const rotate = (
  cubeGroup: THREE.Group,
  rotationGroup: THREE.Group,
  axis: Axis,
  limit: Limit,
  multiplier: Multiplier
) => {
  resetCubeGroup(cubeGroup, rotationGroup);
  attachToRotationGroup(cubeGroup, rotationGroup, axis, limit);
  rotateGroup(rotationGroup, axis, multiplier);
};

type Props = {
  moveChar: string;
};

export const RubicModelPresenter: React.FC<Props> = (props) => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Canvas
          camera={{ position: [5, 3, 5] }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#363333"));
          }}
          gl={{ antialias: true }}
          style={{ width: "400px", height: "400px" }}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} />
          <Cubes moveChar={props.moveChar} />

          <CameraControls />
          {/* X:red, Y:green, Z:blue. args:長さ */}
          <axesHelper args={[5]} />
        </Canvas>
      </Box>
      {/* <Typography>{props.moveChar}</Typography> */}
    </>
  );
};
