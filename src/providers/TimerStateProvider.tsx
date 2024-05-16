import { createContext, ReactNode, useEffect, useState } from "react"
import { useKeyEvent } from "../hooks/useKeyEvent"

export type TimerState = {
  isStay: boolean
  isStarted: boolean
  isPause: boolean
}

const initialTimerState: TimerState = {
  isStay: true,
  isStarted: false,
  isPause: false,
}

export const TimerStateContext = createContext<TimerState>(initialTimerState)

type Props = {
  children: ReactNode
}

export const TimerStateProvider = ({ children }: Props) => {
  const [timerState, setTimerState] = useState<TimerState>(initialTimerState)

  const { isKeyDownSpaceStart, isKeyUpSpaceHeldAndReleased } = useKeyEvent()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeyDownSpaceStart(e)) {
        if (timerState.isStarted) {
          setTimerState({
            isStay: false,
            isStarted: false,
            isPause: true,
          })
          return
        }
        if (timerState.isPause) {
          setTimerState({
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
        if (timerState.isStay) {
          setTimerState({
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
  }, [isKeyDownSpaceStart, isKeyUpSpaceHeldAndReleased, timerState])

  return (
    <TimerStateContext.Provider value={timerState}>
      {children}
    </TimerStateContext.Provider>
  )
}
