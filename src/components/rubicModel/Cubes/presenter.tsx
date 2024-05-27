import * as THREE from "three";
import {
  DEFAULT_SURFACE_COLORS,
  F1L_SURFACE_COLORS,
  F2L_LEFT_SURFACE_COLORS,
  F2L_RIGHT_SURFACE_COLORS,
  F2L_SURFACE_COLORS,
} from "../surfaceColors";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Html } from "@react-three/drei";

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
    black: "#524d4d",
  }; // 6 colors for the faces

  const cubeRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useEffect(() => {
    if (cubeRef.current) {
      const boxGeometry = cubeRef.current.geometry;
      const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

      if (edgesRef.current) {
        edgesRef.current.geometry = edgesGeometry;
        edgesRef.current.computeLineDistances();
      }
    }
  }, []);

  const roundedBoxGeometry = useMemo(() => {
    return new RoundedBoxGeometry(1, 1, 1, 1, 0.1);
  }, []);

  return (
    <>
      <mesh position={position} ref={cubeRef} geometry={roundedBoxGeometry}>
        {colorList.map((value, index) => (
          <meshBasicMaterial
            key={index}
            attach={`material-${index}`}
            color={colorsDic[value]}
          />
        ))}
      </mesh>
      <lineSegments position={position} ref={edgesRef}>
        <lineDashedMaterial color={"#393939"} gapSize={0.1} />
      </lineSegments>
    </>
  );
};

type MoveTextProps = {
  moveTextRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  moveChar: string;
};

const MoveText = ({ moveTextRef, moveChar }: MoveTextProps) => {
  const regexMoveChar = /.2/;
  const shadowColor = regexMoveChar.test(moveChar) ? "#cc0000" : "#000000";

  return (
    <>
      {/* {regexMoveChar.test(moveChar) && (
        <Html
          as="div"
          // position={
          //   new THREE.Vector3(cubeGroupPosition[0], cubeGroupPosition[1] + 1, cubeGroupPosition[2])
          // }
          style={{
            color: "#ffffff",
            fontSize: "10px",
            textShadow: `2px 2px 0 ${shadowColor}, -2px -2px 0 ${shadowColor}, -2px 2px 0 ${shadowColor}, 2px -2px 0 ${shadowColor}`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>180°</h1>
        </Html>
      )} */}
      <Html
        as="div"
        // position={
        //   new THREE.Vector3(cubeGroupPosition[0], cubeGroupPosition[1] - 3.3, cubeGroupPosition[2])
        // }
        style={{
          color: "#ffffff",
          textShadow: `2px 2px 0 ${shadowColor}, -2px -2px 0 ${shadowColor}, -2px 2px 0 ${shadowColor}, 2px -2px 0 ${shadowColor}`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>{moveChar}</h1>
      </Html>
    </>
  );
};

const model = (status: string, z: number, y: number, x: number) => {
  switch (status) {
    case "F1L":
      return F1L_SURFACE_COLORS[z + y * 3 + x * 9];
    case "F2L":
      return F2L_SURFACE_COLORS[z + y * 3 + x * 9];
    case "F2L_LEFT":
      return F2L_LEFT_SURFACE_COLORS[z + y * 3 + x * 9];
    case "F2L_RIGHT":
      return F2L_RIGHT_SURFACE_COLORS[z + y * 3 + x * 9];
    default:
      return DEFAULT_SURFACE_COLORS[0];
  }
};

type Props = {
  cubeGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  moveTextRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  moveChar?: string;
  rotationGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  status?: string;
};

export const CubesPresenter = ({
  cubeGroupRef,
  moveTextRef,
  moveChar,
  rotationGroupRef,
  status = "default",
}: Props) => {
  return (
    <>
      <group ref={cubeGroupRef}>
        {[...Array(3).keys()].map((x) =>
          [...Array(3).keys()].map((y) =>
            [...Array(3).keys()].map((z) => (
              <Cube
                key={`${x}${y}${z}`}
                position={[x - 1, y - 1, z - 1]}
                colorList={model(status, z, y, x)}
              />
            ))
          )
        )}
      </group>
      {moveChar && (
        <group ref={moveTextRef}>
          <MoveText moveTextRef={moveTextRef} moveChar={moveChar} />
        </group>
      )}
      <group ref={rotationGroupRef}></group>
    </>
  );
};
