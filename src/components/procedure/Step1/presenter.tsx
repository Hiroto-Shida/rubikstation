import { ComponentProps } from "react";
import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";
import { RubicModel } from "../../rubicModel/RubicModel/container";

const StyledRubicModel = ({
  status,
  canvasCamera,
}: Pick<ComponentProps<typeof RubicModel>, "status" | "canvasCamera">) => {
  return (
    <RubicModel
      canvasStyle={{ width: "300px", height: "300px" }}
      status={status}
      canvasCamera={canvasCamera}
    />
  );
};

export const Step1Presenter = () => {
  return (
    <>
      <T>1. 十字を揃えよう</T>
      <B>以下がステップ1の完成形です</B>
      <StyledRubicModel status="CROSS" canvasCamera={{ position: [2.5, -3.5, 2.5] }} />
      <ScrambleModels scrambleList={["U", "F'", "", "B'"]} isKeepRotate={true} />
      {/* <ScrambleModels scrambleList={["R", "L"]} isKeepRotate={true} /> */}
    </>
  );
};
