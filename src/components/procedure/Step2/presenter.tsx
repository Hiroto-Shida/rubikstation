import { ComponentProps } from "react";
import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StyledRubicModel = ({
  status,
  canvasCamera,
  isRotate,
}: Pick<ComponentProps<typeof RubicModel>, "status" | "canvasCamera" | "isRotate">) => {
  return (
    <Box component="div" sx={(theme) => ({ m: `${theme.spacing(2)} 0` })}>
      <RubicModel
        canvasStyle={{ width: "300px", height: "300px" }}
        status={status}
        canvasCamera={canvasCamera}
        isRotate={isRotate}
      />
    </Box>
  );
};

const StyledScrambleModels = ({
  status,
  scrambleList,
  isKeepRotate,
  border,
}: Pick<ComponentProps<typeof ScrambleModels>, "status" | "scrambleList" | "isKeepRotate"> & {
  border?: "error" | "success";
}) => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        m: `${theme.spacing(1)} 0`,
        border: border ? 6 : 0,
        borderColor: border ? `${border}.main` : undefined,
      })}
    >
      <ScrambleModels status={status} scrambleList={scrambleList} isKeepRotate={isKeepRotate} />
    </Box>
  );
};

const BorderBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        border: "solid 2px #333333",
        padding: theme.spacing(2),
        m: `${theme.spacing(1)} 0`,
      })}
    >
      {children}
    </Box>
  );
};

export const Step2Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ2：完全1面を作ろう</T>
      <B>以下がステップ2の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="F1L"
        canvasCamera={{ position: [2.5, -2.7, 2.5] }}
        isRotate={true}
      />

      <T>白のコーナーキューブの揃え方</T>
      <B>大きく3パターンの状況があります。いずれかのパターンの該当する手順で揃えていきましょう</B>
      <BorderBox>
        <ST>パターン1：白面が横を向いており、白面の位置が横の面の 左 側にある場合</ST>
        <StyledScrambleModels
          status="F1L_SIDE_EX1"
          scrambleList={["", "U'", "F'", "U", "F", ""]}
          isKeepRotate={true}
        />
        <ST>パターン2：白面が横を向いており、白面の位置が横の面の 右 側にある場合</ST>
        <StyledScrambleModels
          status="F1L_SIDE_EX2"
          scrambleList={["", "U", "R", "U'", "R'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>
    </>
  );
};
