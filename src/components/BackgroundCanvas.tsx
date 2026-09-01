import { useEffect, useRef } from "react";
import { useSite } from "@/lib/site-context";

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Sitewide ambient background: a soft blue glow plus drifting dots that react
 * to pointer movement (mouse hover on desktop, swipe on touch devices).
 */
export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useSite();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.round((width * height) / 16000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const isDark = theme === "dark";
    const dotColor = isDark ? "255, 255, 255" : "30, 41, 59";
    const linkColor = isDark ? "125, 185, 255" : "37, 99, 235";

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0.01) {
          const push = (130 - dist) / 130;
          dot.vx += (dx / dist) * push * 0.35;
          dot.vy += (dy / dist) * push * 0.35;
        }

        dot.vx *= 0.97;
        dot.vy *= 0.97;
        const speed = Math.hypot(dot.vx, dot.vy);
        if (speed < 0.05) {
          dot.vx += (Math.random() - 0.5) * 0.05;
          dot.vy += (Math.random() - 0.5) * 0.05;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        const near = Math.hypot(dot.x - pointer.x, dot.y - pointer.y) < 160;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${near ? linkColor : dotColor}, ${near ? 0.75 : isDark ? 0.5 : 0.35})`;
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${linkColor}, ${(1 - d / 110) * (isDark ? 0.14 : 0.1)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
      }
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    render();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-14rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
