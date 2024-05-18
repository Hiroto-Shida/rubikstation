import { CubesPresenter } from "./presenter";

type Props = {
  moveChar?: string;
};

export const Cubes = ({ moveChar }: Props) => {
  return <CubesPresenter moveChar={moveChar} />;
};
