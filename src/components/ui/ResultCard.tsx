import { buildDownloadUrl } from "../../lib/api";

type ResultCardProps = {
  filename: string;
  url: string;
  expired: boolean;
};

function ResultCard({ filename, url, expired }: ResultCardProps) {
  const downloadUrl = buildDownloadUrl(url, filename);

  return (
    <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="mb-2 text-xs font-mono text-[var(--primary)]">
        ✓ File stripped successfully
      </p>

      <p className="mb-5 break-all text-[15px] font-medium text-[var(--text-primary)]">
        {filename}
      </p>

      <a
        href={downloadUrl}
        download={filename || "stripped-file"}
        className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
          expired
            ? "pointer-events-none bg-[var(--surface-elevated)] text-[var(--text-muted)] opacity-60"
            : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
        }`}
      >
        {expired ? "× Link expired — upload again" : "↓ Download clean file"}
      </a>
    </div>
  );
}

export { ResultCard };