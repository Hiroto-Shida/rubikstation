import { ComponentProps } from "react";
import { Box } from "@mui/material";
import { StyledScrambleModels } from "./container";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";

type Props = ComponentProps<typeof StyledScrambleModels>;

export const StyledScrambleModelsPresenter = ({
  status,
  supportTextList,
  scrambleList,
  isKeepRotate,
  lookfromRight,
  border,
}: Props) => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        m: `${theme.spacing(1)} 0`,
        border: border ? 6 : 0,
        borderColor: border ? `${border}.main` : undefined,
      })}
    >
      <ScrambleModels
        status={status}
        supportTextList={supportTextList}
        scrambleList={scrambleList}
        isKeepRotate={isKeepRotate}
        lookfromRight={lookfromRight}
      />
    </Box>
  );
};
