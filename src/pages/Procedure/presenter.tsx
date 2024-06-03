import { Typography, Divider, Box } from "@mui/material";
import { RubicModel } from "../../components/rubicModel/RubicModel/container";
import { ComponentProps, ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import F2L_LEFT from "/F2L_LEFT.png";
import F2L_RIGHT from "/F2L_RIGHT.png";
import { Step1 } from "../../components/procedure/Step1/container";
import { Step2 } from "../../components/procedure/Step2/container";

const marginTopStyle = (theme: Theme) => ({
  marginTop: theme.spacing(4),
});

const StyledRubicModel = ({
  status,
  canvasCamera,
}: Pick<ComponentProps<typeof RubicModel>, "status" | "canvasCamera">) => {
  return (
    <RubicModel
      canvasStyle={{ width: "200px", height: "200px" }}
      status={status}
      canvasCamera={canvasCamera}
    />
  );
};

type Props = {
  step: string | undefined;
};

export const ProcedurePagePresenter = ({ step }: Props) => {
  return (
    <>
      {step === "1" && <Step1 />}
      {step === "2" && <Step2 />}
    </>
  );
};
