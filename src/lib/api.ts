export function buildDownloadUrl(url: string, filename: string) {
  return `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename || "stripped-file")}`;
}