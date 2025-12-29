/**
 * Anak (Child) Interface
 */
export interface Anak {
  id: string;
  nik: string;
  namaLengkap: string;
  jenisKelamin: "L" | "P";
  tanggalLahir: string;
  tempatLahir: string;
  beratBadanLahir: number;
  panjangBadanLahir: number;
  anakKe: number;
  namaIbu: string;
  namaAyah: string;
  alamat: string;
  posyanduId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pengukuran (Measurement) Interface
 */
export interface Pengukuran {
  id: string;
  anakId: string;
  tanggalPengukuran: string;
  umurBulan: number;
  beratBadan: number;
  tinggiBadan: number;
  lingkarKepala: number;
  statusGizi: "normal" | "stunting" | "wasting" | "overweight";
  keterangan?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Ibu Hamil Interface
 */
export interface IbuHamil {
  id: string;
  nik: string;
  namaLengkap: string;
  tanggalLahir: string;
  alamat: string;
  nomorTelepon?: string;
  hpht: string; // Hari Pertama Haid Terakhir
  hpl: string; // Hari Perkiraan Lahir
  kehamilanKe: number;
  riwayatPenyakit?: string;
  posyanduId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pemeriksaan Ibu Hamil Interface
 */
export interface PemeriksaanIbuHamil {
  id: string;
  ibuHamilId: string;
  tanggalPemeriksaan: string;
  usiaKehamilan: number; // dalam minggu
  beratBadan: number;
  tekananDarah: string;
  lingkarLenganAtas: number;
  tinggiFundus: number;
  denyutJantungJanin: number;
  keluhan?: string;
  tindakan?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Posyandu Interface
 */
export interface Posyandu {
  id: string;
  nama: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kodePos?: string;
  nomorTelepon?: string;
  jadwalBuka?: string;
  createdAt: string;
  updatedAt: string;
}
