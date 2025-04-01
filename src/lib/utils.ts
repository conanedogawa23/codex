import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate as formatDateUtil, formatShortDate } from "./date-utils"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date consistently across both server and client
 * Use this to avoid hydration mismatches
 * @deprecated Use formatDate from date-utils.ts instead
 */
export function formatDate(date: Date | string | number): string {
  // Delegate to our consistent formatter to avoid hydration issues
  return formatDateUtil(date);
}

/**
 * Format a date with custom options
 * @deprecated Use formatDate or formatShortDate from date-utils.ts instead
 */
export function formatDateWithOptions(date: Date | string | number, options?: Intl.DateTimeFormatOptions) {
  // For simple cases, use our standardized formatters
  if (!options ||
    (options.year === 'numeric' && options.month === '2-digit' && options.day === '2-digit')) {
    return formatDateUtil(date);
  }

  if (options.year === 'numeric' && options.month === 'numeric' && options.day === 'numeric') {
    return formatShortDate(date);
  }

  // If we need custom formatting that isn't covered by our standard formatters,
  // we'll create a specific formatter with the same approach as in date-utils.ts
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Handle null or undefined values
  if (!date) return '';

  return formatter.format(new Date(date));
}
