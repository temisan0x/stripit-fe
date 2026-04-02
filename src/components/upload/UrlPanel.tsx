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
  // Honest detection - only X works reliably
  const getDetectedPlatform = (): string | null => {
    const trimmed = url.trim();
    if (!trimmed) return null;

    const lower = trimmed.toLowerCase();
    if (lower.includes("x.com") || lower.includes("twitter.com")) {
      return "X";
    }
    return null;
  };

  const detectedPlatform = getDetectedPlatform();
  const isValidUrl = url.trim().length > 0;

  return (
    <div>
      {/* Honest platform chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded border border-emerald-400 bg-emerald-50 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-emerald-700 font-(--font-mono)">
          ✓ X / Twitter
        </span>
        <span className="rounded border border-gray px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-mid font-(--font-mono) line-through opacity-60">
          TikTok
        </span>
        <span className="rounded border border-gray px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-mid font-(--font-mono) line-through opacity-60">
          YouTube
        </span>
      </div>

      {/* Main input + button - keeping your original border design */}
      <div className="relative mb-4 flex overflow-hidden rounded border border-gray bg-white">
        <div className="relative flex-1">
          <input
            type="url"
            ref={inputRef}
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste X / Twitter link here..."
            className="w-full bg-transparent px-4 py-3 pr-12 text-[13px] font-(--font-mono) text-black outline-none disabled:bg-gray-50"
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={onPaste}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-mid transition hover:bg-[#f0efe9] hover:text-black"
            disabled={isProcessing}
            aria-label="Paste from clipboard"
          >
            <FiClipboard className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || isProcessing || !isValidUrl}
          className={`px-6 text-[13px] font-bold transition ${
            disabled || isProcessing
              ? "cursor-not-allowed bg-[#cbd5e1] text-white"
              : "bg-[#2a2a2a] text-white hover:bg-black"
          }`}
        >
          {isProcessing ? "Stripping..." : "Strip & Download"}
        </button>
      </div>

      {/* Feedback + Clear */}
      <div className="flex items-center justify-between text-xs">
        <div>
          {detectedPlatform ? (
            <span className="text-emerald-600 font-medium">✓ Ready for X / Twitter</span>
          ) : isValidUrl ? (
            <span className="text-amber-600">Only X / Twitter works reliably right now</span>
          ) : (
            <span className="text-mid">Currently supports X / Twitter links</span>
          )}
        </div>

        {isValidUrl && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-mid hover:text-black flex items-center gap-1"
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