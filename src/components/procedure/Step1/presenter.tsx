import { ComponentProps } from "react";
import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { ScrambleModels } from "../../scramble/ScrambleModels/container";
import { RubicModel } from "../../rubicModel/RubicModel/container";
import { Box } from "@mui/material";

const StyledRubicModel = ({
  status,
  canvasCamera,
  isRotate,
}: Pick<ComponentProps<typeof RubicModel>, "status" | "canvasCamera" | "isRotate">) => {
  return (
    <Box component="div" sx={(theme) => ({ mt: theme.spacing(1) })}>
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
}: Pick<ComponentProps<typeof ScrambleModels>, "status" | "scrambleList" | "isKeepRotate">) => {
  return (
    <Box component="div" sx={(theme) => ({ mt: theme.spacing(1) })}>
      <ScrambleModels status={status} scrambleList={scrambleList} isKeepRotate={isKeepRotate} />
    </Box>
  );
};

export const Step1Presenter = () => {
  return (
    <>
      <T>十字を揃えよう</T>
      <B>以下がステップ1の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel status="CROSS" canvasCamera={{ position: [2.5, 3, 2.5] }} isRotate={true} />
      <B>ルービックキューブはどんなに動かしても中心の色の配置は変わりません</B>
      <B>白面を上にした時、横の面の中心の色は時計回りに"青"→"赤"→"緑"→"オレンジ"となっています。</B>
      <B>そして白面の裏側の中心は"黄"になっています</B>
      <B>※本揃え方の手順ではこの配色で説明していきます。違う配色の方は適宜読み替えてください</B>

      <T>白十字の揃え方</T>
      <B>まず白のセンターキューブを上にしてキューブを持ちましょう</B>
      <B>次に白色を含むエッジキューブを探し、上の白面に向かって揃えていきましょう</B>
      <B>パターン1. 入れたいキューブが中央の段にある場合</B>
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

      <B>
        パターン2.
        入れたいキューブが、上の段または下の段にあり、白面が横を向いている時は、2手で上の段に入れられます
      </B>
      <B>上の段にある例</B>
      <StyledScrambleModels
        status="CROSS_BOTTOM_SIDE_EX1"
        scrambleList={["", "F'", "R", ""]}
        isKeepRotate={true}
      />
      <B>下の段にある例</B>
      <StyledScrambleModels
        status="CROSS_BOTTOM_SIDE_EX2"
        scrambleList={["", "R", "F'", ""]}
        isKeepRotate={true}
      />

      <B>
        パターン3.
        入れたいキューブが下の段にあり、白面が下を向いている時は、2回転することで上の段に入れられます
      </B>
      <StyledScrambleModels
        status="CROSS_BOTTOM_BOTTOM"
        scrambleList={["", "R2", ""]}
        isKeepRotate={true}
      />

      {/* <ScrambleModels scrambleList={["R", "L"]} isKeepRotate={true} /> */}
    </>
  );
};
