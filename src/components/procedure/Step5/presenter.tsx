import { BodyTypography as B } from "../../parts/BodyTypography/container";
import { TitleTypography as T } from "../../parts/TitleTypography/container";
import { SubTitleTypography as ST } from "../../parts/SubTitleTypography/container";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBox } from "../BorderBox/container";
import { StyledRubicModel } from "../StyledRubicModel/container";
import { StyledScrambleModels } from "../StyledScrambleModels/container";
import { OllModel } from "../../rubicModel/OllModel/container";

export const Step5Presenter = () => {
  return (
    <>
      <T pageTop={true}>ステップ5：上面を完成させよう</T>
      <B>以下がステップ5の完成形です。</B>
      <B> ↓ マウスで動かして全体像を確認しよう！</B>
      <StyledRubicModel
        status="TOP_ALL"
        canvasCamera={{ position: [2.5, 2.7, 2.5] }}
        isRotate={true}
      />

      <T>黄色コーナーのパターン</T>
      <B>十字を揃えた後の上面の黄色コーナーのパターンは大きく分けて2つに分かれます</B>
      <BorderBox>
        <ST>1個だけ揃っているパターン</ST>
        <B>黄色十字に加えて１箇所だけ上面が揃っている状態です</B>
        <Box component="div" display="flex">
          <OllModel status="CROSS_1_EX1" />
          <OllModel status="CROSS_1_EX2" />
        </Box>
      </BorderBox>

      <BorderBox>
        <ST>0個または2個揃っているパターン</ST>
        <B>上面が黄色十字のみ、もしくは黄色十字と2箇所上面が揃っている状態</B>
        <Box component="div" display="flex">
          <OllModel status="CROSS_0_EX1" />
          <OllModel status="CROSS_2_EX1" />
        </Box>
        <B>など</B>
      </BorderBox>

      <T>黄色面の揃え方</T>
      <BorderBox>
        <ST>0個または2個揃っているパターン</ST>
        <Box component="div" display="flex">
          <OllModel status="CROSS_0_EX1_A" />
          <OllModel status="CROSS_0_EX2_A" />
        </Box>
        <Box component="div" display="flex">
          <OllModel status="CROSS_2_EX1_A" />
          <OllModel status="CROSS_2_EX2_A" />
          <OllModel status="CROSS_2_EX3_A" />
        </Box>
        <B>左手前コーナーの黄色面が手前に来る様にして持ち、以下の手順(スーン)を回しましょう</B>
        <B>
          1個だけ揃っているパターンになるまで、左手前コーナーの黄色面が手前に来る様に持ち替え、手順(スーン)を繰り返し行います
        </B>
        <StyledScrambleModels
          status="TOP_CROSS_02"
          supportTextList={["スーン"]}
          scrambleList={["", "(", "R", "U", "R'", "U", "R", "U2", "R'", ")", ""]}
          isKeepRotate={true}
        />
        <B>※上の例は1回の手順(スーン)で1個だけ揃っているパターンになる例です。</B>
        <B>
          1回でコーナー1個だけ揃っているパターンにならない場合は、再度左手前コーナーの黄色面が手前に来る様にして持ち、手順(スーン)を回しましょう
        </B>
      </BorderBox>

      <BorderBox>
        <ST>1個揃っているパターン</ST>
        <Box component="div" display="flex">
          <OllModel status="CROSS_1_EX1_A" />
          <OllModel status="CROSS_1_EX2_A" />
        </Box>
        <B>1個だけ揃っている上面黄色が左手前に来る様にして持ち、手順(スーン)を回しましょう</B>
        <B>
          スーンを回した後も再度1個だけ揃っているパターンになったら、再度1個だけ揃っている上面黄色が左手前に来る様にして持ち、手順(スーン)を回しましょう
        </B>
        <StyledScrambleModels
          status="TOP_CROSS_1"
          supportTextList={["スーン"]}
          scrambleList={["", "(", "R", "U", "R'", "U", "R", "U2", "R'", ")", ""]}
          isKeepRotate={true}
        />
        <B>
          ※上の例では1回の手順(スーン)で上面が揃いましたが、再度1個だけ揃うパターンになる場合もあります。その場合は、再度1個だけ揃っている上面黄色が左手前に来る様にして持ち、手順(スーン)を回しましょう
        </B>
      </BorderBox>

      <B>
        無事上面黄色が揃えられたら、次の
        <Typography component={Link} to="/procedure/6" sx={{ fontWeight: "bold" }}>
          ステップ6
        </Typography>
        に進みましょう！
      </B>

      <Box component="div" sx={{ height: "200px" }}></Box>
    </>
  );
};
