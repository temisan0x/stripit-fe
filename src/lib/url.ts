const SUPPORTED_URL_HOSTS = ["x.com", "twitter.com"];

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isSupportedHost(hostname: string) {
  return SUPPORTED_URL_HOSTS.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );
}

export function isXTwitterUrl(value: string) {
  const normalized = normalizeUrl(value);
  if (!normalized) return false;

  try {
    const hostname = new URL(normalized).hostname.toLowerCase();
    return isSupportedHost(hostname);
  } catch {
    return false;
  }
}
