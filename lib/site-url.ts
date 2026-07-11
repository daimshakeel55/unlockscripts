const PRODUCTION_FALLBACK = "https://unlockscripts.com";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function isLocalhostUrl(url: string): boolean {
  return /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url);
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured && !isLocalhostUrl(configured)) {
    return normalizeSiteUrl(configured);
  }
  return PRODUCTION_FALLBACK;
}

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
