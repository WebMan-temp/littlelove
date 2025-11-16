"use client";
import { THIS_OR_THAT } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

type Answer = "a" | "b" | null;

export default function ThisOrThat() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [complete, setComplete] = useState(false);
  const burstRef = useRef<HTMLDivElement | null>(null);

  // Load saved answers on client only to avoid SSR localStorage errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("this-or-that");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setAnswers(parsed);
            if (parsed.length >= THIS_OR_THAT.length) {
              setComplete(true);
            } else {
              setStep(parsed.length);
            }
          }
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Persist answers on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("this-or-that", JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (answers.length >= THIS_OR_THAT.length) setComplete(true);
  }, [answers.length]);

  const current = THIS_OR_THAT[step];

  function doBurst(emojiA: string, emojiB: string) {
    const host = burstRoom();
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      s.textContent = Math.random() > 0.5 ? emojiA : emojiB;
      s.className = "absolute animate-sparkle";
      s.style.left = `${50 + (Math.random() * 60 - 30)}%`;
      s.style.top = `${40 + (Math.random() * 20 - 10)}%`;
      s.style.fontSize = `${12 + Math.random() * 18}px`;
      s.style.opacity = `${0.7 + Math.random() * 0.3}`;
      s.style.transform = `translate(-50%, -50%)`;
      host.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  function burstRoom() {
    if (!burstRef.current) return document.body;
    return burstRef.current;
  }

  function choose(ans: "a" | "b") {
    if (!current) return;
    doBurst(current.a.emoji || "💖", current.b.emoji || "✨");
    const next = [...answers];
    next[step] = ans;
    setAnswers(next);
    if (step + 1 < THIS_OR_THAT.length) {
      setTimeout(() => setStep(step + 1), 220);
    } else {
      setComplete(true);
    }
  }

  function reset() {
    setStep(0);
    setComplete(false);
    setAnswers([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("this-or-that");
    }
  }

  function buildSummary(): string {
    const lines: string[] = [];
    THIS_OR_THAT.forEach((q, i) => {
      const a = answers[i];
      const picked =
        a === "a"
          ? `${q.a.emoji ? q.a.emoji + " " : ""}${q.a.label}`
          : `${q.b.emoji ? q.b.emoji + " " : ""}${q.b.label}`;
      lines.push(`- ${q.question} → ${picked}`);
    });
    return `This or That — her picks:\n` + lines.join("\n");
  }

  async function copyAnswers() {
    const text = buildSummary();
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied! Now paste it in WhatsApp and send it to me 💖");
    } catch {
      alert("Could not copy automatically. You can paste from the results shown.");
      console.log(text);
    }
  }

  function openWhatsApp() {
    const text = encodeURIComponent(buildSummary());
    // Opens WhatsApp share (web/mobile). You can replace with your phone number after wa.me/<number>?text=
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-blush-700 text-center">
          This or That <span className="align-middle">💞</span>
        </h2>
        {!complete ? (
          <div className="mt-8 card p-6">
            <div ref={burstRef} className="relative">
              <p className="text-center text-rose-900/90 mb-6">
                {current.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className="btn btn-soft w-full text-lg py-4 hover:scale-[1.02] transition"
                  onClick={() => choose("a")}
                >
                  {current.a.emoji ? <span className="mr-2">{current.a.emoji}</span> : null}
                  {current.a.label}
                </button>
                <button
                  className="btn btn-primary w-full text-lg py-4 hover:scale-[1.02] transition"
                  onClick={() => choose("b")}
                >
                  {current.b.emoji ? <span className="mr-2">{current.b.emoji}</span> : null}
                  {current.b.label}
                </button>
              </div>
              <div className="mt-6 text-center text-rose-700/70 text-sm">
                Question {step + 1} / {THIS_OR_THAT.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-2xl font-semibold text-blush-700">All done! 💖</p>
            <p className="mt-2 text-rose-900/80">
              Loved your answers — could you copy them and send me on WhatsApp? Then we’ll pick a day. ✨
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="btn btn-soft" onClick={reset}>Try again</button>
              <button className="btn btn-soft" onClick={copyAnswers}>
                Copy answers 📋
              </button>
              <button className="btn btn-soft" onClick={openWhatsApp}>
                Open WhatsApp 💬
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


