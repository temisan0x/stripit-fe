function StripHero() {
  return (
    <>
      <h1 className="text-[clamp(42px,8vw,72px)] font-extrabold leading-none tracking-[-0.03em] text-ink">
        Strip.
        <br />
        <span style={{ WebkitTextStroke: "2px var(--ink)", color: "transparent" }}>
          Protect.
        </span>
        <br />
        Share.
      </h1>
      <p className="mt-4 text-[13px] leading-relaxed text-mid font-(--font-mono)">
        {`//   Remove invisible tracking metadata from X/Twitter links before anyone else can use it against you.`}
      </p>
    </>
  );
}

export default StripHero;