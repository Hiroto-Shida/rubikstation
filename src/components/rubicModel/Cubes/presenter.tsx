import * as THREE from "three";
import { BLACK, surfaceColorList } from "../surfaceColors";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Html } from "@react-three/drei";
import { useTheme } from "@mui/material";
import { Arrow } from "../Arrow/container";
import {
  CanvasInfo,
  cubeNeedCanvasWidthZoom20,
} from "../../../hooks/useResize";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useFrame } from "@react-three/fiber";

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
  oneCubeNeedWidth: number;
};

const MoveText = ({ moveChar, oneCubeNeedWidth }: MoveTextProps) => {
  const regexMoveChar = /.2/;
  const isDoubleMove = regexMoveChar.test(moveChar);

  return (
    <>
      {isDoubleMove && (
        <Html
          as="div"
          position={new THREE.Vector3(0, 3, 0)}
          className={clsx(styles.moveChar180)}
          style={{
            fontSize: `${oneCubeNeedWidth * 0.15}px`,
          }}
        >
          <p className={clsx(styles.text, styles.Decoration)}>180°</p>
          <p className={styles.text}>180°</p>
        </Html>
      )}
      <Html
        as="div"
        position={new THREE.Vector3(0, 0, 0)}
        style={{
          fontSize: `${oneCubeNeedWidth * 0.3}px`,
        }}
        className={clsx(styles.moveChar)}
      >
        <p
          className={clsx(styles.text, styles.Decoration, {
            [styles.Double]: isDoubleMove,
          })}
        >
          {moveChar}
        </p>
        <p className={styles.text}>{moveChar}</p>
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

type SupportTextProps = {
  supportText: string;
  oneCubeNeedWidth: number;
};

const SupportText = ({ supportText, oneCubeNeedWidth }: SupportTextProps) => {
  return (
    <Html
      as="div"
      position={new THREE.Vector3(-1.7, 4.1, 0)}
      className={clsx(styles.supportText)}
      style={{
        fontSize: `${oneCubeNeedWidth * 0.1}px`,
      }}
    >
      {supportText.split(",").map((text, index) => (
        <p key={index} className={styles.text}>
          {text}
        </p>
      ))}
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
  canvasInfo?: MutableRefObject<CanvasInfo>;
  rotationGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  hiddenGroupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  braketRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  supportText: string | undefined;
  supportTextRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  braketNeed: { start: boolean; end: boolean };
  status?: string;
  arrowRefList: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>[];
};

export const CubesPresenter = ({
  cubeGroupRef,
  moveTextRef,
  moveChar,
  canvasInfo,
  rotationGroupRef,
  hiddenGroupRef,
  braketRef,
  supportText,
  supportTextRef,
  braketNeed,
  status = "default",
  arrowRefList,
}: Props) => {
  const prevCanvasWidth = useRef<number>(0);
  const [oneCubeNeedWidth, setOneCubeNeedWidth] = useState(0);

  useFrame(() => {
    if (canvasInfo && prevCanvasWidth.current !== canvasInfo.current.width) {
      setOneCubeNeedWidth(
        Math.min(
          canvasInfo.current.width / canvasInfo.current.maxCubeNumInWidth,
          cubeNeedCanvasWidthZoom20
        )
      );
      prevCanvasWidth.current = canvasInfo.current.width;
    }
  });

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
          <SupportText
            supportText={supportText}
            oneCubeNeedWidth={oneCubeNeedWidth}
          />
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
          <MoveText moveChar={moveChar} oneCubeNeedWidth={oneCubeNeedWidth} />
        </group>
      )}
      <group ref={rotationGroupRef}></group>
      <group ref={hiddenGroupRef} visible={false}>
        {arrowRefList.map((arrowRef, index) => (
          <group ref={arrowRef} scale={0.9} key={index}>
            <Arrow index={index} moveChar={moveChar} />
          </group>
        ))}
      </group>
    </>
  );
};
