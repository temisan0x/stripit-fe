type ProgressSectionProps = {
  progress: number;
  logs: string[];
  visible: boolean;
};

function ProgressSection({ progress, logs, visible }: ProgressSectionProps) {
  if (!visible) return null;

  return (
    <div className="mt-8">
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-[var(--mid)] font-[var(--font-mono)]">
        <span>Stripping metadata</span>
        <span className="text-[13px] font-medium text-[var(--green)]">{progress}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-[var(--gray)]">
        <div
          className="h-full bg-[var(--green)] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {logs.length > 0 && (
        <div className="mt-4 flex h-[100px] flex-col-reverse overflow-hidden rounded bg-[var(--ink)] p-4 text-[11px] text-[var(--green)] font-[var(--font-mono)]">
          {logs.map((line, idx) => (
            <div key={`${line}-${idx}`} className="leading-7 opacity-80">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ProgressSection };
