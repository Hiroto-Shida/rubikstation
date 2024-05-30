import { ScrambleModelsPresenter } from "./presenter";
import React from "react";

type Props = {
  scrambleList: string[];
};

export const ScrambleModels = React.memo(({ scrambleList }: Props) => {
  return <ScrambleModelsPresenter scrambleList={scrambleList} />;
});
