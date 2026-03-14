import type { RefObject } from "react";
import { FiClipboard } from "react-icons/fi";

type UrlPanelProps = {
  url: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onUrlChange: (value: string) => void;
  onPaste: () => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled: boolean;
};

function UrlPanel({
  url,
  inputRef,
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
            className="rounded border border-[var(--gray)] px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-[var(--mid)] font-[var(--font-mono)]"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative mb-4 flex overflow-hidden rounded border border-[var(--gray)] bg-white">
        <div className="relative flex-1">
          <input
            type="url"
            className="w-full bg-transparent px-4 py-3 pr-12 text-[13px] font-[var(--font-mono)] text-[var(--black)] outline-none"
            placeholder="Paste the X/Twitter link here..."
            value={url}
            onChange={(event) => onUrlChange(event.target.value)}
            ref={inputRef}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-[var(--mid)] transition hover:bg-[#f0efe9] hover:text-[var(--black)]"
            onClick={onPaste}
            aria-label="Paste URL from clipboard"
            title="Paste"
          >
            <FiClipboard className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          className={`px-6 text-[13px] font-bold transition ${
            disabled
              ? "cursor-not-allowed bg-[#cbd5e1] text-white"
              : "bg-[#2a2a2a] text-white hover:bg-[#2a2a2a]"
          }`}
          onClick={onSubmit}
          disabled={disabled}
        >
          Download
        </button>
      </div>

      {url.trim() && (
        <button
          type="button"
          className="text-sm text-[var(--mid)] hover:text-[var(--black)]"
          onClick={onClear}
        >
          Clear URL
        </button>
      )}
    </div>
  );
}

export { UrlPanel };
