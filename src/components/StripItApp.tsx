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

      <div className="relative z-10 mx-auto max-w-170 px-6 pb-20 pt-14">
        <StripHeader />

        <StripHero />

        <div className="my-10 h-px w-full bg-gray" />

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
          <div className="mt-4 rounded border-l-4 border-[#ff4444] bg-[#fff0f0] px-4 py-3 text-[12px] text-[#cc0000] font-(--font-mono)">
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
