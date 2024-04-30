import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function twClsx(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
