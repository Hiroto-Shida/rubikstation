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
        status="TOP_ALL"
        canvasCamera={{ position: [2.5, 2.7, 2.5] }}
        isRotate={true}
      />

      <T>黄色コーナーのパターン</T>

      <B>
        無事上面黄色が揃えられたら、次の
        <Typography component={Link} to="/procedure/7" sx={{ fontWeight: "bold" }}>
          ステップ7
        </Typography>
        に進みましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
