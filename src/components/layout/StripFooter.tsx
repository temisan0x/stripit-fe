function StripFooter() {
  return (
    <div className="mt-20 flex items-center justify-between border-t border-gray pt-6 text-[11px] uppercase tracking-[0.05em] text-mid font-(--font-mono)">
      <span>© 2026 StripIt — Built by <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">Temisan</a></span>
      <span className="rounded border border-green px-2 py-1 text-[10px] uppercase tracking-widest text-green">
        Privacy First
      </span>
    </div>
  );
}

export { StripFooter };