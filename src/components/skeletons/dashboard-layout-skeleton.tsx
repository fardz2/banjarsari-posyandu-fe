import { Skeleton } from "../ui/skeleton";
import { SidebarProvider, Sidebar, SidebarInset } from "../ui/sidebar";

export function DashboardLayoutSkeleton() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        {/* Sidebar Header Skeleton */}
        <div className="flex items-center gap-2 px-4 py-2 h-14 border-b">
          <Skeleton className="h-6 w-6 rounded-md" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-4">
          {/* Menu Group 1 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-12" />
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>

          {/* Menu Group 2 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <div className="space-y-1">
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>

        {/* Sidebar Footer Skeleton */}
        <div className="p-2 border-t mt-auto">
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent/50 px-3 py-2 mb-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-6 w-48" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
