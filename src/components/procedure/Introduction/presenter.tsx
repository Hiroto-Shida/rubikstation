import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { BorderBox } from "../BorderBox/container";

const STandRubicModel = ({
  orthographic,
  cameraControls,
  st,
  status,
  isRotate = false,
}: {
  orthographic?: boolean;
  cameraControls?: boolean;
  st: string;
  status: string;
  isRotate?: boolean;
}) => {
  return (
    <Stack m={(theme) => theme.spacing(1)}>
      <ST>{st}</ST>
      <StyledRubicModel
        orthographic={orthographic}
        cameraControls={cameraControls}
        canvasStyle={{ width: "200px", height: "200px" }}
        status={status}
        canvasCamera={{ position: [2, 2, 3] }}
        isRotate={isRotate}
      />
    </Stack>
  );
};

export const IntroductionPresenter = () => {
  return (
    <>
      <T pageTop={true}>はじめに</T>
      <B>ルービックキューブを揃えたいそこのあなた！</B>
      <B>ようこそ！ルービックキューブの世界へ！</B>
      <B>本記事ではまだ6面の揃え方を知らない初心者へ向けての手順書となります</B>

      <T>本当に6面揃えられるの？</T>
      <B>ご安心を！</B>
      <B>
        実は本記事のやり方だと、6面揃えるのに覚える手順はたったの
        <Typography component="span" sx={{ fontWeight: "bold", color: "red" }}>
          2手順
        </Typography>
        ！(ほぼ)
      </B>
      <B>なんとその2手順の組み合わせで6面まで揃えることができちゃいます</B>
      <B>なんだかいけそうでしょ？</B>

      <T>揃える前に知っておくと良いこと</T>
      <ST>ルービックキューブには2種類の配色がある</ST>
      <B>
        本記事では世界配色で説明を行なっています。日本配色のキューブの方は適宜色などを読み替えてください
      </B>

      <BorderBox>
        <Box component="div" display="flex">
          <STandRubicModel st="世界配色" status="WORLD_ALL" isRotate={true} />
          <Box component="div" m={2} />
          <STandRubicModel st="日本配色" status="JAPAN_ALL" isRotate={true} />
        </Box>
        <B>↑マウスで動かせるよ</B>
        <B>対面の色が、世界配色は黄⇄白、日本配色は青⇄白になってますね</B>
      </BorderBox>

      <ST>各キューブの名前</ST>
      <B>各キューブを3種の呼び方で分けます</B>
      <BorderBox>
        <Box component="div" display="flex">
          <STandRubicModel
            orthographic
            cameraControls={false}
            st="センターキューブ"
            status="CENTER_CUBE"
          />
          <Box component="div" m={2} />
          <STandRubicModel
            orthographic
            cameraControls={false}
            st="コーナーキューブ"
            status="CORNER_CUBE"
          />
          <Box component="div" m={2} />
          <STandRubicModel
            orthographic
            cameraControls={false}
            st="エッジキューブ"
            status="EDGE_CUBE"
          />
        </Box>
      </BorderBox>

      <ST>回転記号</ST>
      <B>ルービックキューブの回転にはそれぞれ記号が割り当てられています</B>
      <B>
        が、
        <Typography component="span" sx={{ fontWeight: "bold", color: "red" }}>
          本記事では矢印で図示してるので、覚えなくて大丈夫です！
        </Typography>
      </B>
      <B>
        ただ回転記号は世界共通なので、覚えると、他の手順を覚える時にも役立ちます
      </B>
      <B>気になる人は調べてみてね</B>
      <BorderBox>
        <ST>回転記号例(一部)</ST>
        <B>RはRight、LはLeft、UはUp、の頭文字</B>
        <B>
          プライム(')がついてると半時計周りになります(意外と覚えやすいかも？)
        </B>
        <StyledScrambleModels
          status="WORLD_ALL"
          scrambleList={["R", "R'", "L", "U"]}
        />
      </BorderBox>

      <Box component="div" sx={{ height: "20px" }}></Box>
      <B>
        それでは最初のステップ
        <Typography
          component={Link}
          to="/procedure/1"
          sx={{ fontWeight: "bold" }}
        >
          ステップ1
        </Typography>
        から始めましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
