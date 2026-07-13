import type React from 'react';
import { MetadataColumn } from "./MetadataColumn";
import type { MetadataPayload } from "@/types/stripit";
import { FIELDS } from "@/lib/constants";

const hasRealValue = (val: unknown) =>
  val !== undefined && val !== null && String(val).trim() !== "";

type MetadataCardProps = {
  metadata: MetadataPayload | null;
};

function MetadataCard({ metadata }: MetadataCardProps) {
  if (!metadata) return null;

  const before = metadata.before || {};
  const after = metadata.after || {};

  const activeFields = FIELDS.filter(
    (f) => hasRealValue(before[f.key]) || hasRealValue(after[f.key])
  );

  const beforeColumnStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(244,63,94,0.04), transparent)',
  };

  const afterColumnStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(16,185,129,0.04), transparent)',
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      {/* faint centered watermark to give a subtle "AI" / robotic feel */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[90px] font-extrabold text-white opacity-5 select-none">
        AI
      </span>
      {/* Header */}
      <div className="flex items-center justify-between bg-[var(--surface-elevated)] px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[1.5px] font-mono text-[var(--primary)]">
            ⚡ METADATA REPORT
          </span>
        </div>

        {metadata.stripped && (
          <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] pulse-dot inline-block" />
            Successfully Stripped
          </span>
        )}
      </div>

      {/* Before / After Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative border-b md:border-b-0 md:border-r-0 border-[var(--border)]
            after:content-[''] after:hidden md:after:block after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px
            after:bg-gradient-to-b after:from-transparent after:via-[var(--danger)]/40 after:to-transparent"
          style={beforeColumnStyle}
        >
          <MetadataColumn
            label="Before"
            color="text-[var(--danger)]"
            fields={activeFields}
            data={before}
            empty={activeFields.length === 0}
            emptyText="No metadata found"
          />
        </div>

        <div style={afterColumnStyle}>
          <MetadataColumn
            label="After"
            color="text-[var(--success)]"
            fields={activeFields}
            data={after}
            empty={activeFields.length === 0}
            emptyText="Clean ✓"
          />
        </div>
      </div>
    </div>
  );
}

export { MetadataCard };