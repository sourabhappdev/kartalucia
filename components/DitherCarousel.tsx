"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface DitherCarouselHandle {
  setProgress: (value: number) => void;
}

const DitherCarousel = forwardRef<DitherCarouselHandle>(function DitherCarousel(
  _props,
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    setExternalProgress: (v: number) => void;
    dispose: () => void;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("../gl/scene.js").then(({ createCarousel }) => {
      if (cancelled || !canvasRef.current) return;
      sceneRef.current = createCarousel(canvasRef.current);
    });

    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(value: number) {
        sceneRef.current?.setExternalProgress(value);
      },
    }),
    []
  );

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
});

export default DitherCarousel;
