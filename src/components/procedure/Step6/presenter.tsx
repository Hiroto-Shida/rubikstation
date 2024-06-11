import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBox } from "../BorderBox/container";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { OllModel } from "../../rubicModel/OllModel/container";

const STandOllModel = ({ st, status }: { st: string; status: string }) => {
  return (
    <Stack m={(theme) => theme.spacing(1)}>
      <ST>{st}</ST>
      <OllModel status={status} />
    </Stack>
  );
};

export const Step6Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ6：ああ</T>
      <B>以下がステップ6の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="PLL_CORNER"
        canvasCamera={{ position: [2.5, 2.7, 2.5] }}
        isRotate={true}
      />

      <T>黄色コーナーのパターン</T>
      <B>上面の黄色を揃えた後の黄色コーナーのパターンは大きく3つに分かれます</B>

      <Box component="div" display="flex">
        <STandOllModel st="4ペア揃ってる" status="PLL_CORNER" />
        <STandOllModel st="ペアなし" status="PLL_CORNER_0_PAIRS" />
        <STandOllModel st="1ペア揃ってる" status="PLL_CORNER_1_PAIRS" />
      </Box>
      <B>
        例えば一番右の「1ペア揃ってる」パターンは左のオレンジだけが揃っています。各真ん中の色は関係ありません。
      </B>

      <B>
        すでに4ペア揃ってる人はこのステップはスキップして
        <Typography
          component={Link}
          to="/procedure/7"
          sx={{ fontWeight: "bold" }}
        >
          ステップ7
        </Typography>
        に進みましょう！
      </B>

      <T>黄色コーナーの揃え方</T>
      <BorderBox>
        <ST>ペアなしのパターン</ST>
        <OllModel status="PLL_CORNER_0_PAIRS" />

        <B>
          黄色面を上にして持ち、以下の手順を回しましょう（向きはどこでも大丈夫です）
        </B>
        <StyledScrambleModels
          status="PLL_CORNER_0_PAIRS"
          supportTextList={["右回りの逆セクシー", "スーン1回目(3手目まで)"]}
          scrambleList={[
            "",
            "L'",
            "(",
            "U",
            "R",
            "U'",
            "R'",
            ")",
            "L",
            "",
            "(",
            "R",
            "U",
            "R'",
            ")",
            "",
            "(",
            "R",
            "U",
            "R'",
            "U",
            "R",
            "U2",
            "R'",
            ")",
            "",
          ]}
          isKeepRotate={true}
        />
      </BorderBox>

      {/* <B>
        無事上面黄色が揃えられたら、次の
        <Typography
          component={Link}
          to="/procedure/7"
          sx={{ fontWeight: "bold" }}
        >
          ステップ7
        </Typography>
        に進みましょう！
      </B> */}

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
