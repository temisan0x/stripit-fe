"use client";

import type { RefObject } from "react";

type MatrixCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null> ;
};

function MatrixCanvas({ canvasRef }: MatrixCanvasProps) {
  return <canvas id="matrixCanvas" ref={canvasRef} />;
}

export { MatrixCanvas };
