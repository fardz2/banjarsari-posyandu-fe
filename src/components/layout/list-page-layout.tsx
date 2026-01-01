import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

interface ListPageLayoutProps {
  title: string;
  description?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ListPageLayout({
  title,
  description,
  headerAction,
  children,
  className,
}: ListPageLayoutProps) {
  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>

      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
