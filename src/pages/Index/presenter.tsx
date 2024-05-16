import { createContext, useEffect, useState } from "react"
import { ScrambleText } from "../../components/scrambleText/ScrambleText/container"
import { Timer } from "../../components/timer/Timer/container"
import { useKeyEvent } from "../../hooks/useKeyEvent"

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

  const { isKeyDownSpaceStart, isKeyUpSpaceHeldAndReleased } = useKeyEvent()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeyDownSpaceStart(e)) {
        if (runningState.isStarted) {
          setRunningState({
            isStay: false,
            isStarted: false,
            isPause: true,
          })
          return
        }
        if (runningState.isPause) {
          setRunningState({
            isStay: true,
            isStarted: false,
            isPause: false,
          })
          return
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isKeyUpSpaceHeldAndReleased(e)) {
        if (runningState.isStay) {
          setRunningState({
            isStay: false,
            isStarted: true,
            isPause: false,
          })
        }
        return
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [isKeyDownSpaceStart, isKeyUpSpaceHeldAndReleased, runningState])

  return (
    <>
      <RunningStateContext.Provider value={runningState}>
        <Timer />
        <ScrambleText />
      </RunningStateContext.Provider>
    </>
  )
}
