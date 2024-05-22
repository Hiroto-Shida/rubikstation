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
        <lineDashedMaterial
          color={"#393939"}
          dashSize={1}
          gapSize={0.1}
          linewidth={1}
          scale={1.2}
        />
      </lineSegments>
    </>
  );
};

type Props = {
  cubeGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  rotationGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  status?: string;
  cubesPosition: THREE.Vector3;
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

export const CubesPresenter = ({
  cubeGroupRef,
  rotationGroupRef,
  status = "default",
  cubesPosition = new THREE.Vector3(0, 0, 0),
}: Props) => {
  return (
    <>
      <group ref={cubeGroupRef} position={cubesPosition}>
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
      <group ref={rotationGroupRef}></group>
    </>
  );
};
