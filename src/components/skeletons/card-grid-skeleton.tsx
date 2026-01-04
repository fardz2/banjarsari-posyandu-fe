import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

interface CardGridSkeletonProps {
  count?: number;
  columns?: {
    default?: number;
    md?: number;
    lg?: number;
  };
}

export function CardGridSkeleton({
  count = 9,
  columns = { default: 1, md: 2, lg: 3 },
}: CardGridSkeletonProps) {
  const gridCols = `grid-cols-${columns.default} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`;

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
