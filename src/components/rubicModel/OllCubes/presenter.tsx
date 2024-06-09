import * as THREE from "three";
import { useEffect, useRef } from "react";
// import { DEFAULT, OllSurfaceType } from "../ollSurfaceColorList";
import { ollSurfaceColors, OllSurfaceType, RubiksColor } from "../ollSurfaceColors";

const OllCube = ({ position, status }: { position: [number, number, number]; status: string }) => {
  const colorsDic: { [key in RubiksColor]: string } = {
    green: "#188a28",
    red: "#f80208",
    yellow: "#fdde02",
    white: "#ffffff",
    orange: "#ff8005",
    blue: "#004ac3",
    black: "#524d4d",
    gray: "#777777",
  }; // 6 colors for the faces

  const cubeRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.scale.set(0.95, 0.95, 0.95);
      const boxGeometry = cubeRef.current.geometry;

      const vertices = boxGeometry.attributes.position.array;
      const skewFactor = 1.3;
      if (position[0] === 1) {
        vertices[3] += skewFactor;
        vertices[9] += skewFactor;
      }
      if (position[0] === -1) {
        vertices[12] -= skewFactor;
        vertices[18] -= skewFactor;
      }
      if (position[1] === 1) {
        vertices[25] += skewFactor;
        vertices[28] += skewFactor;
      }
      if (position[1] === -1) {
        vertices[43] -= skewFactor;
        vertices[46] -= skewFactor;
      }

      boxGeometry.attributes.position.needsUpdate = true;

      const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

      if (edgesRef.current) {
        edgesRef.current.scale.set(0.95, 0.95, 0.95);
        edgesRef.current.geometry = edgesGeometry;
        edgesRef.current.computeLineDistances();
      }
    }
  }, [position]);

  const colorSurface: OllSurfaceType = ollSurfaceColors(status);

  return (
    <>
      <group position={position}>
        <mesh ref={cubeRef}>
          <boxGeometry />
          {position[1] === 1 && (
            <meshBasicMaterial
              attach={`material-${2}`}
              color={colorsDic[colorSurface.top[position[0] + 1]]}
            />
          )}
          {position[1] === -1 && (
            <meshBasicMaterial
              attach={`material-${3}`}
              color={colorsDic[colorSurface.bottom[position[0] + 1]]}
            />
          )}
          {position[0] === -1 && (
            <>
              <meshBasicMaterial
                attach={`material-${1}`}
                color={colorsDic[colorSurface.left[position[1] + 1]]}
              />
              <meshBasicMaterial
                attach={`material-${4}`}
                color={colorsDic[colorSurface.centerLeft[position[1] + 1]]}
              />
            </>
          )}
          {position[0] === 0 && (
            <meshBasicMaterial
              attach={`material-${4}`}
              color={colorsDic[colorSurface.centerCenter[position[1] + 1]]}
            />
          )}
          {position[0] === 1 && (
            <>
              <meshBasicMaterial
                attach={`material-${0}`}
                color={colorsDic[colorSurface.right[position[1] + 1]]}
              />
              <meshBasicMaterial
                attach={`material-${4}`}
                color={colorsDic[colorSurface.centerRight[position[1] + 1]]}
              />
            </>
          )}
        </mesh>
        <lineSegments ref={edgesRef}>
          <lineDashedMaterial color={"#393939"} gapSize={0.1} />
        </lineSegments>
      </group>
    </>
  );
};

type Props = {
  status?: string;
};

export const OllCubesPresenter = ({ status = "default" }: Props) => {
  return (
    <>
      <group>
        {[...Array(3).keys()].map((x) =>
          [...Array(3).keys()].map((y) => (
            <OllCube key={`${x}${y}`} position={[x - 1, y - 1, 0]} status={status} />
          ))
        )}
      </group>
    </>
  );
};
