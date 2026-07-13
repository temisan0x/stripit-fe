function StripFooter() {
  return (
    <div className="relative mt-16 pt-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] uppercase tracking-[0.05em] text-[var(--text-muted)] font-mono">
        <div>
          © 2026 STRIPIT ·{" "}
          <span className="text-[var(--primary)]">FCT Abuja, Nigeria</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="http://temisan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Built by Temisan
          </a>
          <a
            href="https://github.com/temisan0x"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export { StripFooter };
