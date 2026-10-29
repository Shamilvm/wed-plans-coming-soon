"use client";

import { useEffect, useRef } from "react";

type Particle = {
  kind: "petal" | "spark";
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  spin: number;
  angle: number;
  alpha: number;
  color: string;
};

const PETAL_COLORS = ["#e8aeb7", "#f8d7da", "#f2c1c8"];

function spawn(width: number, height: number, anywhere: boolean): Particle {
  const petal = Math.random() < 0.55;
  return {
    kind: petal ? "petal" : "spark",
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -20,
    size: petal ? 5 + Math.random() * 7 : 0.8 + Math.random() * 1.6,
    speed: petal ? 0.35 + Math.random() * 0.6 : 0.15 + Math.random() * 0.35,
    sway: petal ? 0.6 + Math.random() * 1.2 : 0.2 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.03,
    angle: Math.random() * Math.PI * 2,
    alpha: petal ? 0.2 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  };
}

export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (width * height) / 16000));
      particles = Array.from({ length: count }, () => spawn(width, height, true));
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed;
        p.x += Math.sin(t * 0.01 + p.phase) * p.sway * 0.5;
        p.angle += p.spin;

        if (p.y > height + 20 || p.x < -40 || p.x > width + 40) {
          particles[i] = spawn(width, height, false);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.kind === "petal") {
          ctx.rotate(p.angle);
          ctx.scale(1, 0.55 + Math.abs(Math.sin(t * 0.02 + p.phase)) * 0.45);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size, 0, 0, -p.size);
          ctx.fill();
        } else {
          ctx.globalAlpha = p.alpha * (0.5 + Math.sin(t * 0.05 + p.phase) * 0.5);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
