import React, { useMemo } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import { generateReferenceData } from "../../utils/who-standards-fe";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";

interface DataPoint {
  age: number; // months
  value: number;
  date: Date;
  label?: string;
}

interface GrowthChartProps {
  data: DataPoint[];
  type: "wfa" | "lhfa" | "hcfa" | "wfl"; // Weight-for-age, Length-for-age, Head-for-age, Weight-for-length
  gender: "L" | "P"; // Laki-laki / Perempuan
  title?: string;
  yAxisLabel?: string;
}

// Red: #ff0037
// Pink: #ff89a3
// Yellow: #eaff00
// Green: #22c55e (Tailwind green-500 for better visibility than pale green)

const chartConfig = {
  sd3pos: {
    label: "+3 SD",
    color: "#ff0037",
  },
  sd2pos: {
    label: "+2 SD",
    color: "#ff89a3",
  },
  sd1pos: {
    label: "+1 SD",
    color: "#eaff00",
  },
  sd0: {
    label: "Median",
    color: "#22c55e",
  },
  sd1neg: {
    label: "-1 SD",
    color: "#eaff00",
  },
  sd2neg: {
    label: "-2 SD",
    color: "#ff89a3",
  },
  sd3neg: {
    label: "-3 SD",
    color: "#ff0037",
  },
  anak: {
    label: "Anak",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const GrowthChart: React.FC<
  GrowthChartProps & { domainMax?: number; xAxisLabel?: string }
> = ({
  data,
  type,
  gender,
  title,
  yAxisLabel,
  domainMax = 60,
  xAxisLabel = "Usia (bulan)",
}) => {
  // Generate reference data
  const referenceData = useMemo(() => {
    // Generate up to domainMax (e.g. 60 months or 110 cm)
    // Note: generateReferenceData logic in who-standards-fe.ts might need maxVal arg if I haven't added it yet.
    // I added maxVal to generateReferenceData in previous step.
    return generateReferenceData(type, gender, domainMax);
  }, [type, gender, domainMax]);

  const chartData = useMemo(() => {
    return referenceData.map((ref) => {
      // Find matching child data
      // For line chart continuity, child data should be sparse but we can mix it.
      // Easiest is to only use referenceData as the base and ignore sparse child data here
      // But Recharts ComposedChart wants a single data array usually.

      // Let's create a sparse mapping of child data to age
      // Note: This logic assumes child measures are exactly at integer months which is WRONG.
      // Recharts XAxis type="number" allows distinct data points.
      // So we should combine arrays or pass them as separate data props to Line/Scatter?
      // ComposedChart `data` prop is the shared axis.
      // If we pass `data={referenceData}` to ComposedChart, we can't easily plot exact child dates like 2.5 months.

      // Better approach:
      // Use XAxis type="number" and don't pass `data` to ComposedChart, but pass `data` to each Line/Scatter.
      // Reference lines use `referenceData`.
      // Child line uses `data` prop.

      return {
        // x is the unified axis key
        x: ref.x,
        age: ref.age, // keep for backward compat or tooltip
        length: ref.length, // keep for tooltip

        l_sd3pos: ref.sd3pos,
        l_sd2pos: ref.sd2pos,
        l_sd1pos: ref.sd1pos,
        l_sd0: ref.sd0,
        l_sd1neg: ref.sd1neg,
        l_sd2neg: ref.sd2neg,
        l_sd3neg: ref.sd3neg,
      };
    });
  }, [referenceData]);

  const scatterData = data.map((d) => ({
    x: d.age, // Map 'age' to 'x' by default. Caller should map 'length' to 'age' prop or we need to update DataPoint interface?
    // The DataPoint interface has 'age'.
    // If we are doing Weight-for-Length, the 'age' prop in DataPoint effectively holds the X value (Length).
    // Let's assume DataPoint.age holds the X value for simplicity, or refactor DataPoint.
    value: d.value,
    date: d.date,
    payload: d,
  }));

  return (
    <div className="w-full space-y-4">
      {title && <h3 className="text-lg font-medium text-center">{title}</h3>}
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, domainMax]}
            label={{
              value: xAxisLabel,
              position: "insideBottom",
              offset: -10,
              style: { fill: "var(--muted-foreground)" },
            }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              style: { fill: "var(--muted-foreground)" },
            }}
            domain={["auto", "auto"]}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {/* Reference Lines */}
          <Line
            data={chartData}
            dataKey="l_sd3pos"
            stroke={chartConfig.sd3pos.color}
            strokeWidth={2}
            dot={false}
            name="+3 SD"
          />
          <Line
            data={chartData}
            dataKey="l_sd2pos"
            stroke={chartConfig.sd2pos.color}
            strokeWidth={2}
            dot={false}
            name="+2 SD"
          />
          <Line
            data={chartData}
            dataKey="l_sd1pos"
            stroke={chartConfig.sd1pos.color}
            strokeWidth={2}
            dot={false}
            name="+1 SD"
          />
          <Line
            data={chartData}
            dataKey="l_sd0"
            stroke={chartConfig.sd0.color}
            strokeWidth={3}
            dot={false}
            name="Median"
          />
          <Line
            data={chartData}
            dataKey="l_sd1neg"
            stroke={chartConfig.sd1neg.color}
            strokeWidth={2}
            dot={false}
            name="-1 SD"
          />
          <Line
            data={chartData}
            dataKey="l_sd2neg"
            stroke={chartConfig.sd2neg.color}
            strokeWidth={2}
            dot={false}
            name="-2 SD"
          />
          <Line
            data={chartData}
            dataKey="l_sd3neg"
            stroke={chartConfig.sd3neg.color}
            strokeWidth={2}
            dot={false}
            name="-3 SD"
          />

          {/* Child Data */}
          <Scatter
            name="Anak"
            data={scatterData}
            dataKey="value"
            fill="var(--color-anak)"
            shape="circle"
          />
          <Line
            data={scatterData}
            dataKey="value"
            stroke="var(--color-anak)"
            strokeWidth={3}
            connectNulls
            name="Anak (Line)"
            dot={{ r: 4, fill: "var(--color-anak)" }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
};
