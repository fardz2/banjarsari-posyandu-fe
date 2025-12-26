import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../components/ui/empty";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Empty className="max-w-2xl">
        <EmptyHeader>
          <EmptyTitle className="text-5xl font-black tracking-tight">
            404 - Halaman Tidak Ditemukan
          </EmptyTitle>
          <EmptyDescription className="text-lg mt-4">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Coba
            kembali ke beranda atau gunakan pencarian di bawah ini.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="space-y-8">
          {/* Tombol aksi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Masuk ke Akun</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
