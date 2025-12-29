import { Skeleton } from "../ui/skeleton";

interface FormSkeletonProps {
  fieldCount?: number;
}

export function FormSkeleton({ fieldCount = 5 }: FormSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fieldCount }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex justify-end pt-4">
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  );
}
