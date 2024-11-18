import { RecordType } from "../Record/container";
import { RecordListItemPresenter } from "./presenter";

type Props = {
  record: RecordType;
  recordListLength: number;
  fastestTimeId: number | null;
  latestTimeId: number | null;
  handleDeleteRecord: (index: number) => void;
  dialogRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const RecordListItem = ({
  record,
  recordListLength,
  fastestTimeId,
  latestTimeId,
  dialogRef,
  handleDeleteRecord,
}: Props) => {
  return (
    <RecordListItemPresenter
      record={record}
      recordListLength={recordListLength}
      fastestTimeId={fastestTimeId}
      latestTimeId={latestTimeId}
      dialogRef={dialogRef}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
