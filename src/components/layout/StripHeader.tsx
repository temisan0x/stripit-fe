function StripHeader() {
  return (
    <div className="mt-16 flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
      <span className="h-2 w-2 rounded-full bg-[var(--primary)] pulse-dot" />
      STRIPIT
    </div>
  );
}

export { StripHeader };