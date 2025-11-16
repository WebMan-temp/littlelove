"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { POP_WORDS } from "@/lib/constants";

type Balloon = {
  id: number;
  leftPct: number;
  durationMs: number;
  delayMs: number;
  sizePx?: number;
  text: string;
  color: "pink" | "red";
};

export default function PopHearts() {
  const [hearts, setHearts] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spawnHeart = useCallback(() => {
    idRef.current += 1;
    const size = 26 + Math.floor(Math.random() * 10);
    const word = POP_WORDS[Math.floor(Math.random() * POP_WORDS.length)];
    const h: Balloon = {
      id: idRef.current,
      leftPct: Math.random() * 90 + 5,
      durationMs: 4000 + Math.floor(Math.random() * 1200), // slightly slower
      delayMs: 0,
      sizePx: size,
      color: Math.random() > 0.5 ? "pink" : "red",
      text: word
    };
    setHearts((prev) => [...prev, h]);
    // auto-remove after it floats up
    setTimeout(() => {
      setHearts((prev) => prev.filter((x) => x.id !== h.id));
    }, h.durationMs + 50);
  }, []);

  useEffect(() => {
    if (!running) return;
    setHearts([]);
    setScore(0);
    setTimeLeft(30);
    const spawn = setInterval(spawnHeart, 280); // slower spawn
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    const stopAtEnd = setTimeout(() => setRunning(false), 30000);
    return () => {
      clearInterval(spawn);
      clearInterval(timer);
      clearTimeout(stopAtEnd);
    };
  }, [running, spawnHeart]);

  const onPop = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
    // Tiny burst
    const node = containerRef.current;
    if (!node) return;
    for (let i = 0; i < 6; i++) {
      const el = document.createElement("span");
      el.textContent = Math.random() > 0.5 ? "💖" : "✨";
      el.className = "absolute animate-sparkle";
      el.style.left = `${Math.random() * 100}%`;
      el.style.bottom = "30%";
      el.style.fontSize = `${10 + Math.random() * 12}px`;
      el.style.opacity = "0.9";
      node.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  };

  const status = useMemo(() => {
    if (running) return `Time: ${timeLeft}s`;
    if (timeLeft === 0) return `You popped ${score} hearts! 💘`;
    return "Ready?";
  }, [running, timeLeft, score]);

  return (
    <section id="pop-hearts" className="relative z-10">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-blush-700 text-center">
          Pop the Words <span className="align-middle">💘</span>
        </h2>
        <p className="mt-2 text-center text-rose-700/80">Tap the hearts before they float away</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white border border-pink-100 shadow-soft text-rose-900/90">
            Score: {score}
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-pink-100 shadow-soft text-rose-900/90">
            {status}
          </span>
          {!running && (
            <button className="btn btn-primary" onClick={() => setRunning(true)}>
              {timeLeft === 0 ? "Play again" : "Start"}
            </button>
          )}
        </div>
        <div
          ref={containerRef}
          className="relative mt-6 mx-auto h-64 sm:h-72 w-full max-w-3xl overflow-hidden rounded-2xl border border-pink-100 bg-white/70 shadow-soft"
        >
          {/* floating balloons */}
          {hearts.map((h) => (
            <button
              key={h.id}
              onClick={() => onPop(h.id)}
              className="absolute select-none"
              style={{
                left: `${h.leftPct}%`,
                bottom: `-10%`,
                transform: "translateX(-50%)",
                animation: `riseBottom ${h.durationMs}ms ease-out forwards`,
                fontSize: `${h.sizePx}px`
              }}
              aria-label="pop heart"
            >
              <span
                className={`inline-block rounded-full border shadow-soft px-3 py-1 ${
                  h.color === "red" ? "bg-red-50 border-red-100 text-red-500" : "bg-pink-50 border-pink-100 text-blush-700"
                }`}
              >
                {h.text}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes riseBottom {
          0% { bottom: -10%; opacity: 0.0; }
          10% { opacity: 1; }
          100% { bottom: 110%; opacity: 0.95; }
        }
      `}</style>
    </section>
  );
}


