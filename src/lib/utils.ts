import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthday: Date | string) {
  const date = typeof birthday === "string" ? new Date(birthday) : birthday;
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const years = Math.abs(ageDate.getUTCFullYear() - 1970);
  const months = Math.abs(ageDate.getUTCMonth());
  
  if (years > 0) return `${years} Tahun ${months} Bulan`;
  return `${months} Bulan`;
}
