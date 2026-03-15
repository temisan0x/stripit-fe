type TabsProps = {
  active: "url" | "upload";
  onChange: (tab: "url" | "upload") => void;
};

function Tabs({ active, onChange }: TabsProps) {
  const base = "flex-1 px-3 py-3 text-[13px] font-bold uppercase tracking-[0.05em] transition";
  const activeClass = "bg-black text-white";
  const idleClass = "bg-white text-mid hover:bg-[#fafaf8] hover:text-black";

  return (
    <div className="mb-6 flex overflow-hidden rounded border border-gray">
      <button
        type="button"
        className={`${base} ${active === "url" ? activeClass : idleClass}`}
        onClick={() => onChange("url")}
      >
        ⌁ Paste URL
      </button>
      <button
        type="button"
        className={`${base} ${active === "upload" ? activeClass : idleClass}`}
        onClick={() => onChange("upload")}
      >
        ↑ Upload File
      </button>
    </div>
  );
}

export { Tabs };