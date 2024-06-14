import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ComponentProps } from "react";
import { OllModel } from "./container";
import { OllCubes } from "../OllCubes/container";

type Props = ComponentProps<typeof OllModel>;

export const OllPresenter = ({
  status,
  canvasStyle = { width: "150px", height: "150px" },
  canvasCamera = { position: [0, 0, 3] },
}: Props) => {
  return (
    <>
      <Canvas
        camera={{ position: canvasCamera.position, zoom: 0.7 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#bdbdbd"));
        }}
        gl={{ antialias: true }}
        style={canvasStyle}
      >
        <OllCubes status={status} />

        {/* X:red, Y:green, Z:blue. args:長さ */}
      </Canvas>
    </>
  );
};
