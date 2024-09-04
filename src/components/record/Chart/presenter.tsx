import { ComponentProps, useMemo } from "react";
import { Chart } from "./container";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  TooltipProps,
  DotProps,
} from "recharts";
import { convertToTimerText } from "../../timer/convertToTimerText";
import { RecordType } from "../Record/container";
import { Theme, useTheme } from "@mui/material";
import CrossIcon from "@mui/icons-material/Close";
import SuccessIcon from "@mui/icons-material/Circle";
import styles from "./index.module.scss";
import clsx from "clsx";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const formatData = (recordList: RecordType[]) => {
  return recordList
    .slice()
    .reverse()
    .map((record, index) => ({
      index: index + 1,
      Time: record.time,
    }));
};

const CustomizedDot = ({
  cx,
  cy,
  index,
  dnfIndexList,
}: DotProps & { index: number; dnfIndexList: number[] }) => {
  if (cx && cy) {
    if (dnfIndexList.includes(index + 1)) {
      return <CrossIcon x={cx - 8} y={cy - 8} width={16} height={16} />;
    }
    return (
      <SuccessIcon
        sx={(theme: Theme) => ({ color: theme.palette.themeRubik.green })}
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
      />
    );
  }
};

const CustomTooltip = ({
  active,
  payload,
  label,
  dnfIndexList,
}: TooltipProps<ValueType, NameType> & { dnfIndexList: number[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <span className={styles.lable}>{`[${label}] ： `}</span>
        <span
          className={clsx(styles.content, {
            [styles.Dnf]: dnfIndexList.includes(label),
          })}
        >{`${convertToTimerText(
          typeof payload[0].value === "number" ? payload[0].value : 0
        )}`}</span>
        <span>{dnfIndexList.includes(label) ? "(DNF)" : ""}</span>
      </div>
    );
  }

  return null;
};

type Props = ComponentProps<typeof Chart>;

export const ChartPresenter = ({ recordList }: Props) => {
  const data = useMemo(() => {
    return formatData(recordList);
  }, [recordList]);

  const dnfIndexList = useMemo(() => {
    return recordList
      .map((record, index) =>
        record.penalty === "(DNF)" ? recordList.length - index : null
      )
      .filter((index): index is number => index !== null);
  }, [recordList]);

  // 平均時間を計算(DNFを除く)
  const avgTime = useMemo(() => {
    const NonDnfRecordList = recordList.filter(
      (record) => record.penalty !== "(DNF)"
    );
    const total = NonDnfRecordList.reduce(
      (acc, record) => acc + record.time,
      0
    );
    return Math.floor(total / NonDnfRecordList.length);
  }, [recordList]);

  // FIXME: rechartsのversionの都合上consoleに出るエラーを消す処理
  // (参照: https://github.com/recharts/recharts/issues/3615)
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const themeColor = useTheme();

  return (
    <ResponsiveContainer width="100%" aspect={2 / 1}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis tickFormatter={convertToTimerText} />
        <Tooltip
          content={(props) => (
            <CustomTooltip {...props} dnfIndexList={dnfIndexList} />
          )}
        />
        <Line
          type="linear"
          dataKey="Time"
          stroke={themeColor.palette.themeRubik.gray}
          dot={(props) => (
            <CustomizedDot
              dnfIndexList={dnfIndexList}
              {...props}
              index={props.index}
              key={props.index}
            />
          )}
        />
        <ReferenceLine
          y={avgTime}
          stroke={themeColor.palette.themeRubik.green}
          strokeDasharray="3 3"
          label={{
            position: "top",
            value: `Average (${convertToTimerText(avgTime)})`,
            fontSize: 16,
            fill: themeColor.palette.themeRubik.green,
          }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
