import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">
                Posyandu Banjarsari
              </span>
            </div>
            <p className="max-w-sm text-muted-foreground leading-relaxed">
              Layanan Kesehatan Terpadu Desa Banjarsari, Kec. Pangalengan.
              Berkomitmen untuk menciptakan lingkungan sehat dan bebas stunting
              bagi generasi mendatang.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Tautan</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Program Kesehatan
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Edukasi Gizi
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Jadwal Rutin
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Kebijakan Privasi
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Syarat Ketentuan
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium">
          <p>© 2025 Posyandu Banjarsari Pangalengan. Semua Hak Dilindungi.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">
              Instagram
            </span>
            <span className="hover:text-foreground cursor-pointer">
              WhatsApp
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
