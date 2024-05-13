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

const addArrow = (
  rotationGroup: THREE.Group,
  rotateAxis: Axis,
  limit: Limit,
  multiplier: Multiplier
) => {
  rotationGroup.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const coneGeometry = new THREE.ConeGeometry(0.2, 1, 10);
      const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 10);
      const material = new THREE.MeshBasicMaterial({ color: "#272222" });

      const distanceFromSurface = 0.7;

      const otherAxis = ["x", "y", "z"].filter(
        (axis) => axis !== rotateAxis
      ) as ("x" | "y" | "z")[];

      // console.log(child.position);
      otherAxis.map((axis: "x" | "y" | "z", index) => {
        if (
          child.position[otherAxis[index]] === 1 &&
          child.position[otherAxis[1 - index]] === 0
        ) {
          // console.log(otherAxis[index], otherAxis[1 - index]);
          const coneMesh = new THREE.Mesh(coneGeometry, material);
          const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);

          coneMesh.position.set(0, 0, 0);
          coneMesh.rotation.set(
            child.rotation.x,
            child.rotation.y,
            child.rotation.z
          );
          cylinderMesh.position.set(0, 0, 0);
          cylinderMesh.rotation.set(
            child.rotation.x,
            child.rotation.y,
            child.rotation.z
          );

          if (otherAxis[index] === "x") {
            coneMesh.position.setX(distanceFromSurface);
            coneMesh.rotation.x =
              child.rotation.x + Math.PI / 2 - (multiplier * Math.PI) / 2;
            cylinderMesh.position.setX(distanceFromSurface);
          }
          if (otherAxis[index] === "y") {
            coneMesh.position.setY(distanceFromSurface);
            coneMesh.rotation.y =
              child.rotation.y + Math.PI / 2 - (multiplier * Math.PI) / 2;
            cylinderMesh.position.setY(distanceFromSurface);
          }
          if (otherAxis[index] === "z") {
            coneMesh.position.setZ(distanceFromSurface);
            coneMesh.rotation.z =
              child.rotation.z + Math.PI / 2 - (multiplier * Math.PI) / 2;
            cylinderMesh.position.setZ(distanceFromSurface);
          }

          if (otherAxis[1 - index] === "x") {
            coneMesh.position.setX(1 * multiplier);
          }
          if (otherAxis[1 - index] === "y") {
            coneMesh.position.setY(1 * multiplier);
          }
          if (otherAxis[1 - index] === "z") {
            coneMesh.position.setZ(1 * multiplier);
          }

          coneMesh.scale.set(0.9, 0.9, 0.9);
          child.add(coneMesh);

          cylinderMesh.scale.set(0.9, 0.9, 0.9);
          child.add(cylinderMesh);
        }
      });

      // if (child.position.x === 1 && child.position.y === 0) {
      //   const coneMesh = new THREE.Mesh(coneGeometry, material);
      //   coneMesh.position.set(0.7, 1 * multiplier, 0);
      //   coneMesh.rotation.set(
      //     child.rotation.x + Math.PI / 2 - (multiplier * Math.PI) / 2,
      //     child.rotation.y,
      //     child.rotation.z
      //   );
      //   coneMesh.scale.set(0.9, 0.9, 0.9);
      //   child.add(coneMesh);

      //   const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
      //   cylinderMesh.position.set(0.7, 0, 0);
      //   cylinderMesh.rotation.set(
      //     child.rotation.x,
      //     child.rotation.y,
      //     child.rotation.z
      //   );
      //   cylinderMesh.scale.set(0.9, 0.9, 0.9);
      //   child.add(cylinderMesh);
      // }

      // if (child.position.y === 1 && child.position.x === 0) {
      //   const coneMesh = new THREE.Mesh(coneGeometry, material);
      //   coneMesh.position.set(-1 * multiplier, 0.7, 0);
      //   coneMesh.rotation.set(
      //     child.rotation.x,
      //     child.rotation.y + Math.PI / 2 - (multiplier * Math.PI) / 2,
      //     child.rotation.z + Math.PI / 2
      //   );
      //   coneMesh.scale.set(0.9, 0.9, 0.9);
      //   child.add(coneMesh);

      //   const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
      //   cylinderMesh.position.set(0, 0.7, 0);
      //   cylinderMesh.rotation.set(
      //     child.rotation.x,
      //     child.rotation.y,
      //     child.rotation.z + Math.PI / 2
      //   );
      //   cylinderMesh.scale.set(0.9, 0.9, 0.9);
      //   child.add(cylinderMesh);
      // }
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

// const ArrowImage = ({
//   position,
//   rotation,
//   scale,
// }: {
//   position: number[];
//   rotation: number[];
//   scale: number;
// }) => {
//   const texture = useTexture("arrow.png");
//   return (
//     <mesh
//       position={new THREE.Vector3(position[0], position[1], position[2])}
//       rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
//       scale={scale}
//     >
//       <planeGeometry args={[36, 106]} />
//       <meshBasicMaterial transparent map={texture} />
//     </mesh>
//   );
// };

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
      {/* {["x", "y", "z"]
        .filter((axis) => axis !== ROTATE_DIRECTION[moveChar][0])
        .map((axis) => {
          const axisDic: { [key: string]: number } = { x: 0, y: 0, z: 0 };
          axisDic[axis] = 0.5;
          return (
            <ArrowImage
              position={Object.values(axisDic)}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.01}
            />
          );
        })} */}
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
