import { Typography } from "@mui/material"
import { useState, useRef, useEffect, useContext } from "react"
import { TimerStateContext } from "../../../providers/TimerStateProvider"

export const TimerPresenter = () => {
  const [time, setTime] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const timerState = useContext(TimerStateContext)

  function handleStart() {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10)
    }, 10)
  }

  function handlePause() {
    intervalRef.current && clearInterval(intervalRef.current)
  }

  function handleReset() {
    intervalRef.current && clearInterval(intervalRef.current)
    setTime(0)
  }

  useEffect(() => {
    if (timerState.isStarted) {
      handleStart()
    }
    if (timerState.isPause) {
      handlePause()
    }
    if (timerState.isStay) {
      handleReset()
    }
  }, [timerState])

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2)
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2)
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2)

  return (
    <>
      <Typography variant="h4">
        {minutes}:{seconds}:{milliseconds}
      </Typography>
    </>
  )
}
