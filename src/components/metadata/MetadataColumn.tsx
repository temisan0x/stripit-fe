import { MetadataField } from "./MetadataField";

type MetadataColumnProps = {
  label: string;
  color: string;
  fields: { key: string; label: string }[];
  data: Record<string, unknown>;
  stripped?: boolean;
  empty: boolean;
  emptyText: string;
};

function MetadataColumn({ label, color, fields, data, stripped, empty, emptyText }: MetadataColumnProps) {
  return (
    <div className="p-4">
      <div className={`mb-3 text-[10px] uppercase tracking-[0.15em] font-(--font-mono) ${color}`}>
        ● {label}
      </div>
      {empty ? (
        <div className="text-[11px] italic text-mid font-(--font-mono)">{emptyText}</div>
      ) : (
        fields.map(field => (
          <MetadataField key={field.key} label={field.label} value={data[field.key]} stripped={stripped} />
        ))
      )}
    </div>
  );
}

export { MetadataColumn };