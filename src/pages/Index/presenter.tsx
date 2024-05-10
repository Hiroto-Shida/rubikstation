import { createContext, useEffect, useState } from "react";
import { ScrambleText } from "../../components/ScrambleText/container";
import { Timer } from "../../components/Timer/container";

export type RunningState = {
  isStay: boolean
  isStarted: boolean
  isPause: boolean
}

const initialRunningState: RunningState = {
  isStay: true,
  isStarted: false,
  isPause: false
}

export const RunningStateContext = createContext<RunningState>(initialRunningState)

export const IndexPagePresenter = () => {
  const [runningState, setRunningState] = useState<RunningState>(initialRunningState);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {

      if (e.code === 'Space') {
        if (runningState.isStay) {
          setRunningState({isStay: false, isStarted: true, isPause: false})
          console.log("press start")
          return
        }
        if (runningState.isStarted) {
          console.log("press pause")
          setRunningState({isStay: false, isStarted: false, isPause: true})
          return
        }
        if (runningState.isPause) {
            console.log("press stay")
            setRunningState({isStay: true, isStarted: false, isPause: false})
            return
          }
        }
    };

    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [runningState]);

  console.log("IndexPagePresenter rendering")

  return (
    <>
      <RunningStateContext.Provider value={runningState}>
        <Timer />
        <ScrambleText />
      </RunningStateContext.Provider>
    </>
  );
};