function StripFooter() {
  return (
    <div className="mt-24 border-t border-gray pt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[11px] uppercase tracking-[0.05em] text-mid font-(--font-mono)">
        <div>
          © 2026 STRIPIT — Privacy-first from{" "}
          <span className="text-emerald-700">FCT Abuja, Nigeria</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="http://temisan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Built by Temisan
          </a>

          <a
            href="https://github.com/temisan0x"
            className="hover:text-black transition-colors"
          >
            GitHub
          </a>

          <span className="rounded border border-emerald-300 bg-emerald-50 px-3 py-1 text-[10px] text-emerald-700">
            PRIVACY FIRST
          </span>
        </div>
      </div>

      <p className="mt-8 text-[10px] text-mid/70">
        No tracking. No logs. Your files never leave your device unless you choose to download.
      </p>
    </div>
  );
}

export { StripFooter };
