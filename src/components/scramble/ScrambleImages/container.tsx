import { ScrambleImagesPresenter } from "./presenter";

type Props = {
  isDisplay: boolean;
  multiTextList: string[][];
};

export const ScrambleImages = ({ isDisplay, multiTextList }: Props) => {
  return (
    <ScrambleImagesPresenter
      isDisplay={isDisplay}
      multiTextList={multiTextList}
    />
  );
};
