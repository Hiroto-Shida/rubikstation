import { Canvas } from "@react-three/fiber";
import { CameraControls, Html } from "@react-three/drei";
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
  const regexMoveChar = /.2/;
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

        {moveChar && regexMoveChar.test(moveChar) && (
          <Html
            as="div"
            position={[2, 2.7, 2]}
            style={{
              color: "#ffffff",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h1>180°</h1>
          </Html>
        )}

        {cameraControls && <CameraControls />}
        {/* X:red, Y:green, Z:blue. args:長さ */}
        {axis && <axesHelper args={[5]} />}
      </Canvas>
    </>
  );
};
