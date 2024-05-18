import { createContext, ReactNode, useEffect, useState } from "react";
import { useKeyEvent } from "../hooks/useKeyEvent";

export type TimerState = {
  isStay: boolean; // タイマー開始前か
  isStarted: boolean; // タイマーがスタートしたか
  isPause: boolean; // タイマーをストップしたか
  startingState: StartingState; // spaceキーを押した時の処理
};
export type StartingState = {
  isKeyDownSpace: boolean; // spaceキーを押してる状態か
  isCanStart: boolean; // spaceキーを一定時間押して、離したらタイマースタートできる状態か
};

const initialTimerState: TimerState = {
  isStay: true,
  isStarted: false,
  isPause: false,
  startingState: {
    isKeyDownSpace: false,
    isCanStart: false,
  },
};

export const TimerStateContext = createContext<TimerState>(initialTimerState);

type Props = {
  children: ReactNode;
};

export const TimerStateProvider = ({ children }: Props) => {
  const [timerState, setTimerState] = useState<TimerState>(initialTimerState);

  const { isKeyIsSpace, isKeyDownSpaceStart, isKeyUpSpaceHeldAndReleased } =
    useKeyEvent();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // spaceキー押したとき
      if (isKeyIsSpace(e)) {
        // キー押し始めの時
        if (isKeyDownSpaceStart()) {
          if (timerState.isStay) {
            // console.log("isStay");
            setTimerState((preTimerState) => ({
              ...preTimerState,
              startingState: {
                isKeyDownSpace: true,
                isCanStart: false,
              },
            }));
            return;
          }

          if (timerState.isStarted) {
            // console.log("isStarted");
            setTimerState((preTimerState) => ({
              ...preTimerState,
              // isStay: false,
              isStarted: false,
              isPause: true,
            }));
            return;
          }

          if (timerState.isPause) {
            // console.log("isPause");
            setTimerState((preTimerState) => ({
              ...preTimerState,
              isStay: true,
              // isStarted: false,
              isPause: false,
            }));
            return;
          }
        }

        if (timerState.isStay) {
          setTimerState((preTimerState) => ({
            ...preTimerState,
            startingState: {
              isKeyDownSpace: true,
              isCanStart: true,
            },
          }));
          return;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // spaceキー押したとき
      if (isKeyIsSpace(e)) {
        if (isKeyUpSpaceHeldAndReleased()) {
          if (timerState.isStay) {
            setTimerState((preTimerState) => ({
              ...preTimerState,
              isStay: false,
              isStarted: true,
              // isPause: false,
            }));
          }
        }
        setTimerState((preTimerState) => ({
          ...preTimerState,
          startingState: {
            isKeyDownSpace: false,
            isCanStart: false,
          },
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    isKeyDownSpaceStart,
    isKeyIsSpace,
    isKeyUpSpaceHeldAndReleased,
    timerState,
  ]);

  return (
    <TimerStateContext.Provider value={timerState}>
      {children}
    </TimerStateContext.Provider>
  );
};
