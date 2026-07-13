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

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] glass">
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
        <div className="border-b md:border-b-0 md:border-r border-[var(--border)]">
          <MetadataColumn
            label="Before"
            color="text-[var(--danger)]"
            fields={activeFields}
            data={before}
            empty={activeFields.length === 0}
            emptyText="No metadata found"
          />
        </div>

        <div>
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