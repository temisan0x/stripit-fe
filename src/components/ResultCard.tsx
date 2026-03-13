import { buildApiUrl } from "../lib/api";

type ResultCardProps = {
  filename: string;
  url: string;
  expired: boolean;
};

function ResultCard({ filename, url, expired }: ResultCardProps) {
  const downloadUrl = buildApiUrl(
    `/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(
      filename || "stripped-file",
    )}`,
  );

  return (
    <div className="mt-8 rounded border border-[var(--ink)] bg-[var(--white)] p-6">
      <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-[var(--mid)] font-[var(--font-mono)]">
        ✓ &nbsp;File stripped successfully
      </p>
      <p className="mb-4 break-all text-[15px] font-bold text-[var(--ink)]">
        {filename}
      </p>
      <a
        href={downloadUrl}
        className={`inline-flex items-center gap-2 rounded bg-[var(--green)] px-5 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--ink)] shadow-[0_0_20px_rgba(0,255,65,0.3)] transition ${
          expired
            ? "pointer-events-none opacity-40"
            : "hover:bg-[var(--green-dim)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
        }`}
        download={filename || "stripped-file"}
      >
        {expired ? "× Link expired — upload again" : "↓  Download clean file"}
      </a>
    </div>
  );
}

export { ResultCard };
