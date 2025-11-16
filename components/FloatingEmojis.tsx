"use client";
import { useMemo } from "react";

type FloatingEmoji = {
  emoji: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
  topOffset: string;
};

export default function FloatingEmojis() {
  const emojis = useMemo<FloatingEmoji[]>(
    () => [
      { emoji: "💖", left: "10%", duration: "8s", delay: "0s", size: "text-3xl", topOffset: "10%" },
      { emoji: "✨", left: "30%", duration: "10s", delay: "1s", size: "text-2xl", topOffset: "25%" },
      { emoji: "🌸", left: "55%", duration: "9s", delay: "0.5s", size: "text-4xl", topOffset: "15%" },
      { emoji: "⭐", left: "75%", duration: "11s", delay: "0s", size: "text-2xl", topOffset: "20%" },
      { emoji: "💫", left: "85%", duration: "12s", delay: "1.2s", size: "text-3xl", topOffset: "12%" }
    ],
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {emojis.map((e, idx) => (
        <span
          key={idx}
          className={`absolute ${e.size} opacity-30 animate-floaty`}
          style={{
            left: e.left,
            top: e.topOffset,
            animationDuration: e.duration,
            animationDelay: e.delay
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}


