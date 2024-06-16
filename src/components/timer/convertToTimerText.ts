export const convertToTimerText = (time: number) => {
  const milliseconds = `0${Math.round((time % 1000) / 10)}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2) + `.`;
  const minutes =
    Math.floor(time / 60000) % 60 === 0
      ? ""
      : `${Math.floor(time / 60000) % 60}:`;
  return `${minutes}${seconds}${milliseconds}`;
};
