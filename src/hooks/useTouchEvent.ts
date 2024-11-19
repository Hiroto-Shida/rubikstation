import { useRef } from "react";

export const useTouchEvent = (timerCanStart: () => void) => {
  const touchedTime = useRef(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  // 画面をタップし始めた
  const startTouch = () => {
    if (touchedTime.current === 0) {
      touchedTime.current = performance.now();
      timerId.current = setTimeout(() => {
        timerCanStart();
      }, 500);
      return true;
    }
    return false;
  };

  // 一定時間画面をタップしつづけてから離したかどうか
  const isTouchHeldAndReleased = () => {
    if (
      touchedTime.current !== 0 &&
      performance.now() - touchedTime.current > 500
    ) {
      touchedTime.current = 0;
      return true;
    }
    touchedTime.current = 0;
    timerId.current && clearTimeout(timerId.current);
    return false;
  };

  return {
    startTouch,
    isTouchHeldAndReleased,
  } as const;
};
