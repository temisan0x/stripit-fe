type ProgressSectionProps = {
  progress: number;
  logs: string[];
  visible: boolean;
};

function ProgressSection({ progress, logs, visible }: ProgressSectionProps) {
  if (!visible) return null;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
        <span>Stripping metadata</span>
        <span className="text-[var(--primary)] font-medium">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--surface-elevated)]">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="mt-4 h-[100px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs text-[var(--text-secondary)]">
          <div className="flex h-full flex-col-reverse gap-1 overflow-y-auto">
            {logs.map((line, idx) => (
              <div key={`${line}-${idx}`} className="leading-5">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { ProgressSection };