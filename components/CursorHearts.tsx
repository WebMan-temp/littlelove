"use client";
import { useEffect, useRef } from "react";

export default function CursorHearts() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentEmojiRef = useRef<string>("💖"); // default pink

  useEffect(() => {
    const container = containerRef.current!;
    let last = 0;
    const handle = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 60) return; // limit spawn rate
      last = now;
      const heart = document.createElement("span");
      heart.textContent = currentEmojiRef.current;
      heart.className = "pointer-events-none select-none absolute animate-sparkle";
      heart.style.left = `${e.clientX - 8}px`;
      heart.style.top = `${e.clientY - 8}px`;
      heart.style.fontSize = "16px";
      heart.style.opacity = "0.9";
      container.appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 1200);
    };
    const onCursorHearts = (evt: Event) => {
      try {
        const detail = (evt as CustomEvent<{ color?: string }>).detail;
        if (detail?.color === "red") {
          currentEmojiRef.current = "❤️";
        } else {
          currentEmojiRef.current = "💖";
        }
      } catch {
        currentEmojiRef.current = "💖";
      }
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("cursor-hearts", onCursorHearts as EventListener);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none" aria-hidden />;
}


