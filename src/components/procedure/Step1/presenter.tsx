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
  scrambleList,
  isKeepRotate,
  border,
}: Pick<
  ComponentProps<typeof ScrambleModels>,
  "status" | "scrambleList" | "isKeepRotate"
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
      <B>
        白面を上にした時、横の面の中心の色は時計回りに"青"→"赤"→"緑"→"オレンジ"となっています。
      </B>
      <B>なのでこの順番を意識して揃えていきましょう！</B>
      {/* <B>※本揃え方の手順ではこの配色で説明していきます。違う配色の方は適宜読み替えてください</B> */}

      <T>白十字の基本的な揃え方</T>
      <B>まず白のセンターキューブを上にしてキューブを持ちましょう。</B>
      <B>
        次に白色を含むエッジキューブを探し、上の白面に向かって揃えていきましょう。
      </B>
      {/* <B>パターン1. 入れたいキューブが中央の段にある場合</B> */}
      <BorderBox>
        <ST>パターン1：入れたいキューブが中央の段にある場合</ST>
        <StyledScrambleModels
          status="CROSS_CENTER_EX1"
          scrambleList={["", "R", ""]}
          isKeepRotate={true}
        />
        <StyledScrambleModels
          status="CROSS_CENTER_EX2"
          scrambleList={["", "F'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>

      <BorderBox>
        <ST>
          パターン2：入れたいキューブが、上の段または下の段にあり、白面が横を向いている場合
        </ST>
        <B>上の段にある例</B>
        <StyledScrambleModels
          status="CROSS_BOTTOM_SIDE_EX1"
          scrambleList={["", "F", "R", ""]}
          isKeepRotate={true}
        />
        <B>下の段にある例</B>
        <StyledScrambleModels
          status="CROSS_BOTTOM_SIDE_EX2"
          scrambleList={["", "R", "F'", ""]}
          isKeepRotate={true}
        />
      </BorderBox>

      <BorderBox>
        <ST>
          パターン3. 入れたいキューブが下の段にあり、白面が下を向いている場合
        </ST>
        <StyledScrambleModels
          status="CROSS_BOTTOM_BOTTOM"
          scrambleList={["", "R2", ""]}
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
        正しい順番で各4キューブ(白青、白赤、白緑、白オレンジ)を上段に入れられたら、上段を何回か回してみよう
      </B>
      <B>以下の例は1回回すことで十字が揃ってますね</B>
      <StyledScrambleModels
        status="CROSS_CONFIRM"
        scrambleList={["", "U", ""]}
        isKeepRotate={true}
      />
      <B>正しく揃えられていれば十字が揃っているはずです！</B>
      <B>
        もし何度上段を回しても十字ができない場合は、白を含む4キューブを正しい配置に置けてないかもしれません
      </B>
      <B>先ほどの手順に戻って、正しい配置に揃え直してみましょう！</B>
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
