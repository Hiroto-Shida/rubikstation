import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useKeyEvent } from "../hooks/useKeyEvent";
import { useModalOpenStore } from "../stores/modalOpenStore";
import { useInspectionStore } from "../stores/inspectionStore";

export type TimerState = {
  startingState: StartingState;
  standbyState: StandbyState; // spaceキーを押した時の処理
};

export type StartingState = {
  isStartedInspection: boolean; // インスペクションタイマーがスタートしたか
  isStarted: boolean; // タイマーがスタートしたか
};
export type StandbyState = {
  isKeyDownSpace: boolean; // spaceキーを押してる状態か
  isCanStart: boolean; // spaceキーを一定時間押して、離したらタイマースタートできる状態か
};

const initialTimerState: TimerState = {
  startingState: {
    isStartedInspection: false,
    isStarted: false,
  },
  standbyState: {
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
  const { inspection } = useInspectionStore();
  const isKeyDownSpaceInPause = useRef<boolean>(false);
  const { modalOpen } = useModalOpenStore();

  const { isKeyDownSpaceStart, isCanStartByKeyUpSpace, isKeyUpSpaceHeldAndReleased } =
    useKeyEvent();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) return;

      // spaceキー押し始めの時、isKeyDownSpaceをtrueに
      if (isKeyDownSpaceStart(e)) {
        if (!timerState.startingState.isStarted) {
          isKeyDownSpaceInPause.current = true;
          setTimerState((preTimerState) => ({
            ...preTimerState,
            standbyState: {
              isKeyDownSpace: true,
              isCanStart: false,
            },
          }));
          return;
        }
      }

      // タイマーストップ(任意のキーでOK)
      if (timerState.startingState.isStarted) {
        isKeyDownSpaceInPause.current = false;
        setTimerState((preTimerState) => ({
          ...preTimerState,
          startingState: {
            isStartedInspection: false,
            isStarted: false,
          },
          standbyState: {
            isKeyDownSpace: true,
            isCanStart: false,
          },
        }));
        return;
      }

      // 本タイマーが始まってない画面から、spaceキー押してから一定時間経過した時
      if (!timerState.startingState.isStarted && isKeyDownSpaceInPause.current) {
        if (isCanStartByKeyUpSpace(e)) {
          setTimerState((preTimerState) => ({
            ...preTimerState,
            standbyState: {
              isKeyDownSpace: true,
              isCanStart: true,
            },
          }));
        }
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (modalOpen) return;

      // タイマーが停止した画面から、spaceキーを一定時間押した後、キーを話したとき
      if (isKeyUpSpaceHeldAndReleased(e) && isKeyDownSpaceInPause.current) {
        if (!timerState.startingState.isStarted) {
          // インスペクション ON かつまだインスペクションが始まってない時のみインスペクションスタート
          if (inspection && !timerState.startingState.isStartedInspection) {
            setTimerState((preTimerState) => ({
              ...preTimerState,
              startingState: {
                isStartedInspection: true,
                isStarted: false,
              },
            }));
          } else {
            setTimerState((preTimerState) => ({
              ...preTimerState,
              startingState: {
                isStartedInspection: false,
                isStarted: true,
              },
            }));
          }
        }
      }
      setTimerState((preTimerState) => ({
        ...preTimerState,
        standbyState: {
          isKeyDownSpace: false,
          isCanStart: false,
        },
      }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    isCanStartByKeyUpSpace,
    isKeyDownSpaceStart,
    isKeyUpSpaceHeldAndReleased,
    modalOpen,
    timerState.startingState.isStarted,
  ]);

  return <TimerStateContext.Provider value={timerState}>{children}</TimerStateContext.Provider>;
};
