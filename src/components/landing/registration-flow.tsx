const steps = [
  {
    step: "01",
    title: "Registrasi",
    desc: "Daftar melalui formulir digital atau datang langsung ke balai.",
  },
  {
    step: "02",
    title: "Verifikasi",
    desc: "Kader akan melakukan pengecekan data dan status kepesertaan.",
  },
  {
    step: "03",
    title: "Pemeriksaan",
    desc: "Ikuti rangkaian pemeriksaan kesehatan rutin sesuai jadwal.",
  },
  {
    step: "04",
    title: "Evaluasi",
    desc: "Dapatkan hasil perkembangan dan sesi konseling pribadi.",
  },
];

export default function RegistrationFlow() {
  return (
    <section className="py-24 border-b">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-16">
          Alur Pendaftaran Posyandu
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="relative p-6 flex flex-col items-center">
              <div className="text-6xl font-black text-muted/20 absolute top-0 left-1/2 -translate-x-1/2 select-none">
                {item.step}
              </div>
              <h3 className="font-bold text-xl mt-8 mb-2 z-10">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
