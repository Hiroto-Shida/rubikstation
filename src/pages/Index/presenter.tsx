import { createContext, useEffect, useRef, useState } from "react"
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

  const keyPressedTime = useRef(0)

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (keyPressedTime.current === 0) {
          keyPressedTime.current = performance.now()

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
    }

    const handleKeyUpKeyboard = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        // 一定時間のキー入力後、離した時にタイマースタート
        if (
          runningState.isStay &&
          performance.now() - keyPressedTime.current > 500
        ) {
          setRunningState({
            isStay: false,
            isStarted: true,
            isPause: false,
          })
        }
        keyPressedTime.current = 0
        return
      }
    }

    document.addEventListener("keydown", handleKeyboard)
    document.addEventListener("keyup", handleKeyUpKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
      document.removeEventListener("keyup", handleKeyUpKeyboard)
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
