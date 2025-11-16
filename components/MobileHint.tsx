"use client";
import { useEffect, useState } from "react";

export default function MobileHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isSmall =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    if (isSmall) setShow(true);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30">
      <div className="rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm text-rose-900/90 shadow-soft border border-pink-100 flex items-center gap-3">
        <span role="img" aria-label="hint">💡</span>
        For the best experience, please open this on a laptop.
        <button className="btn btn-soft px-3 py-1" onClick={() => setShow(false)}>
          Got it
        </button>
      </div>
    </div>
  );
}


