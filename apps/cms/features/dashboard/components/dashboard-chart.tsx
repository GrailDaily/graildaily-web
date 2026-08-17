"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ViewData {
  date: string;
  views: number;
}

interface Props {
  data: ViewData[];
}

export function DashboardChart({ data }: Props) {
  const chartData = data.map((item) => ({
    ...item,
    label: new Date(`${item.date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Views Last 7 Days</h2>

        <p className="text-muted-foreground text-sm">
          Article views over the last seven days.
        </p>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />

            <Tooltip
              cursor={{ className: "stroke-muted-foreground" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--card-foreground)",
              }}
              formatter={(value) => [`${value} views`, "Views"]}
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="currentColor"
              fill="currentColor"
              fillOpacity={0.12}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
