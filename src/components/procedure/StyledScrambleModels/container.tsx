import { ComponentProps } from "react";
import { StyledScrambleModelsPresenter } from "./presenter";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";

export const StyledScrambleModels = ({
  status,
  supportTextList,
  scrambleList,
  isKeepRotate,
  lookfromRight,
  border,
}: Pick<
  ComponentProps<typeof ScrambleModels>,
  "status" | "supportTextList" | "scrambleList" | "isKeepRotate" | "lookfromRight"
> & {
  border?: "error" | "success";
}) => {
  return (
    <StyledScrambleModelsPresenter
      status={status}
      supportTextList={supportTextList}
      scrambleList={scrambleList}
      isKeepRotate={isKeepRotate}
      lookfromRight={lookfromRight}
      border={border}
    />
  );
};
