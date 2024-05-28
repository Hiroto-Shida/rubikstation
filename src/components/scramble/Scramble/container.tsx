import { useCallback, useContext, useEffect, useState } from "react";
import { ScramblePresenter } from "./presenter";
import { TimerStateContext } from "../../../providers/TimerStateProvider";
import { useCookies } from "react-cookie";

// 記号のリストと、「'そのまま'、'2回転'、'逆回転'」のオプションリスト
const MOVE_LIST: string[] = ["U", "F", "R", "D", "B", "L"];
const OPTION_MOVE_LIST: string[] = ["", "2", "'"];

// スクランブルの文字数 の 最小/最大 値
const MIN_MOVE = 10;
const MAX_MOVE = 14;

// 横に表示する最大 文字and画像 数
// const ROW_MAX_LEGTH = 7;

// min 以上 max 以下 の範囲のランダム整数を取得
const getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

// Listからランダムに値を取得
const getRandomValueFromList = (targetList: string[]): string => {
  return targetList[Math.floor(Math.random() * targetList.length)];
};

// スクランブルの記号リスト(ROW_MAX_LEGTH区切りの2次元配列)
const generateScrambleText = (): string[] => {
  const scrambleSize = getRandomArbitrary(MIN_MOVE, MAX_MOVE);
  const textList: string[] = [];

  let originChar = ""; // ランダムに取り出した値かつ、直前値として格納
  const disContinuousMoveMap: { [key: string]: string } = {
    F: "B",
    B: "F",
    R: "L",
    L: "R",
    U: "D",
    D: "U",
  };
  for (let index = 0; index < scrambleSize; index++) {
    originChar = getRandomValueFromList(
      MOVE_LIST.filter((value) => {
        const removeOptionPreMoveChar = originChar.match(/[F|B|R|L|U|D]/);
        const removeOptionNowMoveChar = value.match(/[F|B|R|L|U|D]/);
        if (removeOptionPreMoveChar && removeOptionNowMoveChar) {
          const preMove = removeOptionPreMoveChar[0];
          const nowMove = removeOptionNowMoveChar[0];
          return preMove !== nowMove && disContinuousMoveMap[preMove] !== nowMove;
        }
        return true;
      })
    ); // 直前の記号以外からランダムに取得
    const optionChar = getRandomValueFromList(OPTION_MOVE_LIST);
    textList.push(originChar + optionChar);
  }
  return textList;
};

type CookieTimeRecord = {
  scramble: string;
  time: string;
}[];

export const Scramble = () => {
  const [scrambleList, setScrambleList] = useState<string[]>([]);

  const timerState = useContext(TimerStateContext);
  const [cookies, setCookie, removeCookie] = useCookies();

  // TODO cookieSetting関数の無限ループを止めて、cookie処理を実装
  const cookieSetting = useCallback(() => {
    console.log("cookieSetting");
    const scrambleText = scrambleList.toString();

    const time_record_list: CookieTimeRecord = cookies["time_record"];
    if (
      Array.isArray(time_record_list) &&
      time_record_list[0].scramble &&
      time_record_list[0].time
    ) {
      // console.log(cookies["time_record"]);
      // console.log(cookies["time_record"].slice(-1)[0]);
      time_record_list.push({ scramble: scrambleText, time: "00:00:00" });
      setCookie("time_record", time_record_list);
    } else {
      setCookie("time_record", [{ scramble: scrambleText, time: "00:00:00" }]);
    }
  }, [cookies, setCookie]);

  useEffect(() => {
    if (!timerState.isStarted) {
      setScrambleList(generateScrambleText());
      console.log("setscrambleList");
    } else {
      // console.log(scrambleList);
      console.log("cookies");
      cookieSetting();
      // setScrambleList([]);
    }
  }, [cookieSetting, cookies, setCookie, timerState.isStarted]);

  return <ScramblePresenter timerState={timerState} scrambleList={scrambleList} />;
};
