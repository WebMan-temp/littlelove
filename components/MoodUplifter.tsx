"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { COMPLIMENTS, VIRTUAL_HUGS, HUG_PHOTOS } from "@/lib/constants";
import Image from "next/image";

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function MoodUplifter() {
  const [message, setMessage] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const burstRef = useRef<HTMLDivElement | null>(null);
  const [hugPhoto, setHugPhoto] = useState<string | null>(null);

  const buttons = useMemo(
    () => [
      { label: "Press for a compliment 💌", type: "compliment" as const },
      { label: "Press for a virtual hug 🤗", type: "hug" as const }
    ],
    []
  );

  const burst = useCallback(() => {
    const host = burstRef.current!;
    const count = 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = Math.random() > 0.5 ? "💖" : "✨";
      el.className = "absolute animate-sparkle";
      el.style.left = `${50 + (Math.random() * 40 - 20)}%`;
      el.style.top = `${50 + (Math.random() * 10 - 5)}%`;
      el.style.fontSize = `${12 + Math.random() * 16}px`;
      el.style.opacity = `${0.7 + Math.random() * 0.3}`;
      el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 45}deg)`;
      host.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    }
  }, []);

  const handleClick = useCallback((kind: "compliment" | "hug") => {
    let m = "";
    if (kind === "compliment") {
      m = randomOf(COMPLIMENTS);
      setHugPhoto(null);
    }
    if (kind === "hug") {
      m = randomOf(VIRTUAL_HUGS);
      setHugPhoto(randomOf(HUG_PHOTOS)); // pick a random hug photo to show
    }
    setMessage(m);
    setKey((k) => k + 1);
    burst();
  }, [burst]);

  return (
    <section id="uplifter" className="relative z-10">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-blush-700 text-center">
          Mood Uplifter <span className="align-middle">🫶</span>
        </h2>
        <p className="mt-3 text-center text-rose-700/80">
          A tiny space for instant smiles
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {buttons.map((b) => (
            <button
              key={b.type}
              className="btn btn-primary shadow-soft"
              onClick={() => handleClick(b.type)}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8 min-h-[96px]">
          <div ref={burstRef} className="absolute inset-0 pointer-events-none" aria-hidden />
          {message && (
            <div
              key={key}
              className="mx-auto max-w-2xl text-center card p-6 animate-fadeInUp"
            >
              <p className="text-lg text-rose-900/90">{message}</p>
              {hugPhoto && (
                <div className="relative mt-4 w-full aspect-[4/3] overflow-hidden rounded-xl border border-pink-100">
                  <Image
                    src={hugPhoto}
                    alt="A comforting hug"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


