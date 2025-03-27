import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date consistently across both server and client
 * Use this to avoid hydration mismatches
 */
export function formatDate(date: Date | string | number): string {
  // Parse the date if it's a string or number
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  // Format with explicit options to avoid locale differences
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '/') // Ensure consistent separator
}
