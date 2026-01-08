import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";
import { nutritionChartConfig } from "../../lib/chart-config";

interface NutritionalStatusChartProps {
  data: Array<{ status: string; label?: string; count: number; fill?: string }>;
  title: string;
  description?: string;
  chartType?: "pie" | "donut" | "horizontal-bar" | "vertical-bar";
  showLegend?: boolean;
}

export function NutritionalStatusChart({
  data,
  title,
  description,
  chartType = "donut",
  showLegend = true,
}: NutritionalStatusChartProps) {
  const renderChart = () => {
    switch (chartType) {
      case "pie":
      case "donut":
        return (
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={chartType === "donut" ? "40%" : 0}
              outerRadius="80%"
              paddingAngle={2}
            />
            {showLegend && (
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-1 sm:gap-2 [&>*]:basis-full sm:[&>*]:basis-1/2 md:[&>*]:basis-1/3 lg:[&>*]:basis-1/4 [&>*]:justify-center text-xs"
              />
            )}
          </PieChart>
        );

      case "horizontal-bar":
        return (
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              width={80}
              tick={{ fontSize: 10 }}
              className="sm:text-xs md:text-sm"
              interval={0}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={5}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill || "var(--color-count)"}
                />
              ))}
            </Bar>
          </BarChart>
        );

      case "vertical-bar":
        return (
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: 10, right: 10, top: 5, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 10 }}
              className="sm:text-xs md:text-sm"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={5}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill || "var(--color-count)"}
                />
              ))}
            </Bar>
          </BarChart>
        );

      default:
        return null;
    }
  };

  const isCircularChart = chartType === "pie" || chartType === "donut";

  return (
    <Card
      className={`col-span-full sm:col-span-2 lg:col-span-1 ${
        isCircularChart ? "flex flex-col" : ""
      }`}
    >
      <CardHeader
        className={
          isCircularChart ? "items-center pb-2 sm:pb-4" : "pb-2 sm:pb-4"
        }
      >
        <CardTitle className="text-base sm:text-lg md:text-xl">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs sm:text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent
        className={isCircularChart ? "flex-1 pb-2 sm:pb-4" : "pb-2 sm:pb-4"}
      >
        <ChartContainer
          config={nutritionChartConfig}
          className={
            isCircularChart
              ? "mx-auto aspect-square w-full max-w-[250px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[350px]"
              : "h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] w-full"
          }
        >
          {renderChart() || <></>}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
