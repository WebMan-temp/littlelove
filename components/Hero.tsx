"use client";
import { HER_NAME, HERO_MESSAGE, HERO_ICON_MESSAGES, HERO_ICON_TITLES, HERO_ICON_SUBTEXT } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [modalKind, setModalKind] = useState<"mail" | "sparkle" | "flower" | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onNameTap = () => {
    setTapCount((c) => {
      const next = c + 1;
      // reset counter after 3 seconds of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTapCount(0), 3000);
      if (next >= 10) {
        // Dispatch event to open secret modal and play music
        window.dispatchEvent(new CustomEvent("open-secret"));
        return 0;
      }
      return next;
    });
  };

  // Lock page scroll when the hero modal is open
  useEffect(() => {
    if (modalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modalOpen]);

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center sm:pt-24">
        <div className="inline-block rounded-full bg-pink-50 px-4 py-1 text-sm text-blush-700 border border-pink-100">
          A cozy little corner on the internet
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-blush-700">
          Hi{" "}
          <span className="inline-flex items-center gap-2 group">
            <button
              onClick={onNameTap}
              onMouseEnter={() => {
                window.dispatchEvent(new CustomEvent("cursor-hearts", { detail: { color: "red" } }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent("cursor-hearts", { detail: { color: "default" } }));
              }}
              className="focus:outline-none hover:text-blush-600"
              aria-label="tap name"
              title="tap me"
            >
              {HER_NAME}
            </button>
            <span aria-hidden className="transition-colors text-blush-700 group-hover:text-red-500">
              💖
            </span>
          </span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-rose-700/80">
          {HERO_MESSAGE}
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blush-100 text-4xl animate-popIn shadow-soft hover:scale-105 transition"
            onClick={() => {
              setModalText(HERO_ICON_MESSAGES.mail);
              setModalKind("mail");
              setModalOpen(true);
            }}
            aria-label="open message"
          >
            💌
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky text-4xl animate-popIn shadow-soft delay-100 hover:scale-105 transition"
            onClick={() => {
              setModalText(HERO_ICON_MESSAGES.sparkle);
              setModalKind("sparkle");
              setModalOpen(true);
            }}
            aria-label="open message"
          >
            ✨
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-4xl animate-popIn shadow-soft delay-200 hover:scale-105 transition"
            onClick={() => {
              setModalText(HERO_ICON_MESSAGES.flower);
              setModalKind("flower");
              setModalOpen(true);
            }}
            aria-label="open message"
          >
            🌸
          </button>
        </div>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 sm:pt-28 bg-black/50 backdrop backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Sweet message"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="card max-w-md w-[92vw] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {modalKind && (
              <>
                <h3 className="text-xl font-semibold text-blush-700 text-center">
                  {HERO_ICON_TITLES[modalKind]}
                </h3>
                <p className="mt-1 text-sm text-rose-700/70 text-center">
                  {HERO_ICON_SUBTEXT[modalKind]}
                </p>
              </>
            )}
            <p className="mt-4 text-rose-900/90 text-lg text-center">{modalText}</p>
            <div className="mt-6 flex justify-center">
              <button className="btn btn-soft" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


