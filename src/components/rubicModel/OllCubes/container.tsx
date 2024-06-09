import { OllCubesPresenter } from "./presenter";

type Props = {
  status?: string;
};

export const OllCubes = ({ status }: Props) => {
  return <OllCubesPresenter status={status} />;
};
