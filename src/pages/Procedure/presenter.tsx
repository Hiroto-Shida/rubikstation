import React from "react";
import { Introduction } from "../../components/procedure/Introduction/container";
import { Step1 } from "../../components/procedure/Step1/container";
import { Step2 } from "../../components/procedure/Step2/container";
import { Step3 } from "../../components/procedure/Step3/container";
import { Step4 } from "../../components/procedure/Step4/container";
import { Step5 } from "../../components/procedure/Step5/container";
import { Step6 } from "../../components/procedure/Step6/container";
import { Step7 } from "../../components/procedure/Step7/container";

type Props = {
  step: string | undefined;
};

export const ProcedurePagePresenter = React.memo(({ step }: Props) => {
  return (
    <>
      {step === "introduction" && <Introduction />}
      {step === "1" && <Step1 />}
      {step === "2" && <Step2 />}
      {step === "3" && <Step3 />}
      {step === "4" && <Step4 />}
      {step === "5" && <Step5 />}
      {step === "6" && <Step6 />}
      {step === "7" && <Step7 />}
    </>
  );
});
