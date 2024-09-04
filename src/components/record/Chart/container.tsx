import { RecordType } from "../Record/container";
import { ChartPresenter } from "./presenter";

type Props = {
  recordList: RecordType[];
};

export const Chart = ({ recordList }: Props) => {
  return <ChartPresenter recordList={recordList} />;
};
