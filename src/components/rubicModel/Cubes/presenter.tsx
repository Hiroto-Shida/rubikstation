import * as THREE from "three";
import { BLACK, DEFAULT, surfaceColorList } from "../surfaceColors";
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
  // const oneCubeGroupRef = useRef<THREE.Group>(null)

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
      <group position={position}>
        <mesh ref={cubeRef} geometry={roundedBoxGeometry}>
          {colorList.map((value, index) => (
            <meshBasicMaterial key={index} attach={`material-${index}`} color={colorsDic[value]} />
          ))}
        </mesh>
        <lineSegments ref={edgesRef}>
          <lineDashedMaterial color={"#393939"} gapSize={0.1} />
        </lineSegments>
      </group>
    </>
  );
};

type MoveTextProps = {
  moveChar: string;
};

const MoveText = ({ moveChar }: MoveTextProps) => {
  const regexMoveChar = /.2/;
  const shadowColor = regexMoveChar.test(moveChar) ? "#cc0000" : "#000000";

  return (
    <>
      {regexMoveChar.test(moveChar) && (
        <Html
          as="div"
          position={new THREE.Vector3(0, 1, 0)}
          style={{
            color: "#ffffff",
            fontSize: "10px",
            textShadow: `2px 2px 0 ${shadowColor}, -2px -2px 0 ${shadowColor}, -2px 2px 0 ${shadowColor}, 2px -2px 0 ${shadowColor}`,
            transform: "translate(-50%, -50%)",
            // zIndex: 0,
          }}
          // zIndexRange={[16777271, 0]}
        >
          <h1>180°</h1>
        </Html>
      )}
      <Html
        as="div"
        position={new THREE.Vector3(0, -3.3, 0)}
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
  const colorDic: { [key: number]: string[] | undefined } | undefined = surfaceColorList(status);
  if (!colorDic) {
    return DEFAULT;
  }
  if (z + y * 3 + x * 9 in colorDic) {
    const colorList = colorDic[z + y * 3 + x * 9];
    if (colorList) {
      return colorList;
    }
  }
  return BLACK;
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
          <MoveText moveChar={moveChar} />
        </group>
      )}
      <group ref={rotationGroupRef}></group>
    </>
  );
};
