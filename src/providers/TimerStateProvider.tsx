import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useKeyEvent } from "../hooks/useKeyEvent";
import { useModalOpenStore } from "../stores/modalOpenStore";
import { useInspectionStore } from "../stores/inspectionStore";
import { useTouchEvent } from "../hooks/useTouchEvent";

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

  // スペース押し始めor画面タップし始めの時
  const timerStandbyStart = () => {
    isKeyDownSpaceInPause.current = true;
    setTimerState((preTimerState) => ({
      ...preTimerState,
      standbyState: {
        isKeyDownSpace: true,
        isCanStart: false,
      },
    }));
  };

  // タイマーストップ時
  const timerStop = () => {
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
  };

  // スペースキーを一定時間押したor画面を一定時間タップした時
  const timerCanStart = () => {
    setTimerState((preTimerState) => ({
      ...preTimerState,
      standbyState: {
        isKeyDownSpace: true,
        isCanStart: true,
      },
    }));
  };

  // 一定時間経過後にスペースキーを離したor画面を離した時
  const timerStart = useCallback(() => {
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
  }, [inspection, timerState.startingState.isStartedInspection]);

  // 一定時間経過せずにスペースキーを離したor画面を離した時
  const resetTimerState = () => {
    setTimerState((preTimerState) => ({
      ...preTimerState,
      standbyState: {
        isKeyDownSpace: false,
        isCanStart: false,
      },
    }));
  };

  const {
    isKeyDownSpaceStart,
    isCanStartByKeyUpSpace,
    isKeyUpSpaceHeldAndReleased,
  } = useKeyEvent();

  const { startTouch, isTouchHeldAndReleased } = useTouchEvent(timerCanStart);

  /**
   * キーイベント登録
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) return;

      // spaceキー押し始めの時、isKeyDownSpaceをtrueに
      if (isKeyDownSpaceStart(e) && !timerState.startingState.isStarted) {
        timerStandbyStart();
        return;
      }

      // タイマーストップ(任意のキーでOK)
      if (timerState.startingState.isStarted) {
        timerStop();
        return;
      }

      // 本タイマーが始まってない画面から、spaceキー押してから一定時間経過した時
      if (
        !timerState.startingState.isStarted &&
        isKeyDownSpaceInPause.current &&
        isCanStartByKeyUpSpace(e)
      ) {
        timerCanStart();
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (modalOpen) return;

      // タイマーが停止した画面から、spaceキーを一定時間押した後、キーを話したとき
      if (
        !timerState.startingState.isStarted &&
        isKeyUpSpaceHeldAndReleased(e) &&
        isKeyDownSpaceInPause.current
      ) {
        timerStart();
      }
      resetTimerState();
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
    timerStart,
    timerState.startingState.isStarted,
  ]);

  /**
   * タッチイベント登録
   */
  const handleTouchStart = () => {
    if (modalOpen) return;

    // タイマーが停止した画面から、画面をタップし始めた時
    if (!timerState.startingState.isStarted) {
      timerStandbyStart();
      startTouch();
      return;
    }

    // タイマーストップ(画面タップでOK)
    if (timerState.startingState.isStarted) {
      timerStop();
      return;
    }
  };

  const handleTouchEnd = () => {
    if (modalOpen) return;

    // タイマーが停止した画面から、画面を一定時間タップした後、離したとき
    if (
      !timerState.startingState.isStarted &&
      isTouchHeldAndReleased() &&
      isKeyDownSpaceInPause.current
    ) {
      timerStart();
    }
    resetTimerState();
  };

  // MEMO: タッチイベント制御のため上から透明なBoxを敷く
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 16777272,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
      <TimerStateContext.Provider value={timerState}>
        {children}
      </TimerStateContext.Provider>
    </>
  );
};
