import { useEffect, RefObject, useRef } from "react";

export type CanvasInfo = {
  width: number;
  height: number;
  maxCubeNumInWidth: number;
  zoom: number;
};

export const cubeNeedCanvasWidthZoom20 = 120; // zoom=20,distance=6の時は120がちょうど良い

const minCubeNumInWidth = 5; // 横に並ぶ最小cube数

export const useResize = (
  canvasDivRef: RefObject<HTMLDivElement>,
  scrambleNum: number
) => {
  const prevCanvasWidth = useRef<number>(0);
  const canvasInfo = useRef<CanvasInfo>({
    width: 0,
    height: 0,
    maxCubeNumInWidth: 0,
    zoom: 0,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        const currentWidth = el.contentRect.width;
        // widthが変わった時だけ処理
        if (prevCanvasWidth.current !== currentWidth) {
          canvasInfo.current.width = currentWidth;
          prevCanvasWidth.current = currentWidth;
        }
      });

      canvasInfo.current.maxCubeNumInWidth = Math.min(
        Math.max(
          Math.floor(canvasInfo.current.width / cubeNeedCanvasWidthZoom20),
          minCubeNumInWidth
        ),
        scrambleNum
      );
      const oneCubeNeedWidth = Math.min(
        canvasInfo.current.width / canvasInfo.current.maxCubeNumInWidth,
        cubeNeedCanvasWidthZoom20
      );
      const oneCubeNeedHeight = oneCubeNeedWidth * 1.5;
      canvasInfo.current.zoom =
        (20 * oneCubeNeedWidth) / cubeNeedCanvasWidthZoom20;

      const maxCubeNumInHeight = Math.ceil(
        scrambleNum / canvasInfo.current.maxCubeNumInWidth
      );
      canvasInfo.current.height = oneCubeNeedHeight * maxCubeNumInHeight;
      if (canvasDivRef.current) {
        canvasDivRef.current.style.height = `${canvasInfo.current.height}px`;
      }
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

  return {
    canvasInfo,
  };
};
