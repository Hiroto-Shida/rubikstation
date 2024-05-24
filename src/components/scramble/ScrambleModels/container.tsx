import { ScrambleModelsPresenter } from "./presenter";
import React from "react";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleModels = React.memo(({ isDisplay, scrambleList }: Props) => {
  return <ScrambleModelsPresenter isDisplay={isDisplay} scrambleList={scrambleList} />;
});
