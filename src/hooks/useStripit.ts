"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE, buildApiUrl, withApiKeyHeaders } from "../lib/api";

type MetadataPayload = {
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
};

type StripitResult = {
  filename: string;
  url: string;
  metadata?: MetadataPayload;
};

type TabKey = "url" | "upload";

declare global {
  interface Window {
    io?: (url?: string) => {
      on: (event: string, handler: (data: any) => void) => void;
      id?: string;
    };
  }
}

const LOG_MESSAGES = [
  "> Scanning file headers...",
  "> Reading EXIF data...",
  "> Detecting GPS coordinates...",
  "> Found device metadata...",
  "> Stripping location tags...",
  "> Removing timestamp data...",
  "> Clearing device fingerprint...",
  "> Sanitizing file headers...",
  "> Uploading clean file...",
  "> Verifying integrity...",
];

function useStripit() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logTimerRef = useRef<number | null>(null);
  const matrixFrameRef = useRef<number | null>(null);
  const socketPollRef = useRef<number | null>(null);
  const socketIdRef = useRef<string | undefined>(undefined);

  const [activeTab, setActiveTab] = useState<TabKey>("url");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StripitResult | null>(null);
  const [metadata, setMetadata] = useState<MetadataPayload | null>(null);
  const [downloadExpired, setDownloadExpired] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  const resetUI = () => {
    setError(null);
    setProgress(0);
    setLogs([]);
    setResult(null);
    setMetadata(null);
    setDownloadExpired(false);
  };

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

  const startMatrix = () => setMatrixActive(true);
  const stopMatrix = () => setMatrixActive(false);

  const startExpiryTimer = () => {
    setDownloadExpired(false);
    setTimeout(() => setDownloadExpired(true), 10 * 60 * 1000);
  };

  const initSocket = () => {
    if (typeof window.io !== "function") return;
    const socket = window.io(API_BASE || undefined);
    socket.on("connect", () => {
      socketIdRef.current = socket.id;
    });
    socket.on("progress", (percent: number) => {
      setProgress(Math.round(percent || 0));
    });
  };

  useEffect(() => {
    socketPollRef.current = window.setInterval(() => {
      if (typeof window.io === "function") {
        initSocket();
        if (socketPollRef.current) clearInterval(socketPollRef.current);
      }
    }, 300);

    return () => {
      if (socketPollRef.current) clearInterval(socketPollRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !matrixActive) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&STRIPITMETADATA";
    let drops: number[] = [];

    const initMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 16);
      drops = Array(cols).fill(1);
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(245,244,240,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "13px IBM Plex Mono, monospace";
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
      matrixFrameRef.current = requestAnimationFrame(drawMatrix);
    };

    initMatrix();
    drawMatrix();

    const handleResize = () => initMatrix();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (matrixFrameRef.current) cancelAnimationFrame(matrixFrameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [matrixActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.toggle("active", matrixActive);
  }, [matrixActive]);

  const handleFileRemove = () => {
    setFile(null);
    setIsProcessing(false);
    setMatrixActive(false);
    setLogs([]);
    setProgress(0);
    setError(null);
    setResult(null);
    setMetadata(null);
  };

  const uploadFile = async () => {
    if (!file) return setError("Please select a file first.");
    if (!socketIdRef.current) return setError("Socket not connected. Try again.");

    resetUI();
    setIsProcessing(true);
    startMatrix();
    startLog();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("socketId", socketIdRef.current);

    const warningTimer = window.setTimeout(() => {
      setLogs((prev) => ["> Large file — still processing...", ...prev]);
    }, 30000);

    try {
      const response = await fetch(buildApiUrl("/uploads"), {
        method: "POST",
        body: formData,
        headers: withApiKeyHeaders(),
      });
      const data = await response.json();
      clearTimeout(warningTimer);
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setProgress(100);
      stopMatrix();
      stopLog();
      setResult(data);
      setMetadata(data.metadata || null);
      setIsProcessing(false);
      startExpiryTimer();
    } catch (err: any) {
      clearTimeout(warningTimer);
      stopMatrix();
      stopLog();
      setIsProcessing(false);
      setError(err?.message || "Something went wrong.");
    }
  };

  const stripFromUrl = async () => {
    const trimmed = url.trim();
    if (!trimmed) return setError("Please paste a URL first.");
    if (!socketIdRef.current) return setError("Socket not connected. Try again.");

    resetUI();
    setIsProcessing(true);
    startMatrix();
    startLog();

    try {
      const response = await fetch(buildApiUrl("/strip-url"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...withApiKeyHeaders(),
        },
        body: JSON.stringify({ url: trimmed, socketId: socketIdRef.current }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to strip URL");

      setProgress(100);
      stopMatrix();
      stopLog();
      setResult(data);
      setMetadata(data.metadata || null);
      setIsProcessing(false);
      startExpiryTimer();
    } catch (err: any) {
      stopMatrix();
      stopLog();
      setIsProcessing(false);
      setError(err?.message || "Something went wrong.");
    }
  };

  // const handleUrlPaste = async () => {
  //   try {
  //     const text = await navigator.clipboard.readText();
  //     if (!text) return;
  //     setUrl(text.trim());
  //   } catch {
  //     setError("Clipboard access denied. Paste with Ctrl+V.");
  //   }
  // };

  return {
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
    // handleUrlPaste,
    resetUI,
    startMatrix,
    stopMatrix,
  };
}

export { useStripit };
