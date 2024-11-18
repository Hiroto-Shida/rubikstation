import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Stack, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBox } from "../BorderBox/container";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { OllModel } from "../../rubicModel/OllModel/container";

const STandOllModel = ({ st, status }: { st: string; status: string }) => {
  return (
    <Stack m={(theme: Theme) => theme.spacing(1)}>
      <ST>{st}</ST>
      <OllModel status={status} />
    </Stack>
  );
};

export const Step4Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ4：上面十字を作ろう</T>
      <B>以下がステップ4の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="TOP_CROSS"
        canvasCamera={{ position: [2.5, 2.7, 2.5] }}
        isRotate={true}
      />

      <T>上面十字のパターン</T>
      <B>上面の黄色の並び方のパターンは大きく分けて以下の4つに分かれます</B>
      <Box
        component="div"
        display="flex"
        style={{
          flexWrap: "wrap",
        }}
      >
        <STandOllModel st="ドット型" status="DOT" />
        <STandOllModel st="ライン型" status="LINE" />
        <STandOllModel st="L字型" status="L" />
        <STandOllModel st="十字型" status="TOP_CROSS" />
      </Box>
      <B>
        ここでのパターンとは「少なくともそのパターンは揃ってる」状態のことを指します
      </B>
      <B>なので例えば以下のような場合もそれぞれのパターンに当てはまります</B>
      <Box component="div" display="flex">
        <STandOllModel st="ドット型" status="DOT_EX" />
        <STandOllModel st="ライン型" status="LINE_EX" />
      </Box>

      <B>
        また、すでに[十字型]になっている人はこのステップはスキップして
        <Typography
          component={Link}
          to="/procedure/5"
          sx={{ fontWeight: "bold" }}
        >
          ステップ5
        </Typography>
        に進みましょう！
      </B>

      <T>それぞれのパターンからの揃え方</T>
      <B>実はどのパターンからでも同じ手順を繰り返すことで十字が揃えられます</B>
      <B>
        「ドット型」→「ライン型」→「L字型」→「十字型」の順で揃うので、自分のキューブの状態から以下の手順を回しましょう
      </B>
      <BorderBox>
        <ST>ドット型の場合</ST>
        <OllModel status="DOT" />
        <B>黄色面を上にして以下手順を回しましょう</B>
        <StyledScrambleModels
          status="TOP_DOT"
          supportTextList={["右回りの,逆セクシー"]}
          scrambleList={["", "F", "(", "U", "R", "U'", "R'", ")", "F'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>
      <BorderBox>
        <ST>ライン型の場合</ST>
        <OllModel status="LINE" />
        <B>黄色面を上にし、かつラインが横向きにして持ってから、回しましょう</B>
        <StyledScrambleModels
          status="TOP_LINE"
          supportTextList={["右回りの,逆セクシー"]}
          scrambleList={["", "F", "(", "U", "R", "U'", "R'", ")", "F'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>
      <BorderBox>
        <ST>L字型の場合</ST>
        <OllModel status="L" />
        <B>
          黄色面を上にし、かつL字が9時(🕘)の形にして持ってから、回しましょう
        </B>
        <StyledScrambleModels
          status="TOP_L"
          supportTextList={["右回りの,逆セクシー"]}
          scrambleList={["", "F", "(", "U", "R", "U'", "R'", ")", "F'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>

      <B>
        無事上面十字が揃えられたら、次の
        <Typography
          component={Link}
          to="/procedure/5"
          sx={{ fontWeight: "bold" }}
        >
          ステップ5
        </Typography>
        に進みましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
