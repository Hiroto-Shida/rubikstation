import { RubicModelPresenter } from "./presenter";

type Props = {
  moveChar: string;
};

export const RubicModel = ({ moveChar }: Props) => {
  return <RubicModelPresenter moveChar={moveChar} />;
};
