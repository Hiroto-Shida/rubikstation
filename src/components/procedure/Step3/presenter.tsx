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
      <T pageTop={true}>ステップ3：完全2段を作ろう</T>
      <B>以下がステップ3の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="F2L"
        canvasCamera={{ position: [2.5, -2.7, 2.5] }}
        isRotate={true}
      />

      <T>完全2段の揃え方</T>
      <B>まずは前のステップと同様に白面を下にして持ちましょう</B>
      <B>
        その後は、入れたいエッジキューブを探し、その側面の色が揃うように持ち替えましょう
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
        <ST>パターン1：右下のエッジに入れたい場合</ST>
        <B>
          途中の[y]は単に持ち替えです。下の例だと最初青面を正面にしてますが、[y]の後は赤面が正面になるように持ち替えています。
        </B>
        <B>
          持ち替え[y]後はコーナーキューブの白が正面になっているのがポイントです。
        </B>
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
        <ST>パターン2：左下のエッジに入れたい場合</ST>
        <B>
          途中の[y']は単に持ち替えです。下の例だと最初オレンジ面を正面にしてますが、[y']の後は緑面が正面になるように持ち替えています。
        </B>
        <B>
          持ち替え[y']後はコーナーキューブの白が正面になっているのがポイントです。
        </B>
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

      <T>入れたいエッジキューブが上段にない場合</T>
      <B>
        入れたいエッジキューブが上段にない場合、中段のエッジに異なる向きで入っているはずです
      </B>
      <ST>状況例</ST>
      <B>左の例は入れたいエッジキューブが逆向きで入ってしまっています</B>
      <B>
        右の例は他の箇所に入れたい緑赤のエッジキューブが入ってしまっています
      </B>
      <Box
        component="div"
        display="flex"
        sx={{
          flexWrap: "wrap",
        }}
      >
        <StyledScrambleModels
          status="F2L_NG1"
          scrambleList={[""]}
          isKeepRotate={true}
        />
        <Box component="div" sx={{ width: "20px" }}></Box>
        <StyledScrambleModels
          status="F2L_NG2"
          scrambleList={[""]}
          isKeepRotate={true}
          lookfromRight={false}
        />
      </Box>
      <B>対処法はシンプルです。</B>
      <B>
        上記で説明した「パターン1：右下のエッジに入れたい場合」または「パターン2：左下のエッジに入れたい場合」の手順をすることで、中断の誤って入ってしまっているキューブは上段に移動させられます
      </B>
      <BorderBox>
        <ST>中断のエッジを上段に移動させる</ST>
        <B>手順はパターン1orパターン2と同じです。</B>
        <B>
          エッジキューブの位置を[右]側にして持つ場合は「パターン1：右下のエッジに入れたい場合」を回しましょう
        </B>
        <B>
          エッジキューブの位置を[左]側にして持つ場合は「パターン2：左下のエッジに入れたい場合」を回しましょう
        </B>
        <StyledScrambleModels
          status="F2L_NG1"
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
        <B>これで中断に入っていたエッジキューブは上段に移動しました。</B>
        <B>あとは、先ほどのパターン1orパターン2で揃えられますね！</B>
      </BorderBox>

      <B>
        無事完全2段が揃えられたら、次の
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
