import { useRef } from "react";

export const useKeyEvent = () => {
  const keyPressedTime = useRef(0);

  // spaceキー押したか
  const isKeyIsSpace = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      return true;
    }
    return false;
  };

  // spaceキーを押し始めたか
  const isKeyDownSpaceStart = () => {
    if (keyPressedTime.current === 0) {
      keyPressedTime.current = performance.now();
      return true;
    }
    return false;
  };

  // spaceキー入力中でかつ、spaceキーを一定時間おしてるかどうか
  const isCanStartByKeyUpSpace = () => {
    if (performance.now() - keyPressedTime.current > 500) {
      return true;
    }
    return false;
  };

  // 一定時間のspaceキー入力があったかどうか
  const isKeyUpSpaceHeldAndReleased = () => {
    if (isCanStartByKeyUpSpace()) {
      keyPressedTime.current = 0;
      return true;
    }
    keyPressedTime.current = 0;
    return false;
  };

  return {
    isKeyIsSpace,
    isKeyDownSpaceStart,
    isKeyUpSpaceHeldAndReleased,
  } as const;
};
