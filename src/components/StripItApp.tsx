"use client";

import Script from "next/script";
import { MatrixCanvas } from "./MatrixCanvas";
import { MetadataCard } from "./MetadataCard";
import { ProgressSection } from "./ProgressSection";
import { ResultCard } from "./ResultCard";
import { StripFooter } from "./StripFooter";
import { StripHeader } from "./StripHeader";
import { Tabs } from "./Tabs";
import { UploadPanel } from "./UploadPanel";
import { UrlPanel } from "./UrlPanel";
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
    canvasRef,
    uploadFile,
    stripFromUrl,
    handleFileRemove,
    handleUrlPaste,
  } = useStripit();

  return (
    <>
      <Script src="/socket.io/socket.io.js" strategy="afterInteractive" />
      <MatrixCanvas canvasRef={canvasRef} />

      <div className="relative z-10 mx-auto max-w-[680px] px-6 pb-20 pt-14">
        <StripHeader />

        <h1 className="text-[clamp(42px,8vw,72px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--ink)]">
          Strip.
          <br />
          <span style={{ WebkitTextStroke: "2px var(--ink)", color: "transparent" }}>
            Protect.
          </span>
          <br />
          Share.
        </h1>
        <p className="mt-4 text-[13px] leading-relaxed text-[var(--mid)] font-[var(--font-mono)]">
          // Strip your metadata before they strip your privacy
        </p>

        <div className="my-10 h-px w-full bg-[var(--gray)]" />

        <Tabs active={activeTab} onChange={(tab) => setActiveTab(tab)} />

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
          <div className="mt-4 rounded border-l-4 border-[#ff4444] bg-[#fff0f0] px-4 py-3 text-[12px] text-[#cc0000] font-[var(--font-mono)]">
            &gt; Error: {error}
          </div>
        )}

        <ProgressSection
          progress={progress}
          logs={logs}
          visible={isProcessing || (progress > 0 && !result)}
        />

        {result && (
          <ResultCard filename={result.filename} url={result.url} expired={downloadExpired} />
        )}

        <MetadataCard metadata={metadata} />

        <StripFooter />
      </div>
    </>
  );
}

export { StripItApp };
