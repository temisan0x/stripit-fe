"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "./useSocket";
import { useMatrix } from "./useMatrix";
import useUpload from "./useUpload";
import useUrlStrip from "./useUrlStrip";
import type { MetadataPayload, StripitResult } from "@/types/stripit";
import { LOG_MESSAGES } from "@/lib/constants";

async function runBackendCheck(
  setBackendStatus: (status: "checking" | "online" | "offline") => void,
) {
  setBackendStatus("checking");
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 7000);
  try {
    const res = await fetch("/api/health", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    setBackendStatus(res.ok ? "online" : "offline");
  } catch {
    setBackendStatus("offline");
  } finally {
    clearTimeout(timeoutId);
  }
}

function useStripit() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StripitResult | null>(null);
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<MetadataPayload | null>(null);
  const [downloadExpired, setDownloadExpired] = useState(false);
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const { startMatrix, stopMatrix, canvasRef } = useMatrix();
  const socketRef = useSocket(setProgress);

  const logTimerRef = useRef<number | null>(null);

  const startLog = () => {
    setLogs([]);
    let index = 0;
    logTimerRef.current = window.setInterval(() => {
      if (index >= LOG_MESSAGES.length) return;
      setLogs((prev) => [LOG_MESSAGES[index++], ...prev]);
    }, 600);
  };

  const stopLog = () => {
    if (logTimerRef.current) {
      clearInterval(logTimerRef.current);
      logTimerRef.current = null;
    }
  };

  const onStart = () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMetadata(null);
    setProgress(0);
    startMatrix();
    startLog();
  };

  const onDone = (data: StripitResult) => {
    stopLog();
    setResult(data);
    setMetadata(data.metadata || null);
    setIsProcessing(false);
    stopMatrix();
    setTimeout(() => setDownloadExpired(true), 10 * 60 * 1000);
  };

  const onError = (msg: string) => {
    stopLog();
    setError(msg);
    setIsProcessing(false);
    stopMatrix();
  };
  const upload = useUpload({
    socketRef,
    onProgress: setProgress,
    onStart,
    onDone,
    onError,
  });
  const urlStrip = useUrlStrip({ socketRef, onStart, onDone, onError });

  const handleFileRemove = () => {
    upload.setFile(null);
    setIsProcessing(false);
    setError(null);
    setResult(null);
    setMetadata(null);
  };

  const handleUrlPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) urlStrip.setUrl(text.trim());
    } catch {}
  };

  const checkBackendStatus = async () => {
    await runBackendCheck(setBackendStatus);
  };

  useEffect(() => {
    void runBackendCheck(setBackendStatus);
  }, []);

  return {
    activeTab,
    setActiveTab,
    progress,
    error,
    setError,
    result,
    isProcessing,
    logs,
    metadata,
    downloadExpired,
    backendStatus,
    checkBackendStatus,
    canvasRef,
    handleFileRemove,
    handleUrlPaste,
    ...upload,
    ...urlStrip,
  };
}

export { useStripit };
