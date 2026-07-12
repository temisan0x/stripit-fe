"use client";

import Script from "next/script";
import { MetadataCard } from "./metadata";
import { UploadPanel, UrlPanel } from "./upload";
import { Tabs, ProgressSection, ResultCard } from "./ui";
import { StripHeader, StripFooter, StripHero, MatrixCanvas } from "./layout";
import { useStripit } from "../hooks/useStripit";

function StripItApp() {
  const {
    activeTab,
    setActiveTab,
    url,
    setUrl,
    file,
    setFile,
    isDragging,
    setIsDragging,
    isProcessing,
    progress,
    logs,
    error,
    setError,
    result,
    metadata,
    downloadExpired,
    backendStatus,
    checkBackendStatus,
    canvasRef,
    uploadFile,
    stripFromUrl,
    handleFileRemove,
    handleUrlPaste,
  } = useStripit();

  return (
    <>
      <Script
        src="https://cdn.socket.io/4.8.0/socket.io.min.js"
        strategy="afterInteractive"
      />
      <MatrixCanvas canvasRef={canvasRef} />

      <div className="relative z-10 mx-auto max-w-170 px-6 pb-20 pt-14">
        <StripHeader />

        <StripHero />

        <div className="my-10 h-px w-full" />

        <Tabs active={activeTab} onChange={(tab) => setActiveTab(tab)} />

        {/* Backend Status */}
        <div className="my-6 flex items-center gap-2 text-[10px] font-mono text-[var(--text-secondary)]">
          <span>Privacy engine</span>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] ${
              backendStatus === "online"
                ? "border-[var(--primary)]/40 bg-[var(--primary-muted)] text-[var(--primary)]"
                : "border-[var(--warning)]/40 bg-[rgba(245,158,11,0.1)] text-[var(--warning)]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                backendStatus === "online"
                  ? "bg-[var(--primary)] animate-pulse"
                  : "bg-[var(--warning)]"
              }`}
            />
            {backendStatus === "online"
              ? "Online"
              : backendStatus === "checking"
                ? "Checking..."
                : "Waking up…"}
          </div>

          {backendStatus !== "online" && (
            <button
              onClick={checkBackendStatus}
              disabled={backendStatus === "checking"}
              className="underline underline-offset-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
            >
              Retry
            </button>
          )}
        </div>
        {activeTab === "url" ? (
          <UrlPanel
            url={url}
            onUrlChange={(value) => {
              setUrl(value);
              if (error) setError(null);
            }}
            onPaste={handleUrlPaste}
            onClear={() => setUrl("")}
            onSubmit={stripFromUrl}
            disabled={isProcessing}
          />
        ) : (
          <UploadPanel
            file={file}
            onFileChange={(nextFile) => {
              setFile(nextFile);
              if (error) setError(null);
            }}
            onRemove={handleFileRemove}
            onSubmit={uploadFile}
            disabled={isProcessing || !file}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        )}
        {error && (
          <div className="mt-4 rounded-lg border border-[var(--danger)]/30 bg-[var(--danger-muted)] px-4 py-3 text-[13px] text-[var(--danger)] font-mono">
            &gt; Error: {error}
          </div>
        )}

        <ProgressSection
          progress={progress}
          logs={logs}
          visible={isProcessing || (progress > 0 && !result)}
        />

        {result && (
          <ResultCard
            filename={result.filename}
            url={result.url}
            expired={downloadExpired}
          />
        )}

        <MetadataCard metadata={metadata} />

        <StripFooter />
      </div>
    </>
  );
}

export { StripItApp };
