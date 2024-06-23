import { ComponentProps } from "react";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { Box, Theme } from "@mui/material";
import { StyledRubicModel } from "./container";
import { useInView } from "react-intersection-observer";

type Props = ComponentProps<typeof StyledRubicModel>;

export const StyledRubicModelPresenter = ({
  orthographic,
  cameraControls,
  canvasStyle = { width: "300px", height: "300px" },
  status,
  canvasCamera,
  isRotate,
}: Props) => {
  const { ref, inView } = useInView({
    rootMargin: "0px", // ref要素が現れてから50px過ぎたら
    triggerOnce: true, // 最初の一度だけ実行
  });
  return (
    <Box ref={ref} component="div" sx={(theme: Theme) => ({ m: `${theme.spacing(2)} 0` })}>
      {inView && (
        <RubicModel
          orthographic={orthographic}
          cameraControls={cameraControls}
          canvasStyle={canvasStyle}
          status={status}
          canvasCamera={canvasCamera}
          isRotate={isRotate}
        />
      )}
    </Box>
  );
};
