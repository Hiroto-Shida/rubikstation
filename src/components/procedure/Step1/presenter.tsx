import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { BorderBox } from "../BorderBox/container";
import { OllModel } from "../../rubicModel/OllModel/container";

export const Step1Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ1：十字を揃えよう</T>
      <B>以下がステップ1の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="CROSS"
        canvasCamera={{ position: [2.5, 3, 2.5] }}
        isRotate={true}
      />
      <B>キューブはどんなに動かしても中心の色の配置は変わりません。</B>
      <B>↓最終的に白十字を揃えた時の上から見た図↓</B>
      <OllModel status="WHITE_CROSS" />
      <B>
        白面のエッジキューブのペアの色は時計回りに"青"→"赤"→"緑"→"オレンジ"となっています。
      </B>
      <B>なのでこの順番を意識して揃えていきましょう！</B>

      <T>白十字の基本的な揃え方</T>
      <B>まず白のセンターキューブを上にしてキューブを持ちましょう。</B>
      <B>
        次に白色を含むエッジキューブを探し、上の白面に向かって揃えていきましょう。
      </B>
      <BorderBox>
        <ST>パターン1：入れたいキューブが中央の段にある場合</ST>
        <B>上の白面に向かって1回まわすだけで揃う、一番簡単なパターンです</B>
        <StyledScrambleModels
          status="CROSS_CENTER_EX1"
          scrambleList={["", "R", ""]}
          isKeepRotate={true}
        />
        <StyledScrambleModels
          status="CROSS_CENTER_EX2"
          scrambleList={["", "L'", ""]}
          isKeepRotate={true}
          lookfromRight={false}
        />
      </BorderBox>

      <BorderBox>
        <ST>
          パターン2：入れたいキューブが、上の段または下の段にあり、白面が横を向いている場合
        </ST>
        <B>
          入れたいキューブがある面を右か左に回してから、上の白面に向かって回し入れましょう
        </B>
        <StyledScrambleModels
          status="CROSS_BOTTOM_SIDE_EX1"
          scrambleList={["", "F", "R", ""]}
          isKeepRotate={true}
        />
        <StyledScrambleModels
          status="CROSS_BOTTOM_SIDE_EX2"
          scrambleList={["", "F", "L'", ""]}
          isKeepRotate={true}
          lookfromRight={false}
        />
      </BorderBox>

      <BorderBox>
        <ST>
          パターン3. 入れたいキューブが下の段にあり、白面が下を向いている場合
        </ST>
        <B>
          入れたいキューブの白面が下を向いている場合は、2回転することでその真上に持って来れます
        </B>
        <StyledScrambleModels
          status="CROSS_BOTTOM_BOTTOM"
          scrambleList={["", "F2", ""]}
          isKeepRotate={true}
        />
        <B>
          入れたい先の真下ではない時は、下の面を回転してから、上に2回転しましょう
        </B>
        <B>
          下の例では下面を動かしてから2回転することで、上面の右側にキューブを持ってくることができてますね
        </B>
        <StyledScrambleModels
          status="CROSS_BOTTOM_BOTTOM"
          scrambleList={["", "D", "R2", ""]}
          isKeepRotate={true}
        />
      </BorderBox>

      <T>白十字を崩さず４箇所揃えるコツ</T>
      <B>
        冒頭でもすこし触れたように、白面を上にした時、横の面の色は"青"→"赤"→"緑"→"オレンジ"と決まっています。
      </B>
      <B>
        入れる場所と順番を意識しつつ、すでに正しく揃えたキューブはどかさない様に揃えていきましょう。
      </B>
      <BorderBox>
        <ST>NG例1</ST>
        <B>
          以下の例は、白青のキューブを上面に持っていくことはできてますが、青面の隣に緑面があり正しい配置順ではありません。
        </B>
        <B>
          さらには、すでに揃っている白赤のキューブまでずらしてしまっています。
        </B>
        <StyledScrambleModels
          status="CROSS_PRACTICE_1"
          scrambleList={["", "R", ""]}
          isKeepRotate={true}
          border="error"
        />
        <ST>良い例1</ST>
        <B>上面をずらしてから、白青のキューブを安全に揃えましょう。</B>
        <StyledScrambleModels
          status="CROSS_PRACTICE_1"
          scrambleList={["", "U", "R", ""]}
          isKeepRotate={true}
          border="success"
        />
      </BorderBox>
      <BorderBox>
        <ST>良い例2</ST>
        <B>
          上面をしっかりずらしてから、白青のキューブを入れられています。
          反対側でわかりづらいですが、青"→"赤"→"緑"の順番通りで良いですね。
        </B>
        <StyledScrambleModels
          status="CROSS_PRACTICE_2"
          scrambleList={["", "U2", "R", "F'", ""]}
          isKeepRotate={true}
          border="success"
        />
        <ST>良い例3</ST>
        <B>
          白オレンジのキューブを中央の段にどかし、上の面を安全に動かした後に白オレンジのキューブを上面に入れることができてますね。
        </B>
        <StyledScrambleModels
          status="CROSS_PRACTICE_3"
          scrambleList={["", "F", "U'", "R", ""]}
          isKeepRotate={true}
          border="success"
        />
      </BorderBox>

      <T>十字が揃っているか確認しよう</T>
      <B>
        正しい順番で各4キューブ(白青、白赤、白緑、白オレンジ)を上段に入れられたら、上段を何回か回してみましょう
      </B>
      <B>以下の例は1回回すことで十字が揃ってますね</B>
      <StyledScrambleModels
        status="CROSS_CONFIRM"
        scrambleList={["", "U", ""]}
        isKeepRotate={true}
      />
      <B>正しく揃えられていれば十字が揃っているはずです！</B>
      <T>十字が正しく揃わない場合</T>
      <B>
        もし何度上段を回しても十字ができない場合は、白を含む4キューブを正しい配置に置けていません
      </B>
      <B>
        4箇所すでに入れてしまった場合は以下のような手順で正しい位置に直しましょう
      </B>
      <BorderBox>
        <ST>例：オレンジと青のエッジキューブの位置の入れ替え</ST>
        <B>
          以下のようにエッジキューブを下面に移動させてから別の場所に入れ直すことで、キューブを正しい箇所に移動できます
        </B>
        <StyledScrambleModels
          status="CROSS_REPAIR"
          scrambleList={["", "F2", "D", "R2", "", "D'", "F2", ""]}
          isKeepRotate={true}
        />
      </BorderBox>
      <StyledRubicModel
        status="CROSS"
        canvasCamera={{ position: [2.5, 3, 2.5] }}
        isRotate={true}
      />

      <B>
        無事十字が揃えられたら、次の
        <Typography
          component={Link}
          to="/procedure/2"
          sx={{ fontWeight: "bold" }}
        >
          ステップ2
        </Typography>
        に進みましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
