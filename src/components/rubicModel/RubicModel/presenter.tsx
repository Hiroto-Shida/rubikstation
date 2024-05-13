import { Canvas } from "@react-three/fiber";
import { CameraControls, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "@mui/material";
import { Cubes } from "../Cubes/container";
import { color } from "three/examples/jsm/nodes/Nodes.js";

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

          {/* <Text
            position={[3, 1, 3]}
            rotation={[0, Math.PI / 4, 0]}
            scale={0.5}
            color={new THREE.Color("#ff0000")}
          >
            {`-->`}
          </Text> */}

          {/* <Html as="div" position={[2, 1, 3]} style={{ color: "#ffffff" }}>
            <h1>hello</h1>
            <p>world</p>
          </Html> */}

          <CameraControls />
          {/* X:red, Y:green, Z:blue. args:長さ */}
          <axesHelper args={[5]} />
        </Canvas>
      </Box>
      {/* <Typography>{props.moveChar}</Typography> */}
    </>
  );
};
