import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";
import { genderChartConfig } from "../../lib/chart-config";

interface GenderDistributionChartProps {
  data: Array<{ gender: string; count: number; fill: string }>;
  title?: string;
  description?: string;
}

export function GenderDistributionChart({
  data,
  title = "Distribusi Peserta",
  description = "Berdasarkan jenis kelamin",
}: GenderDistributionChartProps) {
  return (
    <Card className="col-span-2 lg:col-span-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={genderChartConfig}
          className="mx-auto aspect-square h-[250px] sm:h-[280px] md:max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="gender" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-xs sm:text-sm"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
