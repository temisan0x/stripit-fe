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
    f => hasRealValue(before[f.key]) || hasRealValue(after[f.key])
  );

  return (
    <div className="mt-6 overflow-hidden rounded border border-gray-border">
      <div className="flex items-center gap-2 bg-black px-4 py-3">
        <span className="text-[11px] uppercase tracking-widest text-green font-(--font-mono)">
          ⚡ Metadata Report
        </span>
      </div>
      <div className="grid grid-cols-2 bg-white">
        <div className="border-r border-gray-border">
          <MetadataColumn label="Before" color="text-danger" fields={activeFields} data={before} stripped empty={activeFields.length === 0} emptyText="No metadata found" />
        </div>
        <MetadataColumn label="After" color="text-success" fields={activeFields} data={after} empty={activeFields.length === 0} emptyText="Clean ✓" />
      </div>
    </div>
  );
}

export { MetadataCard };