import { createContext, useEffect, useState } from "react"
import { ScrambleText } from "../../components/scrambleText/ScrambleText/container"
import { Timer } from "../../components/timer/Timer/container"

export type RunningState = {
  isStay: boolean
  isStarted: boolean
  isPause: boolean
}

const initialRunningState: RunningState = {
  isStay: true,
  isStarted: false,
  isPause: false,
}

export const RunningStateContext =
  createContext<RunningState>(initialRunningState)

export const IndexPagePresenter = () => {
  const [runningState, setRunningState] =
    useState<RunningState>(initialRunningState)

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (runningState.isStay) {
          setRunningState({ isStay: false, isStarted: true, isPause: false })
          return
        }
        if (runningState.isStarted) {
          setRunningState({ isStay: false, isStarted: false, isPause: true })
          return
        }
        if (runningState.isPause) {
          setRunningState({ isStay: true, isStarted: false, isPause: false })
          return
        }
      }
    }

    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [runningState])

  return (
    <>
      <RunningStateContext.Provider value={runningState}>
        <Timer />
        <ScrambleText />
      </RunningStateContext.Provider>
    </>
  )
}
