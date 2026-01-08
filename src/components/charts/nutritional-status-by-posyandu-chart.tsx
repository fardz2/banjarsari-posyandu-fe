import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";
import { nutritionChartConfig, normalizeStatus } from "../../lib/chart-config";

interface PosyanduStats {
  posyandu: string;
  stats: {
    bb_tb: Array<{ status: string; count: number }>;
    bb_u: Array<{ status: string; count: number }>;
    tb_u: Array<{ status: string; count: number }>;
    lk_u: Array<{ status: string; count: number }>;
  };
}

interface NutritionalStatusByPosyanduChartProps {
  data: PosyanduStats[];
  title?: string;
  description?: string;
  defaultTab?: "gizi" | "bb_u" | "tb_u" | "lk_u";
}

export function NutritionalStatusByPosyanduChart({
  data,
  title = "Status Gizi per Posyandu",
  description = "Breakdown status gizi berdasarkan lokasi Posyandu",
  defaultTab = "gizi",
}: NutritionalStatusByPosyanduChartProps) {
  const transformDataForTab = (key: "gizi" | "bb_u" | "tb_u" | "lk_u") => {
    return data.map((p) => {
      const stats = p.stats[key === "gizi" ? "bb_tb" : key] || [];
      const entry: any = { posyandu: p.posyandu };
      stats.forEach((s) => {
        const normalizedKey = normalizeStatus(s.status || "");
        entry[normalizedKey] = s.count;
      });
      return entry;
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 h-auto">
            <TabsTrigger value="gizi" className="text-xs sm:text-sm">
              BB/TB
            </TabsTrigger>
            <TabsTrigger value="bb_u" className="text-xs sm:text-sm">
              BB/U
            </TabsTrigger>
            <TabsTrigger value="tb_u" className="text-xs sm:text-sm">
              TB/U
            </TabsTrigger>
            <TabsTrigger value="lk_u" className="text-xs sm:text-sm">
              LK/U
            </TabsTrigger>
          </TabsList>
          {(["gizi", "bb_u", "tb_u", "lk_u"] as const).map((key) => {
            const chartData = transformDataForTab(key);

            // Define status keys specific to each category
            const statusKeys: Record<string, string[]> = {
              gizi: [
                "gizi-buruk",
                "gizi-kurang",
                "gizi-baik",
                "risiko-gizi-lebih",
                "gizi-lebih",
                "obesitas",
              ],
              bb_u: ["sangat-kurang", "kurang", "normal", "lebih"],
              tb_u: ["sangat-pendek", "pendek", "normal", "tinggi"],
              lk_u: [
                "mikrosefalus-berat",
                "mikrosefalus",
                "normal",
                "makrosefalus",
                "makrosefalus-berat",
              ],
            };

            const currentKeys = statusKeys[key] || [];

            return (
              <TabsContent key={key} value={key}>
                <ChartContainer
                  config={nutritionChartConfig}
                  className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="posyandu"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend
                      content={<ChartLegendContent />}
                      wrapperStyle={{ fontSize: "12px" }}
                      className="flex flex-wrap"
                    />
                    {currentKeys.map((status) => (
                      <Bar
                        key={status}
                        dataKey={status}
                        stackId="a"
                        fill={`var(--color-${status})`}
                        radius={[0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ChartContainer>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
