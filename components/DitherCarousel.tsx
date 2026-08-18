"use client";

import { useEffect, useRef } from "react";

export default function DitherCarousel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import("../gl/scene.js").then(({ createCarousel }) => {
      if (cancelled) return;
      dispose = createCarousel(canvasRef.current!);
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
