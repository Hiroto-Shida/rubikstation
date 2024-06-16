import * as THREE from "three";
import { BLACK, surfaceColorList } from "../surfaceColors";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Html } from "@react-three/drei";
import { useTheme } from "@mui/material";

const Cube = ({
  position,
  colorList,
}: {
  position: [number, number, number];
  colorList: string[];
}) => {
  const theme = useTheme();
  const colorsDic: { [key: string]: string } = {
    green: theme.palette.themeRubik.green,
    red: theme.palette.themeRubik.red,
    yellow: theme.palette.themeRubik.yellow,
    white: theme.palette.themeRubik.white,
    orange: theme.palette.themeRubik.orange,
    blue: theme.palette.themeRubik.blue,
    black: theme.palette.themeRubik.black,
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
            <meshBasicMaterial
              key={index}
              attach={`material-${index}`}
              color={colorsDic[value]}
            />
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
  const shadowColor = regexMoveChar.test(moveChar)
    ? "#cc0000"
    : moveChar.includes("y")
    ? "#00aa00"
    : "#000000";

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

const Bracket = ({ start, end }: { start?: boolean; end?: boolean }) => {
  const direction = start ? -1 : end ? 1 : 1;
  const blacketColor = "#353535";
  return (
    <>
      <mesh position={[direction * 2.7, 0, 0]}>
        <boxGeometry args={[0.3, 6, 1]} />
        <meshBasicMaterial color={blacketColor} />
      </mesh>
      <mesh position={[direction * 2.7 - direction * 0.25, 3, 0]}>
        <boxGeometry args={[0.8, 0.3, 1]} />
        <meshBasicMaterial color={blacketColor} />
      </mesh>
      <mesh position={[direction * 2.7 - direction * 0.25, -3, 0]}>
        <boxGeometry args={[0.8, 0.3, 1]} />
        <meshBasicMaterial color={blacketColor} />
      </mesh>
    </>
  );
};

const SupportText = ({ supportText }: { supportText: string }) => {
  return (
    <Html
      as="div"
      position={new THREE.Vector3(-1.7, 5, 0)}
      style={{
        color: "#000000",
        fontWeight: "bold",
        width: "200px",
        textAlign: "left",
      }}
    >
      <h4>
        {supportText.split(",").map((text, index) => (
          <div key={index} style={{ lineHeight: 1 }}>
            {text}
          </div>
        ))}
      </h4>
    </Html>
  );
};

const model = (status: string, z: number, y: number, x: number) => {
  const colorDic: { [key: number]: string[] | undefined } =
    surfaceColorList(status);
  // if (!colorDic) {
  //   return DEFAULT;
  // }
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
  braketRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  supportText: string | undefined;
  supportTextRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  braketNeed: { start: boolean; end: boolean };
  status?: string;
};

export const CubesPresenter = ({
  cubeGroupRef,
  moveTextRef,
  moveChar,
  rotationGroupRef,
  braketRef,
  supportText,
  supportTextRef,
  braketNeed,
  status = "default",
}: Props) => {
  return (
    <>
      {braketNeed.start && (
        <group ref={braketRef}>
          <Bracket start />
        </group>
      )}
      {braketNeed.end && (
        <group ref={braketRef}>
          <Bracket end />
        </group>
      )}
      {supportText && (
        <group ref={supportTextRef}>
          <SupportText supportText={supportText} />
        </group>
      )}
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
