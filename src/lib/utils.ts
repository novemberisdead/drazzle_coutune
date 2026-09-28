import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indian digit grouping: 107000 → "1,07,000". */
export function inr(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export const img = (id: string) => `/img/${id}.webp`;
