import { useEffect, useState } from "react";
import type { UrlStripOptions } from "@/types/stripit";
import { isXTwitterUrl } from "@/lib/url";

const LAST_URL_STORAGE_KEY = "stripit:last-url";

function useUrlStrip({ socketRef, onStart, onDone, onError }: UrlStripOptions) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const savedUrl = window.localStorage.getItem(LAST_URL_STORAGE_KEY);
    if (savedUrl) setUrl(savedUrl);
  }, []);

  useEffect(() => {
    if (url.trim()) {
      window.localStorage.setItem(LAST_URL_STORAGE_KEY, url);
    } else {
      window.localStorage.removeItem(LAST_URL_STORAGE_KEY);
    }
  }, [url]);

  const stripFromUrl = async () => {
    const trimmed = url.trim();
    if (!trimmed) return onError("Please paste a URL first.");
    if (!isXTwitterUrl(trimmed)) {
      return onError("Only X / Twitter links are supported right now.");
    }

    onStart();
    try {
      const res = await fetch("/api/strip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmed,
          socketId: socketRef.current?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      onDone(data);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return { url, setUrl, stripFromUrl };
}

export default useUrlStrip;
