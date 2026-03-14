import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&STRIPITMETADATA";

function useMatrix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [matrixActive, setMatrixActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.toggle("active", matrixActive);

    if (!matrixActive) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let drops: number[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.floor(canvas.width / 16)).fill(1);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(245,244,240,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "13px IBM Plex Mono, monospace";
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
      frameRef.current = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [matrixActive]);

  const startMatrix = () => setMatrixActive(true);
  const stopMatrix = () => setMatrixActive(false);

  return { canvasRef, matrixActive, startMatrix, stopMatrix };
}

export { useMatrix };