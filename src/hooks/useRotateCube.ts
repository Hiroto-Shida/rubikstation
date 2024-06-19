import * as THREE from "three";
import { MutableRefObject, useCallback } from "react";
import { Axis, Limit, Multiplier } from "../components/rubicModel/rotateDirection";
import { ArrowType } from "../components/rubicModel/Arrow/container";

export const useRotateCube = () => {
  const resetCubeGroup = (cubeGroupRef: THREE.Group, rotationGroupRef: THREE.Group) => {
    rotationGroupRef.children
      .slice()
      // .reverse() // いらない？
      .forEach((c) => {
        // const objectPosition = new THREE.Vector3();
        // c.getWorldPosition(objectPosition);
        cubeGroupRef.attach(c);
        cubeGroupRef.add(c);
      });
    // MAYBE: 上記の処理でrotationGroupの中を空にしてからrotationリセット?
    // rotationGroupRef.quaternion.set(0, 0, 0, 1); // どっちもかわらなそう
    rotationGroupRef.rotation.set(0, 0, 0); // どっちもかわらなそう
  };

  const attachToRotationGroup = (
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group,
    hiddenGroupRef: THREE.Group,
    cubeGroupPosition: number[],
    axis: Axis,
    limit: Limit | undefined,
    isHighlightRotateGroup: boolean,
    isMoveMaximum: boolean
  ) => {
    cubeGroupRef.children
      .slice()
      .reverse()
      .filter((c: THREE.Object3D<THREE.Object3DEventMap>) => {
        const isRotateCube = limit
          ? limit < 0
            ? c.position[axis] < limit
            : c.position[axis] > limit
          : true;
        if (isHighlightRotateGroup && !isRotateCube) {
          const mesh = c.children[0] as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => {
              (material as THREE.MeshBasicMaterial).color.set("#777777");
            });
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
    // 矢印も一緒にrotateGroupに移動
    if (!isMoveMaximum) {
      hiddenGroupRef.children
        .slice()
        .reverse() // いらない？
        .forEach((c) => {
          rotationGroupRef.attach(c);
        });
    }
  };

  const rotateGroup = (
    rotationGroupRef: THREE.Group,
    axis: Axis,
    multiplier: Multiplier,
    isMoveTwice: boolean,
    isMoveMaximum: boolean
  ) => {
    if (isMoveMaximum) {
      const rotateAngle = isMoveTwice ? Math.PI : Math.PI / 2;
      rotationGroupRef.rotation[axis] += rotateAngle * multiplier;
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
    arrowRefList: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>[],
    cubeGroupRef: THREE.Group,
    rotationGroupRef: THREE.Group,
    rotateAxis: Axis,
    limit: Limit | undefined,
    multiplier: Multiplier
  ) => {
    const cubeGroupPosVec = new THREE.Vector3();
    cubeGroupRef.getWorldPosition(cubeGroupPosVec);

    const arrowInfoList: ArrowType[] = [];

    rotationGroupRef.children.forEach((child) => {
      if (child instanceof THREE.Group) {
        const arrowInfo: ArrowType = {
          position: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Euler(0, 0, 0),
        };

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
        if (limit) {
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
        } else {
          if (rotateAxis === "y") {
            // TODO: y軸回転の時に矢印が後ろに隠れちゃう問題を解決。↓y,y'の時だけ以下で対処可。これを参考に後述の部分もやりたい
            // isTargetAddArrow = childPos[0] * -multiplier + childPos[2] === 1 && childPos[1] === 0;
            isTargetAddArrow = childPos[0] + childPos[2] === 1 && childPos[1] === 0;
          }
        }

        let zeroPosAxis = "";
        originAxis.forEach((axis) => {
          if (axis !== rotateAxis) zeroPosAxis = axis;
        });

        if (isTargetAddArrow) {
          if (zeroPosAxis === "x") {
            arrowInfo.position.set(
              childPos[0] * 2,
              childPos[1] * (rotateAxis === "z" ? 2 : 1),
              childPos[2] * (rotateAxis === "y" ? 2 : 1)
            );
          }
          if (zeroPosAxis === "y") {
            arrowInfo.position.set(
              childPos[0] * (rotateAxis === "z" ? 2 : 1),
              childPos[1] * 2,
              childPos[2] * (rotateAxis === "x" ? 2 : 1)
            );
          }
          if (zeroPosAxis === "z") {
            arrowInfo.position.set(
              childPos[0] * (rotateAxis === "y" ? 2 : 1),
              childPos[1] * (rotateAxis === "x" ? 2 : 1),
              childPos[2] * 2
            );
          }

          if (rotateAxis === "z") {
            if (childPos[0] === 0) {
              arrowInfo.rotation.z += (multiplier * Math.PI) / 2;
            } else {
              arrowInfo.rotation.z = multiplier === -1 ? Math.PI : 0;
            }
          }

          if (rotateAxis === "x") {
            if (childPos[2] === 0) {
              arrowInfo.rotation.x += (multiplier * Math.PI) / 2;
            } else {
              arrowInfo.rotation.x = multiplier === 1 ? Math.PI : 0;
            }
          }

          if (rotateAxis === "y") {
            if (childPos[0] === 0) {
              arrowInfo.rotation.z -= (multiplier * Math.PI) / 2;
            }
            if (childPos[2] === 0) {
              arrowInfo.rotation.x -= (multiplier * Math.PI) / 2;
            }
          }

          arrowInfoList.push(arrowInfo);
        }
      }
    });
    arrowInfoList.forEach((arrowInfo, index) => {
      arrowRefList[index].current.position.set(
        arrowInfo.position.x,
        arrowInfo.position.y,
        arrowInfo.position.z
      );
      arrowRefList[index].current.rotation.set(
        arrowInfo.rotation.x,
        arrowInfo.rotation.y,
        arrowInfo.rotation.z
      );
    });
  };

  const rotate = useCallback(
    (
      cubeGroupRef: THREE.Group,
      rotationGroupRef: THREE.Group,
      hiddenGroupRef: THREE.Group,
      cubeGroupPosition: number[],
      rotateDirection: [Axis, Limit | undefined, Multiplier],
      isMoveTwice: boolean,
      isMoveMaximum: boolean,
      isHighlightRotateGroup: boolean,
      arrowRefList: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>[]
    ) => {
      const axis = rotateDirection[0];
      const limit = rotateDirection[1];
      const multiplier = rotateDirection[2];
      attachToRotationGroup(
        cubeGroupRef,
        rotationGroupRef,
        hiddenGroupRef,
        cubeGroupPosition,
        axis,
        limit,
        isHighlightRotateGroup,
        isMoveMaximum
      );
      !isMoveMaximum &&
        addArrow(arrowRefList, cubeGroupRef, rotationGroupRef, axis, limit, multiplier);
      rotateGroup(rotationGroupRef, axis, multiplier, isMoveTwice, isMoveMaximum);
      resetCubeGroup(cubeGroupRef, rotationGroupRef);
    },
    []
  );

  return {
    rotate,
  } as const;
};
