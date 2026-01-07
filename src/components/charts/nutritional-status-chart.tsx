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
              innerRadius={chartType === "donut" ? 60 : 0}
              outerRadius={90}
              paddingAngle={2}
            />
            {showLegend && (
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-xs sm:text-sm"
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
            margin={{ left: 0, right: 10 }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
              tick={{ fontSize: 11 }}
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
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) =>
                value.length > 5 ? value.substring(0, 5) + "." : value
              }
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
      className={`col-span-2 lg:col-span-1 ${
        isCircularChart ? "flex flex-col" : ""
      }`}
    >
      <CardHeader className={isCircularChart ? "items-center pb-0" : ""}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={isCircularChart ? "flex-1 pb-0" : ""}>
        <ChartContainer
          config={nutritionChartConfig}
          className={
            isCircularChart
              ? "mx-auto aspect-square h-[250px] sm:h-[280px] md:max-h-[300px]"
              : "h-[200px] sm:h-[250px] md:h-[300px] w-full"
          }
        >
          {renderChart() || <></>}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
