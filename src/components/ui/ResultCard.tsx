import { buildDownloadUrl } from "../../lib/api";

type ResultCardProps = {
  filename: string;
  url: string;
  expired: boolean;
};

function ResultCard({ filename, url, expired }: ResultCardProps) {
  const downloadUrl = buildDownloadUrl(url, filename);

  return (
    <div className="mt-8 rounded border border-foreground bg-white p-6">
      <p className="mb-3 text-[11px] uppercase tracking-widest text-mid font-(--font-mono)">
        ✓ &nbsp;File stripped successfully
      </p>
      <p className="mb-4 break-all text-[15px] font-bold text-foreground">
        {filename}
      </p>
      
      <a
        href={downloadUrl}
        className={`inline-flex items-center gap-2 rounded bg-green px-5 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-foreground shadow-[0_0_20px_rgba(0,255,65,0.3)] transition ${
          expired
            ? "pointer-events-none opacity-40"
            : "hover:bg-green-dim hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
        }`}
        download={filename || "stripped-file"}
      >
        {expired ? "× Link expired — upload again" : "↓  Download clean file"}
      </a>
    </div>
  );
}

export { ResultCard };