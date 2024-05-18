import { ScrambleTextPresenter } from "./presenter";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleText = ({ isDisplay, scrambleList }: Props) => {
  return (
    <ScrambleTextPresenter isDisplay={isDisplay} scrambleList={scrambleList} />
  );
};
