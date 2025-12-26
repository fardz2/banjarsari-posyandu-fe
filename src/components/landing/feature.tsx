import { Activity, ClipboardCheck, Users } from "lucide-react";

const features = [
  {
    title: "Digitalisasi Data Warga",
    desc: "Seluruh data kesehatan warga Banjarsari tersimpan secara digital untuk pemantauan jangka panjang yang akurat.",
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    title: "Edukasi Gizi",
    desc: "Sesi konseling eksklusif bersama tenaga medis dan kader berpengalaman untuk mencegah stunting.",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Gotong Royong Kesehatan",
    desc: "Membangun kesadaran kesehatan bersama komunitas di wilayah Pangalengan untuk masa depan yang lebih baik.",
    icon: <Users className="h-5 w-5" />,
  },
];

export default function FeatureSection() {
  return (
    <section id="fitur" className="py-24 border-b">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Layanan Lokal di Desa Banjarsari
            </h2>
            <div className="space-y-8">
              {features.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl border bg-muted overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/posyandu.png"
                alt="Komunitas Kesehatan"
                className="object-cover w-full h-full  opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
