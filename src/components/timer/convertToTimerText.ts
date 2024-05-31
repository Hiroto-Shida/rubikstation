// TODO: 他の適用可能なところへもconverToTimerTextを流用する
export const convertToTimerText = (time: number) => {
  const milliseconds = `0${Math.round((time % 1000) / 10)}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  return `${minutes}:${seconds}:${milliseconds}`;
};
