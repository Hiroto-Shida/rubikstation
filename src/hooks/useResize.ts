import { useEffect, RefObject, useRef } from "react";
import { oneCubeNeedCanvasHeight, oneCubeNeedCanvasWidth } from "./useCubePosition";

export type CanvasWindowSize = {
  width: number;
  height: number;
};

export const useResize = (canvasDivRef: RefObject<HTMLDivElement>, scrambleNum: number) => {
  const canvasWindowSize = useRef<CanvasWindowSize>({ width: 0, height: 0 });
  const prevCanvasWidth = useRef<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        const currentWidth = el.contentRect.width;
        if (prevCanvasWidth.current !== currentWidth) {
          // widthが変わった時だけ処理
          canvasWindowSize.current.width = currentWidth;
          const maxCubeInWidth = Math.floor(
            canvasWindowSize.current.width / oneCubeNeedCanvasWidth
          );
          const maxCubeInHeight = Math.ceil(scrambleNum / maxCubeInWidth);
          canvasWindowSize.current.height = oneCubeNeedCanvasHeight * maxCubeInHeight;
          if (canvasDivRef.current) {
            canvasDivRef.current.style.height = `${canvasWindowSize.current.height}px`;
          }
          prevCanvasWidth.current = currentWidth;
        }
      });
    });

    const canvasDivRefCurrent = canvasDivRef.current;

    if (canvasDivRefCurrent) {
      resizeObserver.observe(canvasDivRefCurrent);
    }

    return () => {
      if (canvasDivRefCurrent) {
        resizeObserver.disconnect();
      }
    };
  }, [canvasDivRef, scrambleNum]);

  return canvasWindowSize;
};
