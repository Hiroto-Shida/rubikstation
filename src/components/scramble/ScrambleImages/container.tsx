import { ScrambleImagesPresenter } from "./presenter";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleImages = ({ isDisplay, scrambleList }: Props) => {
  return (
    <ScrambleImagesPresenter
      isDisplay={isDisplay}
      scrambleList={scrambleList}
    />
  );
};
