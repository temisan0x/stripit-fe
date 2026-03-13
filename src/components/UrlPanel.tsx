type UrlPanelProps = {
  url: string;
  onUrlChange: (value: string) => void;
  onPaste: () => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled: boolean;
};

function UrlPanel({
  url,
  onUrlChange,
  onPaste,
  onClear,
  onSubmit,
  disabled,
}: UrlPanelProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {["Twitter / X", "TikTok", "Instagram", "1000+ sites"].map((label) => (
          <span
            key={label}
            className="rounded border border-[var(--gray)] px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-[var(--mid)] font-(--font-mono)"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative mb-4">
        <button
          type="button"
          className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded text-sm text-[var(--mid)] hover:bg-[#f0efe9] hover:text-[var(--black)]"
          onClick={onPaste}
          aria-label="Paste URL from clipboard"
          title="Paste"
        >
          📋
        </button>
        <input
          type="url"
          className="w-full rounded border border-[var(--gray)] bg-white px-11 py-4 text-[13px] font-[var(--font-mono)] text-[var(--black)] outline-none transition focus:border-[var(--black)]"
          placeholder="https://twitter.com/... or tiktok.com/..."
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
        />
        <button
          type="button"
          className={`absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded text-sm transition ${
            url.trim()
              ? "text-[var(--mid)] hover:bg-[#f0efe9] hover:text-[var(--black)]"
              : "pointer-events-none opacity-0"
          }`}
          onClick={onClear}
          aria-label="Clear URL"
          title="Clear"
        >
          ×
        </button>
      </div>

      <button
        type="button"
        className={`w-full rounded bg-[var(--ink)] py-4 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--white)] transition ${
          disabled ? "cursor-not-allowed opacity-40" : "hover:bg-[#2a2a2a]"
        }`}
        onClick={onSubmit}
        disabled={disabled}
      >
        Strip from URL →
      </button>
    </div>
  );
}

export { UrlPanel };
