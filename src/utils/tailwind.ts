import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function twMergeCLSX(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
