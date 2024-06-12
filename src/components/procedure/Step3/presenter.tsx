import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBox } from "../BorderBox/container";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";

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
          lookfromRight={false}
        />
      </BorderBox>

      <B>
        持ち替えが済んだら、そのあとは以下の2パターンのどちらかで揃えることができます
      </B>
      <BorderBox>
        <ST>右下のエッジに入れたい場合</ST>
        <StyledScrambleModels
          status="F2L_LEFT"
          supportTextList={["右回りの,逆セクシー", "左回りの,逆セクシー"]}
          scrambleList={[
            "",
            "(",
            "U",
            "R",
            "U'",
            "R'",
            ")",
            "y",
            "changelookFrom",
            "(",
            "U'",
            "L'",
            "U",
            "L",
            ")",
            "",
          ]}
          isKeepRotate={true}
        />
        <ST>左下のエッジに入れたい場合</ST>
        <StyledScrambleModels
          status="F2L_RIGHT"
          supportTextList={["左回りの,逆セクシー", "右回りの,逆セクシー"]}
          scrambleList={[
            "",
            "(",
            "U'",
            "L'",
            "U",
            "L",
            ")",
            "y'",
            "changelookFrom",
            "(",
            "U",
            "R",
            "U'",
            "R'",
            ")",
            "",
          ]}
          isKeepRotate={true}
          lookfromRight={false}
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
