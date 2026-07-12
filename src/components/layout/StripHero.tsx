function StripHero() {
  return (
    <>
      <h1 className="text-[clamp(42px,8vw,72px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--text-primary)]">
        Strip.
        <br />
        <span
          style={{
            WebkitTextStroke: "2.5px var(--primary)",
            color: "transparent",
            textShadow: "0 0 40px rgba(16, 185, 129, 0.25)",
          }}
        >
          Protect.
        </span>
        <br />
        Share.
      </h1>

      <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
        Remove invisible tracking metadata from X/Twitter links before anyone else can use it against you.
      </p>

      <div className="mt-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--primary)]/25 bg-[var(--primary-muted)] text-[var(--primary)] text-sm font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <span>12,847 creators & journalists protected this month</span>
        </div>
      </div>
    </>
  );
}

export default StripHero;