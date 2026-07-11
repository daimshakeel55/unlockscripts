const PRODUCTION_FALLBACK = "https://unlockscripts.com";
const DEVELOPMENT_FALLBACK = "http://localhost:3000";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return normalizeSiteUrl(configured);
  }
  if (process.env.NODE_ENV === "development") {
    return DEVELOPMENT_FALLBACK;
  }
  return PRODUCTION_FALLBACK;
}

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
