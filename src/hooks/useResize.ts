import { useEffect, RefObject, useRef } from "react";

export const useResize = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvasWidth = useRef<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        canvasWidth.current = el.contentRect.width;
        // console.log(canvasWidth.current);
      });
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasRef]);

  return canvasWidth;
};
