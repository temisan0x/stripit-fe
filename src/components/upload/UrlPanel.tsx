import type { RefObject } from "react";
import { FiClipboard, FiX } from "react-icons/fi";

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
  // Compute detected platform during render (no state, no effect)
  const getDetectedPlatform = (): string | null => {
    const trimmed = url.trim();
    if (!trimmed) return null;

    const lower = trimmed.toLowerCase();
    if (lower.includes("x.com") || lower.includes("twitter.com")) {
      return "X";
    } else if (lower.includes("tiktok.com")) {
      return "TikTok";
    } else {
      return "Supported";
    }
  };

  const detectedPlatform = getDetectedPlatform();
  const isValidUrl = url.trim().length > 0;

  return (
    <div className="space-y-5">
      {/* Subtle platform hint */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        <span className="rounded bg-gray-100 px-2.5 py-1 text-mid">X / Twitter</span>
        <span className="rounded bg-gray-100 px-2.5 py-1 text-mid">TikTok</span>
        <span className="rounded bg-gray-100 px-2.5 py-1 text-mid">1000+ sites</span>
      </div>

      {/* Main input area - better for mobile */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="url"
            ref={inputRef}
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste X, TikTok or any supported link here..."
            className="w-full rounded-2xl border border-gray bg-white px-5 py-4 text-[15px] font-mono outline-none focus:border-black focus:ring-1 focus:ring-black/10 placeholder:text-gray-400 disabled:bg-gray-50"
            disabled={isProcessing}
          />

          <button
            type="button"
            onClick={onPaste}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black transition-colors"
            disabled={isProcessing}
            aria-label="Paste from clipboard"
          >
            <FiClipboard className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={disabled || isProcessing || !isValidUrl}
          className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] ${
            disabled || isProcessing
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          {isProcessing ? "Stripping..." : "Strip & Download"}
        </button>
      </div>

      {/* Feedback row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-mid">
        <span>PDFs & Docx more coming soon</span>
        
        {detectedPlatform && (
          <span className="text-emerald-600 font-medium">
            ✓ Detected: {detectedPlatform}
          </span>
        )}
      </div>

      {/* Clear button */}
      {isValidUrl && (
        <button
          onClick={onClear}
          className="mx-auto flex items-center gap-1.5 text-sm text-mid hover:text-black transition-colors"
        >
          <FiX className="h-4 w-4" />
          Clear link
        </button>
      )}
    </div>
  );
}

export { UrlPanel };