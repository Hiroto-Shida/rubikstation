import * as THREE from "three";
import { useCallback } from "react";
import { Axis, Limit, Multiplier } from "../components/rubicModel/rotateDirection";

export const useRotateCube = () => {
  const resetCubeGroup = (cubeGroupRef: THREE.Group, rotationGroupRef: THREE.Group) => {
    rotationGroupRef.children
      .slice()
      // .reverse() // いらない？
      .forEach((c) => {
        const objectPosition = new THREE.Vector3();
        c.getWorldPosition(objectPosition);
        cubeGroupRef.attach(c);
      });
    // MAYBE: 上記の処理でrotationGroupの中を空にしてからrotationリセット?
    // rotationGroupRef.quaternion.set(0, 0, 0, 1); // どっちもかわらなそう
    rotationGroupRef.rotation.set(0, 0, 0); // どっちもかわらなそう
  };

  const attachToRotationGroup = (
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group,
    cubeGroupPosition: number[],
    axis: Axis,
    limit: Limit,
    isHighlightRotateGroup: boolean
  ) => {
    cubeGroupRef.children
      .slice()
      .reverse()
      .filter((c: THREE.Object3D<THREE.Object3DEventMap>) => {
        const isRotateCube = limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
        if (isHighlightRotateGroup && !isRotateCube) {
          const mesh = c.children[0] as THREE.Mesh;
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
    multiplier: Multiplier,
    isMoveMaximum: boolean
  ) => {
    if (isMoveMaximum) {
      rotationGroupRef.rotation[axis] += (Math.PI / 2) * multiplier;
    } else {
      rotationGroupRef.rotation[axis] += (Math.PI / 6) * multiplier;
    }
    rotationGroupRef.position.set(
      Math.round(rotationGroupRef.position.x),
      Math.round(rotationGroupRef.position.y),
      Math.round(rotationGroupRef.position.z)
    );
  };

  const addArrow = (
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group,
    rotateAxis: Axis,
    limit: Limit,
    multiplier: Multiplier
  ) => {
    const cubeGroupPosVec = new THREE.Vector3();
    cubeGroupRef.getWorldPosition(cubeGroupPosVec);

    const targetPosListAddArrow: { pos: number[]; arrow: THREE.Group }[] = [];

    rotationGroupRef.children.forEach((child) => {
      if (child instanceof THREE.Group) {
        // child.quaternion.set(0, 0, 0, 1);
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

        const distanceFromSurface = 1 * Math.sign(limit);

        // 原点からの絶対座標から、各キューブの中心からの相対座標childPosに変換
        const childWorldPosVec = new THREE.Vector3();
        const childWorldDirVec = new THREE.Vector3();
        child.getWorldPosition(childWorldPosVec);
        child.getWorldDirection(childWorldDirVec);
        const childPosVec = new THREE.Vector3().subVectors(childWorldPosVec, cubeGroupPosVec);
        const childPos = childPosVec.toArray().map((pos) => Math.round(pos));

        const originAxis = ["x", "y", "z"];

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
          if (originAxis[childPos.indexOf(0)] === "x") {
            arrowGroup.position.set(
              childPos[0] * 2,
              childPos[1] * 2 - (rotateAxis === "y" ? distanceFromSurface : 0),
              childPos[2] * 2 - (rotateAxis === "z" ? distanceFromSurface : 0)
            );
          }
          if (originAxis[childPos.indexOf(0)] === "y") {
            arrowGroup.position.set(
              childPos[0] * 2 - (rotateAxis === "x" ? distanceFromSurface : 0),
              childPos[1] * 2,
              childPos[2] * 2 - (rotateAxis === "z" ? distanceFromSurface : 0)
            );
          }
          if (originAxis[childPos.indexOf(0)] === "z") {
            arrowGroup.position.set(
              childPos[0] * 2 - (rotateAxis === "x" ? distanceFromSurface : 0),
              childPos[1] * 2 - (rotateAxis === "y" ? distanceFromSurface : 0),
              childPos[2] * 2
            );
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
          targetPosListAddArrow.push({ pos: childPos, arrow: arrowGroup });
        }
      }
    });
    targetPosListAddArrow.forEach((target) => {
      rotationGroupRef.add(target.arrow);
    });
  };

  const rotate = useCallback(
    (
      cubeGroupRef: THREE.Group,
      rotationGroupRef: THREE.Group,
      cubeGroupPosition: number[],
      axis: Axis,
      limit: Limit,
      multiplier: Multiplier,
      isMoveMaximum: boolean,
      isHighlightRotateGroup: boolean
    ) => {
      attachToRotationGroup(
        cubeGroupRef,
        rotationGroupRef,
        cubeGroupPosition,
        axis,
        limit,
        isHighlightRotateGroup
      );
      !isMoveMaximum && addArrow(cubeGroupRef, rotationGroupRef, axis, limit, multiplier);
      rotateGroup(rotationGroupRef, axis, multiplier, isMoveMaximum);
      resetCubeGroup(cubeGroupRef, rotationGroupRef);
    },
    []
  );

  return {
    rotate,
  } as const;
};
