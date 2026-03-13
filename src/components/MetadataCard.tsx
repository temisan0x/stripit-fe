type MetadataPayload = {
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
};

const FIELDS = [
  { key: "GPS", label: "Location" },
  { key: "date", label: "Date" },
  { key: "device", label: "Device" },
  { key: "encoder", label: "Encoder" },
  { key: "software", label: "Software" },
  { key: "location", label: "GPS Tag" },
];

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
    (field) => hasRealValue(before[field.key]) || hasRealValue(after[field.key]),
  );

  return (
    <div className="mt-6 overflow-hidden rounded border border-[#e0dfd9]">
      <div className="flex items-center gap-2 bg-[var(--black)] px-4 py-3">
        <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--green)] font-[var(--font-mono)]">
          ⚡ Metadata Report
        </span>
      </div>
      <div className="grid grid-cols-2 gap-0 bg-white">
        <div className="border-r border-[#e0dfd9] p-4">
          <div className="mb-3 text-[10px] uppercase tracking-[0.15em] text-[#cc4444] font-[var(--font-mono)]">
            ● Before
          </div>
          {activeFields.length === 0 ? (
            <div className="text-[11px] italic text-[var(--mid)] font-[var(--font-mono)]">
              No metadata found
            </div>
          ) : (
            activeFields.map((field) => {
              const value = before[field.key];
              const hasValue = hasRealValue(value);
              return (
                <div key={field.key} className="mb-2">
                  <div className="text-[10px] uppercase tracking-[0.05em] text-[var(--mid)] font-[var(--font-mono)]">
                    {field.label}
                  </div>
                  <div
                    className={`text-[11px] font-[var(--font-mono)] ${
                      hasValue
                        ? "text-[var(--green-dim)] line-through opacity-60"
                        : "text-[var(--green-dim)] italic"
                    }`}
                  >
                    {hasValue ? String(value) : "—"}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-4">
          <div className="mb-3 text-[10px] uppercase tracking-[0.15em] text-[#00cc33] font-[var(--font-mono)]">
            ● After
          </div>
          {activeFields.length === 0 ? (
            <div className="text-[11px] italic text-[var(--mid)] font-[var(--font-mono)]">
              Clean ✓
            </div>
          ) : (
            activeFields.map((field) => {
              const value = after[field.key];
              return (
                <div key={field.key} className="mb-2">
                  <div className="text-[10px] uppercase tracking-[0.05em] text-[var(--mid)] font-[var(--font-mono)]">
                    {field.label}
                  </div>
                  <div className="text-[11px] italic text-[var(--green-dim)] font-[var(--font-mono)]">
                    {value ? String(value) : "✓ removed"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export { MetadataCard };
