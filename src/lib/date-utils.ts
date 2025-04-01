/**
 * Utility functions for consistent date formatting between server and client
 */

// Create formatter instances with explicit locale and options for consistency
const standardDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
});

/**
 * Format a date to a consistent string representation
 * @param date Date to format
 * @returns Date string in MM/DD/YYYY format with consistent padding
 */
export function formatDate(date: Date | string | number): string {
    // Handle null or undefined values
    if (!date) return '';

    // Using Intl.DateTimeFormat for consistent output between server and client
    return standardDateFormatter.format(new Date(date));
}

/**
 * Format date as MM/DD/YYYY without padding
 * Use this if you need the short format without leading zeros
 */
export function formatShortDate(date: Date | string | number): string {
    // Handle null or undefined values
    if (!date) return '';

    // Using Intl.DateTimeFormat for consistent output
    return shortDateFormatter.format(new Date(date));
}

/**
 * Format a date range consistently
 * @param startDate Start date
 * @param endDate End date
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date | string | number, endDate: Date | string | number): string {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
} 