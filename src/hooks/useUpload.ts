import { useState } from "react";
import type { UploadOptions } from "@/types/stripit";

function useUpload({ socketRef, onProgress, onDone, onError }: UploadOptions) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async () => {
    if (!file) return onError("Please select a file first.");

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
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("Something went wrong.");
      }
    }
  };

  return { file, setFile, isDragging, setIsDragging, uploadFile };
}

export default useUpload;
