/**
 * Utility functions for URL generation
 */

/**
 * Get the base URL for the application
 * Automatically detects domain in production, uses localhost in development
 */
export const getBaseUrl = (): string => {
  // In production, use the actual domain
  if (typeof window !== "undefined") {
    // Client-side: use current origin
    return window.location.origin;
  }

  // Server-side: check environment variables
  if (process.env.NODE_ENV === "production") {
    // In production, you can set NEXT_PUBLIC_BASE_URL in your environment
    return process.env.NEXT_PUBLIC_BASE_URL || "https://frame.id";
  }

  // Development fallback
  return "http://localhost:3000";
};

/**
 * Generate twibbon URL with dynamic domain
 */
export const getTwibbonUrl = (slug: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/twibbon/${slug}`;
};

/**
 * Get the display URL for twibbon (what users see in UI)
 * Shows the domain part that will be used
 */
export const getTwibbonDisplayUrl = (): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/twibbon/`;
};

/**
 * Get just the domain part for display
 */
export const getDomainDisplay = (): string => {
  const baseUrl = getBaseUrl();
  try {
    const url = new URL(baseUrl);
    return url.hostname;
  } catch {
    return "frame.id";
  }
};
