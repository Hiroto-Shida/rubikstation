import { ScrambleTextPresenter } from "./presenter";

type Props = {
  scrambleList: string[];
};

export const ScrambleText = ({ scrambleList }: Props) => {
  return <ScrambleTextPresenter scrambleList={scrambleList} />;
};
