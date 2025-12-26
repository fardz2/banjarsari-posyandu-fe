import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Baby, Heart, ShieldCheck, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Pemantauan Balita",
    icon: <Baby className="h-8 w-8" />,
    desc: "Penimbangan, pengukuran tinggi badan, dan deteksi dini gangguan pertumbuhan secara berkala.",
    items: [
      "Penimbangan Rutin",
      "Ukur Tinggi & Lingkar Kepala",
      "Konsultasi KMS",
    ],
  },
  {
    title: "Layanan Ibu Hamil",
    icon: <Heart className="h-8 w-8" />,
    desc: "Pemeriksaan kehamilan, pemberian suplemen, dan kelas edukasi persiapan persalinan.",
    items: [
      "Pemeriksaan Tekanan Darah",
      "Pemberian Tablet FE",
      "Senam Ibu Hamil",
    ],
  },
  {
    title: "Imunisasi & Vitamin",
    icon: <ShieldCheck className="h-8 w-8" />,
    desc: "Distribusi vitamin A, obat cacing, dan koordinasi jadwal imunisasi dasar lengkap.",
    items: ["Vitamin A (Feb/Agu)", "Obat Cacing Berkala", "Imunisasi Dasar"],
  },
];

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-24 border-b bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Program Unggulan Desa
          </h2>
          <p className="text-lg text-muted-foreground">
            Dedikasi kami untuk warga Banjarsari melalui layanan kesehatan
            primer yang mudah dijangkau dan berkualitas.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <Card
              key={i}
              className="group border-2 hover:border-foreground/20 transition-all duration-300"
            >
              <CardHeader className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-foreground/5 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
