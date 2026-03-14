import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

function useSocket(onProgress: (percent: number) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("progress", onProgress);

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}

export { useSocket };