"use client";

import { useEffect, useRef, useState } from "react";

const WINDOW_MS = 2000;
const UPDATE_MS = 1000;
const GAP_MS = 250;

export default function FpsMeter() {
  const [fps, setFps] = useState<number | null>(null);
  const frames = useRef<number[]>([]);
  const lastPublish = useRef(0);

  useEffect(() => {
    let raf = 0;
    let previous = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const delta = now - previous;
      previous = now;
      const list = frames.current;

      if (delta > GAP_MS) {
        list.length = 0;
        lastPublish.current = now;
        return;
      }

      list.push(now);
      while (list.length > 0 && now - list[0] > WINDOW_MS) {
        list.shift();
      }

      if (now - lastPublish.current >= UPDATE_MS && list.length > 1) {
        const span = now - list[0];
        lastPublish.current = now;
        setFps(span > 0 ? ((list.length - 1) * 1000) / span : 0);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <p className="whitespace-nowrap text-center text-xs text-black/60 tabular-nums mb-6">
      {fps === null ? "  " : `${Math.round(fps)} fps`}
    </p>
  );
}
