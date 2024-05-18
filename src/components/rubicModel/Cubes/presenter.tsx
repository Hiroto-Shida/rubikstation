import * as THREE from "three";
import { SURFACE_COLORS } from "../surfaceColors";
import { Axis, Limit, Multiplier, ROTATE_DIRECTION } from "../rotateDirection";
import { ComponentProps, useEffect, useRef } from "react";
import { Cubes } from "./container";

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

const addArrow = (
  rotationGroup: THREE.Group,
  rotateAxis: Axis,
  limit: Limit,
  multiplier: Multiplier
) => {
  let countIndex = 0;
  rotationGroup.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const coneGeometry = new THREE.ConeGeometry(0.4, 1, 10);
      const cylinderGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2.3, 10);

      const meshMaterial = new THREE.MeshStandardMaterial({
        color: "#000000",
        emissive: "#000000",
      });
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: "#ff0000",
        emissive: "#ff0000",
      });

      const arrowGroup = new THREE.Group();

      const coneMesh = new THREE.Mesh(coneGeometry, meshMaterial);

      const coneWireframe = new THREE.WireframeGeometry(coneGeometry);
      const coneLine = new THREE.LineSegments(coneWireframe, lineMaterial);

      coneMesh.position.setY(1);
      coneLine.position.setY(1);

      const cylinderMesh = new THREE.Mesh(cylinderGeometry, meshMaterial);
      cylinderMesh.position.setY(-0.2);

      arrowGroup.add(coneMesh);
      arrowGroup.add(coneLine);
      arrowGroup.add(cylinderMesh);

      const distanceFromSurface = 0.7;

      const childPos = child.position.toArray();

      const originAxis = ["x", "y", "z"];

      const otherAxis = originAxis.filter((axis) => axis !== rotateAxis) as (
        | "x"
        | "y"
        | "z"
      )[];

      // 矢印をつける対象のCubeの場合、isTargetAddArrow = true
      let isTargetAddArrow;
      if (Math.sign(limit) == 1) {
        isTargetAddArrow =
          childPos.filter((pos) => pos === 1).length == 2 &&
          childPos.filter((pos) => pos === 0).length == 1;
      } else {
        isTargetAddArrow =
          childPos.filter((pos) => pos === 1).length == 1 &&
          childPos.filter((pos) => pos === -1).length == 1 &&
          childPos.filter((pos) => pos === 0).length == 1;
      }

      if (isTargetAddArrow) {
        if (otherAxis[countIndex] === "x") {
          arrowGroup.position.setX(distanceFromSurface);
        }
        if (otherAxis[countIndex] === "y") {
          arrowGroup.position.setY(distanceFromSurface);
        }
        if (otherAxis[countIndex] === "z") {
          arrowGroup.position.setZ(distanceFromSurface);
        }

        if (rotateAxis === "z") {
          if (multiplier === -1) {
            arrowGroup.rotation.x = Math.PI;
          }
          if (originAxis[childPos.indexOf(0)] == "x") {
            arrowGroup.rotation.z += (multiplier * Math.PI) / 2;
          }
        }

        if (rotateAxis === "x") {
          if (multiplier === 1) {
            arrowGroup.rotation.x = Math.PI;
          }
          if (originAxis[childPos.indexOf(0)] == "z") {
            arrowGroup.rotation.x -= Math.PI / 2;
          }
        }

        if (rotateAxis === "y") {
          if (multiplier === 1) {
            arrowGroup.rotation.x = Math.PI;
          }
          if (originAxis[childPos.indexOf(0)] == "x") {
            arrowGroup.rotation.z -= (multiplier * Math.PI) / 2;
          }
          if (originAxis[childPos.indexOf(0)] == "z") {
            arrowGroup.rotation.x += Math.PI / 2;
          }
        }

        arrowGroup.scale.set(0.9, 0.9, 0.9);
        child.add(arrowGroup);
        countIndex += 1;
      }
    }
  });
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
  addArrow(rotationGroup, axis, limit, multiplier);
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

type Prop = ComponentProps<typeof Cubes>;

export const CubesPresenter = ({ moveChar }: Prop) => {
  const cubeGroup = useRef<THREE.Group>(null!);
  const rotationGroup = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (cubeGroup.current && rotationGroup.current && moveChar) {
      const regexMoveChar = /2/;
      const removedTwoMoveChar = moveChar.replace(regexMoveChar, "");
      if (ROTATE_DIRECTION[removedTwoMoveChar]) {
        rotate(
          cubeGroup.current,
          rotationGroup.current,
          ROTATE_DIRECTION[removedTwoMoveChar][0],
          ROTATE_DIRECTION[removedTwoMoveChar][1],
          ROTATE_DIRECTION[removedTwoMoveChar][2]
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
