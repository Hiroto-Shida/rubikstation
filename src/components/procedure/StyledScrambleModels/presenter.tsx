import { ComponentProps } from "react";
import { Box, Theme } from "@mui/material";
import { StyledScrambleModels } from "./container";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";
import { useInView } from "react-intersection-observer";

type Props = ComponentProps<typeof StyledScrambleModels>;

export const StyledScrambleModelsPresenter = ({
  status,
  supportTextList,
  scrambleList,
  isKeepRotate,
  lookfromRight,
  border,
}: Props) => {
  const { ref, inView } = useInView({
    rootMargin: "0px", // ref要素が現れてから50px過ぎたら
    triggerOnce: true, // 最初の一度だけ実行
  });
  return (
    <Box
      ref={ref}
      component="div"
      sx={(theme: Theme) => ({
        m: `${theme.spacing(1)} 0`,
        border: border ? 6 : 0,
        borderColor: border ? `${border}.main` : undefined,
      })}
    >
      {inView && (
        <ScrambleModels
          status={status}
          supportTextList={supportTextList}
          scrambleList={scrambleList}
          isKeepRotate={isKeepRotate}
          lookfromRight={lookfromRight}
        />
      )}
    </Box>
  );
};
