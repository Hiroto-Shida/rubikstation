import { ComponentProps } from "react";
import { Chart } from "./container";
import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function timeToMilliseconds(time) {
  const [minSec, msec] = time.split(".");
  const [minutes, seconds] = minSec.split(":").map(Number);
  return (minutes * 60 + seconds) * 1000 + Number(msec);
}

const data = [
  { index: 1, time: "1:22.33" },
  { index: 2, time: "2:10.51" },
  { index: 3, time: "0:55.18" },
].map((item) => ({
  ...item,
  timeValue: timeToMilliseconds(item.time),
}));

type Props = ComponentProps<typeof Chart>;

export const ChartPresenter = ({ recordList }: Props) => {
  const xAxisData = recordList.map((record) => Math.floor(record.id)).reverse();
  // const xAxisData = [6, 5, 4, 3, 2, 1];
  const yAxisData = recordList.map((record) => record.time);
  // console.log(xAxisData);

  // Y軸のラベルフォーマットを定義する関数
  const formatYAxis = (msec: number) => {
    const minutes = Math.floor(msec / 60000);
    const seconds = Math.floor((msec % 60000) / 1000);
    const milliseconds = msec % 1000;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${milliseconds}`;
  };

  return (
    <Box component="div" sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={(value) => formatYAxis(value)}
          labelFormatter={(index) => `Index: ${index}`}
        />
        <Line type="monotone" dataKey="timeValue" stroke="#8884d8" dot={{ r: 6 }} />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </Box>
  );
};
