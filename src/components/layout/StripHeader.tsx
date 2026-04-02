function StripHeader() {
  return (
    <div className="mb-16 flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-mid font-(--font-mono)">
      <span 
        className="h-2 w-2 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)] animate-pulse" 
      />
      STRIPIT
    </div>
  );
}

export { StripHeader };