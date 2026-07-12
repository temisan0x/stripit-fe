type TabsProps = {
  active: "url" | "upload";
  onChange: (tab: "url" | "upload") => void;
};

function Tabs({ active, onChange }: TabsProps) {
  const base =
    "flex-1 px-4 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200";

  const activeClass =
    "bg-[var(--primary)] text-white shadow-sm";

  const idleClass =
    "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]";

  return (
    <div className="mb-6 flex overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
      <button
        type="button"
        className={`${base} rounded-lg ${
          active === "url" ? activeClass : idleClass
        }`}
        onClick={() => onChange("url")}
      >
        ⌁ Paste URL
      </button>
      <button
        type="button"
        className={`${base} rounded-lg ${
          active === "upload" ? activeClass : idleClass
        }`}
        onClick={() => onChange("upload")}
      >
        ↑ Upload File
      </button>
    </div>
  );
}

export { Tabs };