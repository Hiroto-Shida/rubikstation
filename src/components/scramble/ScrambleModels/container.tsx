import { ScrambleModelsPresenter } from "./presenter";
import React from "react";

type Props = {
  status?: string;
  supportText?: string; // scrambleListに"("を入れた場合にその横に表示する文字
  scrambleList: string[];
  isKeepRotate?: boolean; // scrambleList[]を先頭から順に回転した結果を反映させるか、個別に回転させるか
};

export const ScrambleModels = React.memo(
  ({ status, supportText, scrambleList, isKeepRotate = false }: Props) => {
    return (
      <ScrambleModelsPresenter
        status={status}
        supportText={supportText}
        scrambleList={scrambleList}
        isKeepRotate={isKeepRotate}
      />
    );
  }
);
