"use client";

import Script from "next/script";
import { MatrixCanvas } from "./layout/MatrixCanvas";
import { MetadataCard } from "./metadata/MetadataCard";
import { ProgressSection } from "./ui/ProgressSection";
import { ResultCard } from "./ui/ResultCard";
import { StripFooter } from "./layout/StripFooter";
import { StripHeader } from "./layout/StripHeader";
import { Tabs } from "./ui/Tabs";
import { UploadPanel } from "./upload/UploadPanel";
import { UrlPanel } from "./upload/UrlPanel";
import { useStripit } from "../hooks/useStripit";
import StripHero from "./layout/StripHero";

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
