import { Typography } from "@mui/material"

type Props = {
  time: number
}

export const TimerPresenter = ({ time }: Props) => {
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
