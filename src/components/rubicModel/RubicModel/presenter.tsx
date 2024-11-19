import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Cubes } from "../Cubes/container";
import { ComponentProps } from "react";
import { RubicModel } from "./container";

type Props = ComponentProps<typeof RubicModel>;

export const RubicModelPresenter = ({
  orthographic = false,
  axis = true,
  cameraControls = true,
  status,
  canvasStyle = {
    maxWidth: "150px",
    maxHeight: "150px",
    width: "100%",
    height: "100%",
    aspectRatio: "1",
  },
  canvasCamera = { position: [3, 2.8, 3] },
  isRotate,
}: Props) => {
  return (
    <Canvas
      orthographic={orthographic ? true : false}
      camera={{
        zoom: orthographic ? 30 : 0.7,
        position: orthographic ? [3, 3, 10] : canvasCamera.position,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#bdbdbd"));
      }}
      gl={{ antialias: true }}
      style={canvasStyle}
    >
      <Cubes status={status} isRotate={isRotate} />

      {cameraControls && <OrbitControls enableZoom={false} />}
      {/* X:red, Y:green, Z:blue. args:長さ */}
      {axis && <axesHelper args={[5]} />}
    </Canvas>
  );
};
