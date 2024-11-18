import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ComponentProps } from "react";
import { OllModel } from "./container";
import { OllCubes } from "../OllCubes/container";
import { useInView } from "react-intersection-observer";
import { Box } from "@mui/material";

type Props = ComponentProps<typeof OllModel>;

export const OllPresenter = ({
  status,
  canvasStyle = { width: "100px", height: "100px" },
  canvasCamera = { position: [0, 0, 3] },
}: Props) => {
  const { ref, inView } = useInView({
    rootMargin: "600px", // ref要素が現れてから N px過ぎたら
    triggerOnce: true, // 最初の一度だけ実行
  });
  return (
    <Box component="div" ref={ref}>
      {inView && (
        <Canvas
          ref={ref}
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
      )}
    </Box>
  );
};
