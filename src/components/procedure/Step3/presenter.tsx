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
}: Pick<
  ComponentProps<typeof RubicModel>,
  "status" | "canvasCamera" | "isRotate"
>) => {
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
  supportTextList,
  scrambleList,
  isKeepRotate,
  border,
}: Pick<
  ComponentProps<typeof ScrambleModels>,
  "status" | "supportTextList" | "scrambleList" | "isKeepRotate"
> & {
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
      <ScrambleModels
        status={status}
        supportTextList={supportTextList}
        scrambleList={scrambleList}
        isKeepRotate={isKeepRotate}
      />
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

export const Step3Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ3：完全2面を作ろう</T>
      <B>以下がステップ3の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="F2L"
        canvasCamera={{ position: [2.5, -2.7, 2.5] }}
        isRotate={true}
      />

      <T>完全2面の揃え方</T>
      <B>まずは前のステップと同様に白面を下にして持ちましょう</B>
      <B>
        その後は、入れたいエッジのキューブを探し、その側面の色が揃うように持ち替えましょう
      </B>
      <BorderBox>
        <ST>
          例：青赤のエッジキューブを見つけ、側面の青とセンターキューブの青を揃える
        </ST>
        <StyledScrambleModels
          status="F2L_READY_EX1"
          scrambleList={["", "U", ""]}
          isKeepRotate={true}
        />
        <ST>
          例：オレンジ緑のエッジキューブを見つけ、側面のオレンジとセンターキューブのオレンジを揃える
        </ST>
        <StyledScrambleModels
          status="F2L_READY_EX2"
          scrambleList={["", "U2", ""]}
          isKeepRotate={true}
        />
      </BorderBox>

      <B>
        持ち替えが済んだら、そのあとは以下の2パターンのどちらかで揃えることができます
      </B>
      <BorderBox>
        <ST>右下のエッジに入れたい場合</ST>
        <StyledScrambleModels
          status="F2L_LEFT"
          supportTextList={["右回りの逆セクシー", "左回りの逆セクシー"]}
          scrambleList={[
            "",
            "(",
            "U",
            "R",
            "U'",
            "R'",
            ")",
            "",
            "(",
            "U'",
            "F'",
            "U",
            "F",
            ")",
          ]}
          isKeepRotate={true}
        />
        <ST>左下のエッジに入れたい場合</ST>
        <StyledScrambleModels
          status="F2L_RIGHT"
          supportTextList={["左回りの逆セクシー", "右回りの逆セクシー"]}
          scrambleList={[
            "",
            "(",
            "U'",
            "F'",
            "U",
            "F",
            ")",
            "",
            "(",
            "U",
            "R",
            "U'",
            "R'",
            ")",
            "",
          ]}
          isKeepRotate={true}
        />
      </BorderBox>

      <B>
        無事完全2面が揃えられたら、次の
        <Typography
          component={Link}
          to="/procedure/4"
          sx={{ fontWeight: "bold" }}
        >
          ステップ4
        </Typography>
        に進みましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
