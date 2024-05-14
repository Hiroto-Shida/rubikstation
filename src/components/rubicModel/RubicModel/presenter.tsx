import { Canvas } from "@react-three/fiber"
import { CameraControls, Html } from "@react-three/drei"
import * as THREE from "three"
import { Cubes } from "../Cubes/container"

type Props = {
  moveChar: string
}

export const RubicModelPresenter = ({ moveChar }: Props) => {
  const regexMoveChar = /.2/
  return (
    <>
      <Canvas
        camera={{ position: [3, 2.8, 3] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#363333"))
        }}
        gl={{ antialias: true }}
        style={{ width: "150px", height: "150px" }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Cubes moveChar={moveChar} />

        {regexMoveChar.test(moveChar) && (
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

        <CameraControls />
        {/* X:red, Y:green, Z:blue. args:長さ */}
        <axesHelper args={[5]} />
      </Canvas>
    </>
  )
}
