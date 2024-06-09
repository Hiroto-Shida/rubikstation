import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBox } from "../BorderBox/container";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { OllModel } from "../../rubicModel/OllModel/container";

export const Step4Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ4：上面十字を作ろう</T>
      <B>以下がステップ4の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="YELLOW_CROSS"
        canvasCamera={{ position: [2.5, -2.7, 2.5] }}
        isRotate={true}
      />

      <T>完全2面の揃え方</T>
      <OllModel status="YELLOW_CROSS" />
    </>
  );
};
