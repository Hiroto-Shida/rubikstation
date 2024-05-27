import * as THREE from "three";
import { useCallback } from "react";
import {
  Axis,
  Limit,
  Multiplier,
} from "../components/rubicModel/rotateDirection";

export const useRotateCube = () => {
  const resetCubeGroup = (
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group
  ) => {
    rotationGroupRef.children
      .slice()
      .reverse()
      .forEach((c) => {
        cubeGroupRef.attach(c);
      });
    rotationGroupRef.quaternion.set(0, 0, 0, 1);
  };

  const attachToRotationGroup = (
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group,
    cubeGroupPosition: number[],
    axis: Axis,
    limit: Limit
  ) => {
    cubeGroupRef.children
      .slice()
      .reverse()
      .filter((c: THREE.Object3D<THREE.Object3DEventMap>) => {
        const isRotateCube =
          limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
        if (
          !isRotateCube &&
          (c as THREE.Mesh).isMesh &&
          (c as THREE.Mesh).material
        ) {
          const mesh = c as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) =>
              (material as THREE.MeshBasicMaterial).color.set("#777777")
            );
          }
        }
        return isRotateCube;
      })
      .forEach((c) => {
        rotationGroupRef.position.set(
          cubeGroupPosition[0],
          cubeGroupPosition[1],
          cubeGroupPosition[2]
        );
        rotationGroupRef.attach(c);
      });
  };

  const rotateGroup = (
    rotationGroupRef: THREE.Group,
    axis: Axis,
    multiplier: Multiplier
  ) => {
    rotationGroupRef.rotation[axis] += (Math.PI / 6) * multiplier;
  };

  const addArrow = (
    rotationGroupRef: THREE.Group,
    rotateAxis: Axis,
    limit: Limit,
    multiplier: Multiplier
  ) => {
    let countIndex = 0;
    rotationGroupRef.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const coneGeometry = new THREE.ConeGeometry(0.4, 1, 10);
        const cylinderGeometry = new THREE.CylinderGeometry(
          0.15,
          0.15,
          2.3,
          10
        );

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

  const rotate = useCallback(
    (
      cubeGroupRef: THREE.Group,
      rotationGroupRef: THREE.Group,
      cubeGroupPosition: number[],
      axis: Axis,
      limit: Limit,
      multiplier: Multiplier
    ) => {
      // console.log("rotate");
      attachToRotationGroup(
        cubeGroupRef,
        rotationGroupRef,
        cubeGroupPosition,
        axis,
        limit
      );
      // rotateGroup(rotationGroupRef, axis, multiplier);
      // addArrow(rotationGroupRef, axis, limit, multiplier);
      // resetCubeGroup(cubeGroupRef, rotationGroupRef);
    },
    []
  );

  return {
    rotate,
  } as const;
};
