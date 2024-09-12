import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({ data }: { data: Record<string, any>[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={530}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="balance" fill="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
