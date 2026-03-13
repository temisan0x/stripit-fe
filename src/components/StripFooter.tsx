function StripFooter() {
  return (
    <div className="mt-20 flex items-center justify-between border-t border-[var(--gray)] pt-6 text-[11px] uppercase tracking-[0.05em] text-[var(--mid)] font-[var(--font-mono)]">
      <span>© 2026 StripIt</span>
      <span className="rounded border border-[var(--green)] px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-[var(--green)]">
        Privacy First
      </span>
    </div>
  );
}

export { StripFooter };
