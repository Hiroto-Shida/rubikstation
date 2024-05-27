import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import { Cubes } from "../Cubes/container";
import { ComponentProps } from "react";
import { RubicModel } from "./container";

type Props = ComponentProps<typeof RubicModel>;

export const RubicModelPresenter = ({
  moveChar,
  axis = true,
  cameraControls = true,
  status,
  canvasStyle = { width: "150px", height: "150px" },
  canvasCamera = { position: [3, 2.8, 3] },
}: Props) => {
  return (
    <>
      <Canvas
        camera={canvasCamera}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#bdbdbd"));
        }}
        gl={{ antialias: true }}
        style={canvasStyle}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Cubes moveChar={moveChar} status={status} />

        {cameraControls && <CameraControls />}
        {/* X:red, Y:green, Z:blue. args:長さ */}
        {axis && <axesHelper args={[5]} />}
      </Canvas>
    </>
  );
};
