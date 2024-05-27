import { useEffect, RefObject, useRef } from "react";
import { oneCubeNeedCanvasHeight, oneCubeNeedCanvasWidth } from "./useCubePosition";

export type CanvasWindowSize = {
  width: number;
  height: number;
};

export const useResize = (canvasRef: RefObject<HTMLCanvasElement>, scrambleNum: number) => {
  const canvasWindowSize = useRef<CanvasWindowSize>({ width: 0, height: 0 });
  const prevCanvasWidth = useRef<number>(0);
  console.log(`scrambleNum = ${scrambleNum}`);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        const currentWidth = el.contentRect.width;
        if (prevCanvasWidth.current !== currentWidth) {
          console.log(`pre, cur = ${prevCanvasWidth.current}, ${currentWidth}`);
          canvasWindowSize.current.width = currentWidth;
          // console.log(`canvasWindowSize.current.width = ${canvasWindowSize.current.width}`);
          const maxCubeInWidth = Math.floor(
            canvasWindowSize.current.width / oneCubeNeedCanvasWidth
          );
          const maxCubeInHeight = Math.ceil(scrambleNum / maxCubeInWidth);
          // console.log(`maxCubeInHeight = ${maxCubeInHeight}`);
          canvasWindowSize.current.height = oneCubeNeedCanvasHeight * maxCubeInHeight;
          // console.log(`windowHeight = ${canvasWindowSize.current.height}`);
          if (canvasRef.current) {
            canvasRef.current.style.height = `${canvasWindowSize.current.height + 1}px`; // HACK heightが最低1無いと、widthも0になりその後の計算が動かないため
          }
          // console.log(`w,h = ${(canvasRef.current.style.width, canvasRef.current.style.height)}`);
          // console.log(`w,h = ${1}`);
          prevCanvasWidth.current = currentWidth;
        }
      });
    });

    const canvasRefCurrent = canvasRef.current;

    if (canvasRefCurrent) {
      console.log("observe");
      resizeObserver.observe(canvasRefCurrent);
    }

    return () => {
      console.log("disconnect");
      // resizeObserver.disconnect();
      if (canvasRefCurrent) {
        console.log("observe");
        resizeObserver.observe(canvasRefCurrent);
      }
    };
  }, [scrambleNum]);

  return canvasWindowSize;
};
