import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "@mui/material";
import { Cubes } from "../Cubes/container";

export const RubicModelPresenter: React.FC = () => {
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
          <Cubes />

          <CameraControls />
          {/* X:red, Y:green, Z:blue. args:長さ */}
          <axesHelper args={[5]} />
        </Canvas>
      </Box>
      {/* <Typography>{props.moveChar}</Typography> */}
    </>
  );
};
