import { RecordType } from "../Record/container";
import { RecordListItemPresenter } from "./presenter";

type Props = {
  record: RecordType;
  recordListLength: number;
  fastestTimeId: number | null;
  latestTimeId: number | null;
  handleDeleteRecord: (index: number) => void;
};

export const RecordListItem = ({
  record,
  recordListLength,
  fastestTimeId,
  latestTimeId,
  handleDeleteRecord,
}: Props) => {
  return (
    <RecordListItemPresenter
      record={record}
      recordListLength={recordListLength}
      fastestTimeId={fastestTimeId}
      latestTimeId={latestTimeId}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
