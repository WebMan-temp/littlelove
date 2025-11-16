"use client";
import Image from "next/image";
import { useState } from "react";
import type { Memory } from "@/lib/constants";
import ScratchCard from "./ScratchCard";

type Props = {
  memories: Memory[];
};

export default function MemoriesGallery({ memories }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? memories[activeIndex] : null;

  return (
    <section id="memories" className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-blush-700 text-center">
          Memories <span className="align-middle">🌟</span>
        </h2>
        <p className="mt-3 text-center text-rose-700/80">
          Some of my favorite moments with you 🥺💕.. Have a lot though
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((m, idx) => (
            <button
              key={idx}
              className="card overflow-hidden group text-left"
              onClick={() => setActiveIndex(idx)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Scratch to reveal the photo */}
                <ScratchCard src={m.src} alt={m.caption} />
                {/* Centered caption overlay until opened */}
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <p className="px-4 py-2 rounded-full bg-white/80 border border-pink-100 text-rose-900/90 text-sm shadow-soft">
                    {m.caption}
                  </p>
                </div>
              </div>
              {/* Removed bottom caption to keep centered overlay clean */}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div
            className="card max-w-3xl w-[92vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-4 text-center">
              <h3 className="text-xl font-semibold text-blush-700">
                Memories <span className="align-middle">🌟</span>
              </h3>
              <p className="text-sm text-rose-700/70 mt-1">
                Some of my favorite moments with you 🥺💕
              </p>
            </div>
            <div className="relative w-full aspect-[4/3] bg-white">
              <Image
                src={active.src}
                alt={active.caption}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-rose-900/90">{active.caption}</p>
              <button
                className="btn btn-soft"
                onClick={() => setActiveIndex(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


