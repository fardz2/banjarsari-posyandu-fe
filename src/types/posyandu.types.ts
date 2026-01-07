/**
 * TypeScript Type Definitions untuk Posyandu Frontend
 * Disesuaikan dengan backend interfaces
 */

// ============================================================================
// ENUMS
// ============================================================================

export type Role = 
  | "SUPER_ADMIN" 
  | "ADMIN" 
  | "TENAGA_KESEHATAN" 
  | "KADER_POSYANDU" 
  | "ORANG_TUA";

export type JenisKelamin = "Laki-laki" | "Perempuan";

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  username: string | null;
  email: string;
  name: string;
  jenisKelamin?: string | null;
  role: Role;
  posyanduId: number | null;
  posyandu?: {
    id: number;
    nama: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  username: string;
  name: string;
  jenisKelamin?: string;
  role?: Role;
  posyanduId?: number;
}

export interface UserFilterParams {
  role?: string; // Comma-separated roles for multiselect
  name?: string;
  posyanduId?: string; // Comma-separated posyandu IDs for multiselect
  unassignedOrtu?: boolean;
  jenisKelamin?: string;
}

export interface UpdateUserInput {
  name?: string;
  jenisKelamin?: string;
  username?: string;
  posyanduId?: number;
}

export interface AssignRoleInput {
  role: Role;
}

// ============================================================================
// POSYANDU TYPES
// ============================================================================

export interface Posyandu {
  id: number;
  nama: string;
  rw: string | null;
  desa: string;
  kecamatan: string;
  puskesmas: string;
  _count?: {
    users: number;
    anak: number;
    ibuHamil: number;
  };
}

export interface CreatePosyanduInput {
  nama: string;
  rw?: string;
  desa?: string;
  kecamatan?: string;
  puskesmas?: string;
}

export interface UpdatePosyanduInput {
  nama?: string;
  rw?: string;
  desa?: string;
  kecamatan?: string;
  puskesmas?: string;
}

// ============================================================================
// ANAK TYPES
// ============================================================================

export interface Anak {
  nik: string;
  nama: string;
  jenisKelamin: string;
  tglLahir: string; // Date as ISO string
  bbLahir: number | null;
  tbLahir: number | null;
  alamat: string | null;
  rw: string | null;
  posyanduId: number;
  posyandu: {
    id: number;
    nama: string;
  };
  ortuId: number | null;
  ortu?: {
    id: number;
    namaAyah: string | null;
    namaIbu: string | null;
  } | null;
}

export interface CreateAnakInput {
  nik: string;
  nama: string;
  jenisKelamin: JenisKelamin;
  tglLahir: Date | string;
  bbLahir?: number;
  tbLahir?: number;
  alamat?: string;
  rw?: string;
  posyanduId: number;
  ortuId?: number;
}

export interface UpdateAnakInput {
  nama?: string;
  jenisKelamin?: JenisKelamin;
  tglLahir?: Date | string;
  bbLahir?: number;
  tbLahir?: number;
  alamat?: string;
  rw?: string;
  posyanduId?: number;
  ortuId?: number;
}

// ============================================================================
// PENGUKURAN TYPES
// ============================================================================

export interface Pengukuran {
  id: number;
  anakNik: string;
  anak: {
    nik: string;
    nama: string;
    posyanduId: number;
  };
  tglUkur: string; // Date as ISO string
  berat: number;
  tinggi: number;
  lila: number | null;
  caraUkur: string | null;
  usiaSaatUkur: string | null;
  status_bb_u: string | null;
  zs_bb_u: number | null;
  status_tb_u: string | null;
  zs_tb_u: number | null;
  status_bb_tb: string | null;
  zs_bb_tb: number | null;
  lingkarKepala: number | null;
  status_lk_u: string | null;
  zs_lk_u: number | null;
  naikBeratBadan: string | null;
}

export interface CreatePengukuranInput {
  anakNik: string;
  tglUkur: Date | string;
  berat: number;
  tinggi: number;
  lila?: number;
  lingkarKepala?: number;
  caraUkur?: string;
  usiaSaatUkur?: string;
  status_bb_u?: string;
  zs_bb_u?: number;
  status_tb_u?: string;
  zs_tb_u?: number;
  status_bb_tb?: string;
  zs_bb_tb?: number;
  status_lk_u?: string;
  zs_lk_u?: number;
  naikBeratBadan?: string;
}

export interface UpdatePengukuranInput {
  tglUkur?: Date | string;
  berat?: number;
  tinggi?: number;
  lila?: number;
  lingkarKepala?: number;
  caraUkur?: string;
  usiaSaatUkur?: string;
  status_bb_u?: string;
  zs_bb_u?: number;
  status_tb_u?: string;
  zs_tb_u?: number;
  status_bb_tb?: string;
  zs_bb_tb?: number;
  status_lk_u?: string;
  zs_lk_u?: number;
  naikBeratBadan?: string;
}

// ============================================================================
// IBU HAMIL TYPES
// ============================================================================

export interface IbuHamil {
  id: number;
  nama: string;
  nik: string | null;
  tglLahir: string | null; // Date as ISO string
  alamat: string | null;
  rw: string | null;
  namaSuami: string | null;
  hp: string | null;
  posyanduId: number;
  posyandu: {
    id: number;
    nama: string;
  };
  _count?: {
    pemeriksaan: number;
  };
}

export interface CreateIbuHamilInput {
  nama: string;
  nik?: string;
  tglLahir?: Date | string;
  alamat?: string;
  rw?: string;
  namaSuami?: string;
  hp?: string;
  posyanduId: number;
}

export interface UpdateIbuHamilInput {
  nama?: string;
  nik?: string;
  tglLahir?: Date | string;
  alamat?: string;
  rw?: string;
  namaSuami?: string;
  hp?: string;
  posyanduId?: number;
}

// Note: PemeriksaanIbuHamil types will be added when backend implements it

// ============================================================================
// ORTU (ORANG TUA) TYPES
// ============================================================================

export interface Ortu {
  id: number;
  userId: string | null;
  userAyahId: string | null;
  userIbuId: string | null;
  nik: string | null;
  namaAyah: string | null;
  namaIbu: string | null;
  alamat: string | null;
  telepon: string | null;
  _count?: {
    anak: number;
  };
}

export interface CreateOrtuInput {
  nik?: string;
  alamat?: string;
  telepon?: string;
  userAyahId?: string;
  userIbuId?: string;
}

export interface UpdateOrtuInput {
  nik?: string;
  alamat?: string;
  telepon?: string;
  userAyahId?: string;
  userIbuId?: string;
}
