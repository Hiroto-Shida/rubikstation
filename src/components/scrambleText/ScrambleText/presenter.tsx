import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { RunningStateContext } from "../../../pages/Index/presenter";

// 記号のリストと、「'そのまま'、'2回転'、'逆回転'」のオプションリスト
const MOVE_LIST: string[] = ["U", "F", "R", "D", "B", "L"]
const OPTION_MOVE_LIST: string[] = ["", "2", "'"]

// スクランブルの文字数 の 最小/最大 値
const MIN_MOVE = 10
const MAX_MOVE = 14

// 横に表示する最大 文字and画像 数
const ROW_MAX_LEGTH = 7

// min 以上 max 以下 の範囲のランダム整数を取得
const getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Listからランダムに値を取得
const getRandomValueFromList = (targetList: string[]): string => {
  return targetList[Math.floor(Math.random() * targetList.length)]
}

// スクランブルの記号リスト(ROW_MAX_LEGTH区切りの2次元配列)
const generateScrambleText = (): string[][] => {
  const scrambleSize = getRandomArbitrary(MIN_MOVE,MAX_MOVE)
  const textList: string[] = []

  let originChar = "" // ランダムに取り出した値かつ、直前値として格納
  for (let index = 0; index < scrambleSize; index++) {
    originChar = getRandomValueFromList(MOVE_LIST.filter(value => value !== originChar)) // 直前の記号以外からランダムに取得
    const optionChar = getRandomValueFromList(OPTION_MOVE_LIST)
    textList.push(originChar+optionChar)
  }

  const tmpMultiTextList: string[][] = []
  for (let index = 0; index < textList.length; index=index+ROW_MAX_LEGTH) {
    tmpMultiTextList.push(textList.slice(index, index+ROW_MAX_LEGTH))
  }
  return tmpMultiTextList
}


export const ScrambleTextPresenter = () => {
  const [multiTextList, setMultiTextList] = useState<string[][]>([[]])

  const runningState = useContext(RunningStateContext)

  useEffect(() => {
    if (runningState.isStay) {
      setMultiTextList(generateScrambleText());
    }else{
      setMultiTextList([[]]);
    }
  }, [runningState]);

  if (runningState.isStarted) {
    return (
      <>
        <Typography variant="h4">
          Press Space
        </Typography>
      </>
    )
  }

  if (runningState.isPause) {
    return (
      <></>
    )
  }

  if (runningState.isStay) {
    return (
      <>
        {multiTextList[0].length ? (
          <>
          {multiTextList.map((childList, index) => (
            <Typography variant="h4" key={index}>
              {childList.join(' ')}
            </Typography>
          ))}
          <ImageList cols={ROW_MAX_LEGTH} rowHeight={100}>
            {multiTextList.map((childList) => (
              childList.map((moveName, index) => (
                <ImageListItem key={index}>
                  <img
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    srcSet={`/move_images/${moveName}.png 268w`}
                    src={`/move_images/${moveName}.png`}
                    alt={moveName}
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            ))}
          </ImageList>
        </>
        ) : (
          <Typography variant="h4">
            Press Space
          </Typography>
        )}
      </>
    )
  }
};