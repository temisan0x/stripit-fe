import { useState } from "react";
import type { UploadOptions } from "@/types/stripit";
import { MAX_UPLOAD_SIZE_MB, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";

function useUpload({ socketRef, onProgress, onStart, onDone, onError }: UploadOptions) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async () => {
    if (!file) return onError("Please select a file first.");
    if (file.size > MAX_UPLOAD_SIZE_BYTES) return onError(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB}MB.`);
    onStart();

    const formData = new FormData();
    formData.append("image", file);
    if (socketRef.current?.id) {
      formData.append("socketId", socketRef.current.id);
    }

    try {
      const res = await fetch("/api/strip", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onDone(data);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return { file, setFile, isDragging, setIsDragging, uploadFile };
}

export default useUpload;