import {
  Calendar as CalendarIcon,
  User as UserIcon,
  Ruler as RulerIcon,
  Weight as WeightIcon,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Link } from "react-router";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Anak } from "../../types";
import { calculateAge } from "../../lib/utils";

interface AnakCardProps {
  anak: Anak;
}

export function AnakCard({ anak }: AnakCardProps) {
  const age = calculateAge(new Date(anak.tglLahir));

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary group">
      <CardContent className="p-0">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">
                  {anak.nama}
                </h3>
                <Badge variant="secondary" className="text-xs font-normal">
                  {anak.nik}
                </Badge>
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
              <CalendarIcon className="h-4 w-4 text-primary/70" />
              <span>
                {format(new Date(anak.tglLahir), "d MMM yyyy", { locale: id })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
              <UserIcon className="h-4 w-4 text-primary/70" />
              <span>{anak.jenisKelamin}</span>
            </div>
            {anak.bbLahir && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
                <WeightIcon className="h-4 w-4 text-primary/70" />
                <span>BB Lahir: {anak.bbLahir} kg</span>
              </div>
            )}
            {anak.tbLahir && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
                <RulerIcon className="h-4 w-4 text-primary/70" />
                <span>TB Lahir: {anak.tbLahir} cm</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Usia: <span className="text-foreground">{age}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 hover:bg-primary hover:text-primary-foreground group-hover:pr-2 transition-all"
              asChild
            >
              <Link to={`/dashboard/anak/${anak.nik}`}>
                Lihat Detail{" "}
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
