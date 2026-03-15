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
        className={`relative block cursor-pointer rounded border-2 border-dashed px-6 py-12 text-center transition ${
          isDragging ? "border-black bg-[#fafaf8]" : "border-gray bg-white"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          onFileChange(e.dataTransfer.files?.[0] || null);
        }}
      >
        <svg
          className="mx-auto mb-4 h-10 w-10 opacity-40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M20 28V12M20 12L13 19M20 12L27 19" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 30C5.8 28.5 4 26 4 23C4 18.6 7.6 15 12 15C12.3 15 12.7 15 13 15.1C14.3 11.5 17.9 9 22 9C27.5 9 32 13.5 32 19C32 19.3 32 19.7 31.9 20C34.2 20.9 36 23.2 36 26C36 29.3 33.3 32 30 32" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[15px] font-bold text-ink">Drop your file here</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.05em] text-mid font-(--font-mono)">
          JPG · PNG · WEBP · MP4 · Max 30MB
        </p>
        <input
          type="file"
          className="sr-only"
          accept="image/jpeg,image/png,image/webp,video/mp4"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
        {isDragging && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-extrabold">
            Drop it.
          </span>
        )}
      </label>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded bg-ink px-4 py-2 text-[12px] text-white font-(--font-mono)">
          <span>📎</span>
          <span className="flex-1 truncate">{file.name}</span>
          <button type="button" className="text-base opacity-60 hover:opacity-100" onClick={onRemove} aria-label="Remove file">
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        className={`mt-4 w-full rounded bg-ink py-4 text-[13px] font-bold uppercase tracking-[0.05em] text-white transition ${
          disabled ? "cursor-not-allowed opacity-40" : "hover:bg-[#2a2a2a]"
        }`}
        onClick={onSubmit}
        disabled={disabled}
      >
        {disabled ? "Select a file to strip" : "Strip Metadata →"}
      </button>
    </div>
  );
}

export { UploadPanel };