import { Link } from "react-router";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wider uppercase">
            Posyandu Banjarsari Pangalengan
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl uppercase">
            Kesehatan Keluarga <br /> Desa Banjarsari.
          </h1>
          <p className="max-w-187.5 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Pusat kesehatan masyarakat terpadu untuk warga Banjarsari,
            Pangalengan. Fokus pada pertumbuhan balita, kesehatan ibu hamil, dan
            kesejahteraan lansia melalui pendekatan modern dan terdata.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row mt-4">
            <Link to={"/login"}>
              <Button
                size="lg"
                className="h-12 px-10 rounded-full font-semibold"
              >
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
