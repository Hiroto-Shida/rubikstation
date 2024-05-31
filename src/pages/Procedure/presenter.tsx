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

const TitleTypography = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box component="div" sx={(theme) => marginTopStyle(theme)} />
      <Typography variant="h6" align="left">
        {children}
      </Typography>
    </>
  );
};

const BodyTypography = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="body1" align="left">
      {children}
    </Typography>
  );
};

type Props = {
  step: string | undefined;
};

export const ProcedurePagePresenter = ({ step }: Props) => {
  return (
    <>
      <Typography variant="h4" align="left">
        6面までの手順
      </Typography>
      {step === "step1" && <Step1 />}
      {step === "step2" && <Step2 />}
      {/* <Divider sx={{ mb: 4 }} />
      <TitleTypography>1. まずは完全一面を揃えよう！(完成系)</TitleTypography>
      <StyledRubicModel status="F1L" />
      <BodyTypography>↑マウスで動かせるよ</BodyTypography>

      <TitleTypography>2. 完全ニ面を揃えよう！(完成系)</TitleTypography>
      <StyledRubicModel status="F2L" />

      <Box component="div" display="flex" justifyContent="left" alignItems="left">
        <img src={F2L_LEFT} style={{ width: "500px" }} alt="F2L_LEFT"></img>
        <img src={F2L_RIGHT} style={{ width: "500px" }} alt="F2L_RIGHT"></img>
      </Box> */}

      {/* <BodyTypography>2.1 パターン1</BodyTypography>
      <StyledRubicModel
        status="F2L_LEFT"
        canvasCamera={{ position: [-3, 2.8, 3] }}
      />
      <BodyTypography>↓手順</BodyTypography>

      <Grid container>
        {["U'", "L'", "U", "L", "U", "F", "U'", "F'"].map((moveChar, index) => (
          <RubicModel
            key={index}
            moveChar={moveChar}
            axis={false}
            cameraControls={false}
            canvasCamera={{ position: [-3, 2.8, 3] }}
          />
        ))}
      </Grid> */}

      {/* <BodyTypography>2.2 パターン2</BodyTypography>
      <StyledRubicModel
        status="F2L_RIGHT"
        canvasCamera={{ position: [3, 2.8, 3] }}
      />
      <BodyTypography>↓手順</BodyTypography>

      <Grid container>
        {["U", "R", "U'", "R'", "U'", "F'", "U", "F"].map((moveChar, index) => (
          <RubicModel
            key={index}
            moveChar={moveChar}
            axis={false}
            cameraControls={false}
          />
        ))}
      </Grid> */}
    </>
  );
};
