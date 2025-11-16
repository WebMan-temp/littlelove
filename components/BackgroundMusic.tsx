"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/friend/bg.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    setReady(true);

    // Try to autoplay after a tick; if blocked, wait for first user gesture
    const tryAuto = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        const unlock = async () => {
          try {
            await audio.play();
            setPlaying(true);
          } catch {
            // still blocked; keep button available
          } finally {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
          }
        };
        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
      }
    };
    // Give the page a moment to settle before attempting
    const t = setTimeout(tryAuto, 300);

    const onPlayMusic = () => {
      // external trigger (e.g., secret heart)
      playMusic();
    };
    window.addEventListener("play-music", onPlayMusic as EventListener);
    return () => {
      window.removeEventListener("play-music", onPlayMusic as EventListener);
      clearTimeout(t);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  async function playMusic() {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      // user gesture required
    }
  }

  function pauseMusic() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <button
        className="btn btn-soft shadow-soft px-4 py-2"
        onClick={() => (playing ? pauseMusic() : playMusic())}
        disabled={!ready}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? "⏸️ Pause music" : "▶️ Play music"}
      </button>
    </div>
  );
}


