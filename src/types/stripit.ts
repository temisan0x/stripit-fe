import type React from "react";

export type MetadataPayload = {
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  stripped?: boolean;
};

export type StripitResult = {
  filename: string;
  url: string;
  metadata?: MetadataPayload;
};

export type TabKey = "url" | "upload";

export type UploadOptions = {
  socketRef: React.RefObject<{ id?: string } | null>;
  onProgress: (n: number) => void;
  onStart: () => void;
  onDone: (result: StripitResult) => void;
  onError: (msg: string) => void;
};

export type UrlStripOptions = {
  socketRef: React.RefObject<{ id?: string } | null>;
  onStart: () => void;
  onDone: (result: StripitResult) => void;
  onError: (msg: string) => void;
};
