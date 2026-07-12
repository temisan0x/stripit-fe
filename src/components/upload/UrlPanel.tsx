import type { RefObject } from "react";
import { FiClipboard, FiX } from "react-icons/fi";
import { isXTwitterUrl } from "@/lib/url";

type UrlPanelProps = {
  url: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onUrlChange: (value: string) => void;
  onPaste: () => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled: boolean;
  isProcessing?: boolean;
};

function UrlPanel({
  url,
  inputRef,
  onUrlChange,
  onPaste,
  onClear,
  onSubmit,
  disabled,
  isProcessing = false,
}: UrlPanelProps) {
  const hasInput = url.trim().length > 0;
  const isXLink = isXTwitterUrl(url);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Platform */}
      <div className="mb-5 flex items-center gap-3 text-xs">
        <span className="text-[var(--primary)] font-medium">✓ X / Twitter</span>
        <span className="text-[var(--text-muted)]">Only X links supported right now</span>
      </div>

      {/* Input Group */}
      <div className="flex gap-0 mb-3 border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--surface)]">
        <div className="relative flex-1">
          <input
            type="url"
            ref={inputRef}
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste X / Twitter link..."
            className="w-full bg-transparent px-4 py-3.5 text-[15px] font-mono text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={onPaste}
            disabled={isProcessing}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Paste"
          >
            <FiClipboard className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={disabled || isProcessing || !hasInput || !isXLink}
          className={`px-6 py-3.5 text-sm font-semibold transition-colors ${
            disabled || isProcessing || !hasInput || !isXLink
              ? "bg-[var(--surface-elevated)] text-[var(--text-muted)] cursor-not-allowed"
              : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
          }`}
        >
          {isProcessing ? "Stripping..." : "Strip"}
        </button>
      </div>

      {/* Feedback */}
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-4">
          {hasInput && !isXLink && (
            <span className="text-[var(--warning)]">Unsupported link</span>
          )}
          {hasInput && isXLink && (
            <span className="text-[var(--primary)]">Looks good</span>
          )}
        </div>

        {hasInput && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
          >
            <FiX className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export { UrlPanel };