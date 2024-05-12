import * as THREE from "three";
import { SURFACE_COLORS } from "../surfaceColors";
import { Axis, Limit, Multiplier, ROTATE_DIRECTION } from "../rotateDirection";
import { useEffect, useRef } from "react";

const resetCubeGroup = (cubeGroup: THREE.Group, rotationGroup: THREE.Group) => {
  rotationGroup.children
    .slice()
    .reverse()
    .forEach(function (c) {
      cubeGroup.attach(c);
    });
  rotationGroup.quaternion.set(0, 0, 0, 1);
};

const attachToRotationGroup = (
  cubeGroup: THREE.Group,
  rotationGroup: THREE.Group,
  axis: Axis,
  limit: Limit
) => {
  cubeGroup.children
    .slice()
    .reverse()
    .filter(function (c) {
      return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
    })
    .forEach(function (c) {
      rotationGroup.attach(c);
    });
};

const rotateGroup = (
  rotationGroup: THREE.Group,
  axis: Axis,
  multiplier: Multiplier
) => {
  rotationGroup.rotation[axis] += (Math.PI / 6) * multiplier;
};

const rotate = (
  cubeGroup: THREE.Group,
  rotationGroup: THREE.Group,
  axis: Axis,
  limit: Limit,
  multiplier: Multiplier
) => {
  resetCubeGroup(cubeGroup, rotationGroup);
  attachToRotationGroup(cubeGroup, rotationGroup, axis, limit);
  rotateGroup(rotationGroup, axis, multiplier);
};

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
  }; // 6 colors for the faces

  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      {colorList.map((value, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          color={colorsDic[value]}
        />
      ))}
    </mesh>
  );
};

export const CubesPresenter = ({ moveChar }: { moveChar: string }) => {
  const cubeGroup = useRef<THREE.Group>(null!);
  const rotationGroup = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (cubeGroup.current && rotationGroup.current) {
      if (ROTATE_DIRECTION[moveChar]) {
        rotate(
          cubeGroup.current,
          rotationGroup.current,
          ROTATE_DIRECTION[moveChar][0],
          ROTATE_DIRECTION[moveChar][1],
          ROTATE_DIRECTION[moveChar][2]
        );
      } else {
        console.log(`回転記号 ${moveChar} は存在しません`);
      }
    }
  }, []);

  return (
    <>
      <group ref={cubeGroup}>
        {[...Array(3).keys()].map((x) =>
          [...Array(3).keys()].map((y) =>
            [...Array(3).keys()].map((z) => (
              <Cube
                key={`${x}${y}${z}`}
                position={[x - 1, y - 1, z - 1]}
                colorList={SURFACE_COLORS[0]}
              />
            ))
          )
        )}
      </group>
      <group ref={rotationGroup}></group>
    </>
  );
};
