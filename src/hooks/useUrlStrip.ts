import { useState } from "react";
import type { UrlStripOptions } from "@/types/stripit";


function useUrlStrip({ socketRef, onStart, onDone, onError }: UrlStripOptions) {
  const [url, setUrl] = useState("");

  const stripFromUrl = async () => {
    const trimmed = url.trim();
    if (!trimmed) return onError("Please paste a URL first.");
    onStart(); // ← add this
    try {
      const res = await fetch("/api/strip",{
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