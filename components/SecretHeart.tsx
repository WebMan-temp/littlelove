"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SecretHeart() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-secret", onOpen as EventListener);
    return () => window.removeEventListener("open-secret", onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (open) {
      // Ask background music controller to start
      window.dispatchEvent(new CustomEvent("play-music"));
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="A beautiful secret"
        >
          <div
            className="card max-w-3xl w-[92vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] bg-white">
              {/* Replace this with your very special image */}
              <Image
                src="/friend/special.jpeg"
                alt="A beautiful memory"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-rose-900/90">For your eyes only ✨</p>
              <button className="btn btn-soft" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


