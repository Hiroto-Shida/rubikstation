import { ScrambleTextPresenter } from "./presenter";

type Props = {
  isDisplay: boolean;
  multiTextList: string[][];
};

export const ScrambleText = ({ isDisplay, multiTextList }: Props) => {
  return (
    <ScrambleTextPresenter
      isDisplay={isDisplay}
      multiTextList={multiTextList}
    />
  );
};
