type UploadPanelProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
  onSubmit: () => void;
  disabled: boolean;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
};

function UploadPanel({
  file,
  onFileChange,
  onRemove,
  onSubmit,
  disabled,
  isDragging,
  setIsDragging,
}: UploadPanelProps) {
  return (
    <div>
      <label
        className={`relative block cursor-pointer rounded-xl border border-dashed px-6 py-12 text-center transition-colors ${
          isDragging
            ? "border-[var(--primary)] bg-[var(--primary-muted)]"
            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-muted)]"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          onFileChange(e.dataTransfer.files?.[0] || null);
        }}
      >
        <div className="mb-4 text-3xl opacity-40">↑</div>

        <p className="text-[15px] font-medium text-[var(--text-primary)]">
          {isDragging ? "Drop it." : "Drop your file here"}
        </p>
        <p className="mt-1.5 text-xs text-[var(--text-muted)] font-mono">
          JPG · PNG · WEBP · MP4 · Max 30MB
        </p>

        <input
          type="file"
          className="sr-only"
          accept="image/jpeg,image/png,image/webp,video/mp4"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
      </label>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
          <span className="text-[var(--text-muted)]">📎</span>
          <span className="flex-1 truncate text-[var(--text-primary)] font-mono">
            {file.name}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Remove file"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className={`mt-4 w-full rounded-lg py-3.5 text-sm font-semibold transition-colors ${
          disabled
            ? "bg-[var(--surface-elevated)] text-[var(--text-muted)] cursor-not-allowed"
            : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
        }`}
      >
        {disabled ? "Select a file to strip" : "Strip Metadata"}
      </button>
    </div>
  );
}

export { UploadPanel };