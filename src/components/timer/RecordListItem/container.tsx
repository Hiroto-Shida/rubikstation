import { RecordType } from "../Record/container";
import { RecordListItemPresenter } from "./presenter";

type Props = {
  record: RecordType;
  index: number;
  recordListLength: number;
  fastestTimeIndex: number | null;
  latestTimeIndex: number | null;
  handleDeleteRecord: (index: number) => void;
};

export const RecordListItem = ({
  record,
  index,
  recordListLength,
  fastestTimeIndex,
  latestTimeIndex,
  handleDeleteRecord,
}: Props) => {
  return (
    <RecordListItemPresenter
      record={record}
      index={index}
      recordListLength={recordListLength}
      fastestTimeIndex={fastestTimeIndex}
      latestTimeIndex={latestTimeIndex}
      handleDeleteRecord={handleDeleteRecord}
    />
  );
};
