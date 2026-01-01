import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { visitChartConfig } from "../../lib/chart-config";

interface VisitTrendsChartProps {
  data: Array<{ month: string; count: number }>;
  title?: string;
  description?: string;
}

export function VisitTrendsChart({
  data,
  title = "Tren Kunjungan",
  description = "Jumlah pengukuran 12 bulan terakhir",
}: VisitTrendsChartProps) {
  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={visitChartConfig}
          className="h-[200px] sm:h-[250px] md:h-[300px] w-full"
        >
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(2)} // YY-MM
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-visitors)"
              fillOpacity={0.4}
              stroke="var(--color-visitors)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
