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

export const Step7Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ7：6面を完成させよう</T>
      <B>以下がステップ6の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel canvasCamera={{ position: [2.5, 2.7, 2.5] }} isRotate={true} />

      <T>黄色エッジのパターン</T>
      <B>上段側面のパターンは、大きく2つのパターンがあります</B>
      <Box component="div" display="flex">
        <STandOllModel st="揃ってる側面なし" status="PLL_EDGE_0_FULL" />
        <STandOllModel st="1面だけ完全に揃ってる" status="PLL_EDGE_1_FULL" />
      </Box>

      <T>上段側面の揃え方</T>
      <BorderBox>
        <ST>「揃ってる側面なし」のパターン</ST>
        <OllModel status="PLL_EDGE_0_FULL" />

        <B>黄色面を上にして持ち、以下の手順を回しましょう（向きはどこでも大丈夫です）</B>
        <StyledScrambleModels
          status="PLL_EDGE_0_FULL"
          supportTextList={["スーン", "左右対称,スーン"]}
          scrambleList={[
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
            "y",
            "changelookFrom",
            "(",
            "L'",
            "U'",
            "L",
            "U'",
            "L'",
            "U2",
            "L",
            ")",
            "",
          ]}
          isKeepRotate={true}
        />
        <B>
          「揃ってる側面なし」のパターンから上記手順を回すと、「1面だけ揃ってる」パターンになるはずです（上記例だと青面が揃ってますね）
        </B>
      </BorderBox>

      <BorderBox>
        <ST>「1面だけ揃ってる」のパターン</ST>
        <OllModel status="PLL_EDGE_1_FULL" />

        <B>黄色面を上にし、揃っている面を後ろにして持ち、以下の手順を回しましょう</B>
        <StyledScrambleModels
          status="PLL_EDGE_1_FULL"
          supportTextList={["スーン", "左右対称,スーン"]}
          scrambleList={[
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
            "y",
            "changelookFrom",
            "(",
            "L'",
            "U'",
            "L",
            "U'",
            "L'",
            "U2",
            "L",
            ")",
            "",
          ]}
          isKeepRotate={true}
        />
        <B>
          上記手順を回した後でも、再度「1面だけ揃ってる」のパターンになった場合は、再度揃っている面を後ろにして持ち、同じ上記手順を回しましょう。最低でも2回の繰り返しで6面揃うはずです
        </B>
      </BorderBox>

      <T>6面揃えられたら</T>
      <B>無事揃えられた方おめでとうございます！</B>
      <B>次のステップはまず、手順を覚えることです</B>
      <B>
        左回り/右回りのセクシームーブ、スーン、それらを使う箇所を覚えれば、手順を見ずに6面揃えられるようになります！
      </B>

      <T>手順を見ずに6面揃えられるようになったら</T>
      <B>
        見ないでも揃えられるようになったら
        <Typography component={Link} to="/" sx={{ fontWeight: "bold" }}>
          トップページ
        </Typography>
        でタイムを測ってみましょう！
      </B>
      <B>
        トップページにはタイマーの下に
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          スクランブル
        </Typography>
        といって、崩すための手順も表示されます。
      </B>
      <B>スペースキーを押すとタイマーがスタートストップできるのでぜひやってみてね</B>
      <B>
        もっと速く揃えられるようになりたい人は、
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          CFOP法、LBL法
        </Typography>
        などをネットで調べてみましょう
      </B>
      <Box component="div" sx={{ height: "20px" }}></Box>
      <B>それでは良いルービックキューブライフを！</B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
