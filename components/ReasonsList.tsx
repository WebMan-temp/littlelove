"use client";
import { REASONS } from "@/lib/constants";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ReasonsList() {
  const [revealed, setRevealed] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 50, top: 90 });
  const [startedRoam, setStartedRoam] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Heartwarming console message (open DevTools console to see)
  useEffect(() => {
    const title = "%c💖 Hey, you found the secret message!";
    const body =
      "%cYou don’t need reasons to be amazing — just being you is more than enough. \nYou are loved, appreciated, and truly special. 🌷";
    const hint1 = "%cHint: That sneaky button might be anywhere on the page…";
    const hint3 = "%cPS: Try tapping your name 10 times 😉";
    console.log(title, "color:#ff4b90;font-weight:800;font-size:16px");
    console.log(body, "color:#7f2649;font-size:14px");
    console.log(hint1, "color:#bd2a63;font-size:12px");
    console.log(hint3, "color:#7f2649;font-size:12px");
  }, []);

  const randomPosition = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnRect = btn.getBoundingClientRect();
    const padding = 16;
    const maxLeft = vw - btnRect.width - padding;
    const maxTop = vh - btnRect.height - padding;
    const left = padding + Math.random() * Math.max(1, maxLeft);
    const top = padding + Math.random() * Math.max(1, maxTop);
    setPos({
      left: (left / vw) * 100,
      top: (top / vh) * 100
    });
  }, []);

  // No initial fixed placement; we render the button inline under the heading until roaming starts.

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (revealed) return;
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 160) {
        if (!startedRoam) {
          setStartedRoam(true);
          // move to viewport roaming immediately
          randomPosition();
        } else {
          randomPosition();
        }
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [revealed, randomPosition, startedRoam]);

  const onTryClick = useCallback(() => {
    // If she somehow clicks, reveal the reasons
    setRevealed(true);
  }, []);

  return (
    <section id="reasons" className="relative z-10" ref={sectionRef as any}>
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-blush-700 text-center">
          Reasons You’re Amazing <span className="align-middle">💕</span>
        </h2>
        <p className="mt-3 text-center text-rose-700/80">Psst… it might be hiding. Some secrets reveal themselves to the curious 👀</p>

        {!revealed && !startedRoam && (
          <div className="mt-6 flex justify-center">
            <button
              ref={btnRef}
              onClick={onTryClick}
              className="btn btn-primary"
              onMouseEnter={() => {
                setStartedRoam(true);
                randomPosition();
              }}
              onFocus={() => {
                setStartedRoam(true);
                randomPosition();
              }}
            >
              Reveal the reasons 💝
            </button>
          </div>
        )}

        {!revealed ? null : null}
      </div>
      {!revealed && startedRoam && (
        <button
          ref={btnRef}
          onClick={onTryClick}
          className="btn btn-primary fixed z-40 shadow-soft"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: "translate(-50%, -50%)"
          }}
          onMouseEnter={randomPosition}
          onFocus={randomPosition}
        >
          Reveal the reasons 💝
        </button>
      )}
      {revealed && (
        <div
          className="fixed inset-0 z-[9999] bg-white/95 backdrop overflow-auto animate-fadeInUp"
          role="dialog"
          aria-modal="true"
          aria-label="Reasons you’re amazing"
        >
          <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-blush-700">
                Reasons You’re Amazing 💕
              </h3>
              <button className="btn btn-soft" onClick={() => setRevealed(false)}>
                Close
              </button>
            </div>
            <p className="mt-2 text-rose-900/80">
              You don’t actually need reasons to be amazing — just being you is enough. But here are a few anyway:
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REASONS.map((r, i) => (
                <li key={i} className="card p-5 hover:shadow-lg transition transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <p className="text-rose-900/90">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}


