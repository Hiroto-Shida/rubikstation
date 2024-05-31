import { ScrambleModelsPresenter } from "./presenter";
import React from "react";

type Props = {
  scrambleList: string[];
  isKeepRotate?: boolean; // scrambleList[]を先頭から順に回転した結果を反映させるか、個別に回転させるか
};

export const ScrambleModels = React.memo(({ scrambleList, isKeepRotate = false }: Props) => {
  return <ScrambleModelsPresenter scrambleList={scrambleList} isKeepRotate={isKeepRotate} />;
});
