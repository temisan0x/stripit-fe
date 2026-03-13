const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
const normalizedBase = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

const API_BASE = normalizedBase;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function buildApiUrl(path: string) {
  if (!path.startsWith("/")) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
}

function withApiKeyHeaders(headers: HeadersInit = {}) {
  if (!API_KEY) return headers;
  return { ...headers, "x-api-key": API_KEY };
}

export { API_BASE, API_KEY, buildApiUrl, withApiKeyHeaders };
