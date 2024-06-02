import { ScrambleModelsPresenter } from "./presenter";
import React from "react";

type Props = {
  status?: string;
  scrambleList: string[];
  isKeepRotate?: boolean; // scrambleList[]を先頭から順に回転した結果を反映させるか、個別に回転させるか
};

export const ScrambleModels = React.memo(
  ({ status, scrambleList, isKeepRotate = false }: Props) => {
    return (
      <ScrambleModelsPresenter
        status={status}
        scrambleList={scrambleList}
        isKeepRotate={isKeepRotate}
      />
    );
  }
);
