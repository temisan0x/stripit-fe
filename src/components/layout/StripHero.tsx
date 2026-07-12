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
            textShadow: "0 4px 30px rgba(207, 35, 22, 0.4)",
          }}
        >
          Protect.
        </span>
        <br />
        Share.
      </h1>

      <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-[var(--text-secondary)] font-light">
        Remove invisible tracking metadata from X/Twitter links before anyone
        else can use it against you.
      </p>

      <div className="mt-10 flex items-center gap-3 text-sm">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--accent)]">
          <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
          <span className="font-medium tracking-wide">
            12,847 creators &amp; journalists protected this month
          </span>
        </div>
      </div>
    </>
  );
}

export default StripHero;
