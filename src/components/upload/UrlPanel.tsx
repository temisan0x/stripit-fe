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
      {/* Platform Indicator */}
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <span className="text-base leading-none">✓</span> X / Twitter
        </span>
        <span className="text-xs text-mid">
          • Only X links supported right now
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-3 group">
        <div className="relative flex-1 border border-gray bg-white overflow-hidden">
          <input
            type="url"
            ref={inputRef}
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste X / Twitter link here..."
            className="w-full bg-transparent px-5 py-4 text-[15px] font-(--font-mono) text-black outline-none placeholder:text-mid"
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={onPaste}
            disabled={isProcessing}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-mid hover:text-black transition-colors"
            aria-label="Paste from clipboard"
          >
            <FiClipboard className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={disabled || isProcessing || !hasInput || !isXLink}
          className={`px-8 py-4 font-semibold text-sm transition-all shadow-sm ${
            disabled || isProcessing || !isXLink
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray"
              : "bg-black text-white hover:bg-zinc-900"
          }`}
        >
          {isProcessing ? "Stripping..." : "Strip & Download"}
        </button>
      </div>

      {/* Feedback Row */}
      <div className="flex flex-col items-start gap-2 px-1 text-xs text-mid sm:flex-row sm:items-center sm:justify-between">
        <span>Currently supports X / Twitter links only</span>

        {hasInput && !isXLink && (
          <span className="text-amber-600">
            Unsupported link. Use an X / Twitter URL.
          </span>
        )}

        {hasInput && isXLink && (
          <span className="text-emerald-600">✓ Looks good</span>
        )}

        {hasInput && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <FiX className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

export { UrlPanel };
