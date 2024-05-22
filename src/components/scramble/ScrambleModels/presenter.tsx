import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  CameraControls,
  OrthographicCamera,
  PerspectiveCamera,
  useFBO,
} from "@react-three/drei";
import { Cubes } from "../../rubicModel/Cubes/container";
import { useEffect, useRef } from "react";

const Scene = ({
  camera1Ref,
  camera2Ref,
}: {
  camera1Ref: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  camera2Ref: React.MutableRefObject<THREE.PerspectiveCamera | null>;
}) => {
  const fbo1 = useFBO(1024, 1024);
  const fbo2 = useFBO(1024, 1024);
  const { scene, gl, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    if (camera1Ref.current) {
      camera1Ref.current.aspect = aspect;
      camera1Ref.current.updateProjectionMatrix();
      camera1Ref.current.position.set(2, 3, 4);
      camera1Ref.current.lookAt(0, 0, 0);
    }
    if (camera2Ref.current) {
      camera2Ref.current.aspect = aspect;
      camera2Ref.current.updateProjectionMatrix();
      camera2Ref.current.position.set(-2, 2, 2);
      camera2Ref.current.lookAt(0, 0, 0);
    }

    // Render to FBOs
    gl.setRenderTarget(fbo1);
    gl.render(scene, camera1Ref.current!);

    gl.setRenderTarget(fbo2);
    gl.render(scene, camera2Ref.current!);

    gl.setRenderTarget(null);
  }, [scene, gl, fbo1, fbo2, camera1Ref, camera2Ref, size.width, size.height]);

  return (
    <>
      <PerspectiveCamera
        ref={camera1Ref}
        // fov={50}
        // aspect={size.width / size.height}
      />
      <PerspectiveCamera ref={camera2Ref} />
      <mesh position={[0, 0, 3]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={fbo1.texture} />
      </mesh>
      <mesh position={[5, 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={fbo2.texture} />
      </mesh>
    </>
  );
};

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleModelsPresenter = ({ isDisplay, scrambleList }: Props) => {
  const axis = true;
  // const cameraControls = true;

  // const camera1Ref = useRef<THREE.PerspectiveCamera>(null);
  // const camera2Ref = useRef<THREE.PerspectiveCamera>(null);

  return (
    isDisplay &&
    scrambleList.length && (
      <>
        <Canvas
          orthographic
          camera={{
            // left: 1,
            zoom: 20,
            position: [0, 4, 10],
            // view: {
            //   enabled: true,
            //   fullWidth: 100,
            //   fullHeight: 100,
            //   offsetX: 10,
            //   offsetY: 0,
            //   width: 100,
            //   height: 100,
            // },
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#bdbdbd"));
          }}
          gl={{ antialias: true }}
          // style={{ width: "150px", height: "150px" }}
        >
          {/* <ambientLight intensity={1.5} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          {scrambleList.map((moveChar, index) => (
            <Cubes
              moveChar={moveChar}
              key={index}
              position={[index * 6, 0, 0]}
            />
          ))}
          {/* {cameraControls && <CameraControls />} */}
          {/* <OrthographicCamera
            makeDefault
            zoom={1}
            top={200}
            bottom={-200}
            left={200}
            right={-200}
            near={1}
            far={100}
            position={[0, 0, 10]}
          /> */}
          {/* <Scene camera1Ref={camera1Ref} camera2Ref={camera2Ref} /> */}
          {/* X:red, Y:green, Z:blue. args:長さ */}
          {axis && <axesHelper args={[5]} />}
        </Canvas>
      </>
    )
  );
};
