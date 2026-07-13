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

  const columnStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.02)',
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 12px, transparent 12px 24px)',
    WebkitBackdropFilter: 'blur(4px)',
    backdropFilter: 'blur(4px)',
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-[var(--border)] glass bg-[var(--surface-elevated)]/60 backdrop-blur-sm">
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
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-medium">
            Successfully Stripped
          </span>
        )}
      </div>

      {/* Before / After Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r border-[var(--border)]" style={columnStyle}>
          <MetadataColumn
            label="Before"
            color="text-[var(--danger)]"
            fields={activeFields}
            data={before}
            empty={activeFields.length === 0}
            emptyText="No metadata found"
          />
        </div>

        <div style={columnStyle}>
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