"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ScratchCard({ src, alt, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    // Soft pastel cover to scratch off
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#ffe4ef");
    gradient.addColorStop(1, "#b3e5ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    // Add hint text
    ctx.font = "bold 18px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillStyle = "rgba(63, 24, 55, 0.6)";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal ✨", rect.width / 2, rect.height / 2);
  }, []);

  const draw = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 28;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    ctx.lineTo(clientX - rect.left + 0.01, clientY - rect.top + 0.01);
    ctx.stroke();
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    draw(e.clientX, e.clientY);
  }, [draw]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    draw(e.clientX, e.clientY);
  }, [isDrawing, draw]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    (e.currentTarget as HTMLCanvasElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}


