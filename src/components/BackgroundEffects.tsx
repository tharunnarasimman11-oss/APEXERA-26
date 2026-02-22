import { useEffect, useRef, useCallback, useState } from "react";

/* ── Lightning bolt generator ── */
const generateBolt = (
  x1: number, y1: number, x2: number, y2: number, segments: number
): { x: number; y: number }[] => {
  const points = [{ x: x1, y: y1 }];
  const dx = (x2 - x1) / segments;
  const dy = (y2 - y1) / segments;
  for (let i = 1; i < segments; i++) {
    const jitter = (Math.random() - 0.5) * 80;
    points.push({ x: x1 + dx * i + jitter, y: y1 + dy * i + (Math.random() - 0.5) * 30 });
  }
  points.push({ x: x2, y: y2 });
  return points;
};

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [, forceRender] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Floating energy particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      hue: Math.random() > 0.5 ? 270 : 220,
    }));

    // Lightning state
    let bolts: { points: { x: number; y: number }[]; life: number; maxLife: number; alpha: number; width: number }[] = [];
    let nextBolt = performance.now() + 2000 + Math.random() * 3000;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // ── Particles ──
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(now * 0.001 + p.x * 0.01) * 0.15;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Mouse proximity glow boost
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = Math.max(0, 1 - dist / 200) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 2, 0, Math.PI * 2);
        const op = Math.min(1, p.opacity + boost);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${op})`;
        ctx.shadowBlur = 15 + boost * 20;
        ctx.shadowColor = `hsla(${p.hue}, 70%, 65%, ${op * 0.5})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // ── Lightning bolts ──
      if (now > nextBolt) {
        const startX = Math.random() * w;
        const isBranched = Math.random() > 0.5;
        bolts.push({
          points: generateBolt(startX, -20, startX + (Math.random() - 0.5) * 200, h * (0.4 + Math.random() * 0.4), 12),
          life: 0,
          maxLife: 300 + Math.random() * 200,
          alpha: 0.15 + Math.random() * 0.2,
          width: 1 + Math.random() * 1.5,
        });
        if (isBranched) {
          const branchStart = Math.random() * w;
          bolts.push({
            points: generateBolt(branchStart, -20, branchStart + (Math.random() - 0.5) * 150, h * 0.3, 8),
            life: 0,
            maxLife: 200,
            alpha: 0.1 + Math.random() * 0.1,
            width: 0.5 + Math.random(),
          });
        }
        nextBolt = now + 3000 + Math.random() * 5000;
      }

      bolts = bolts.filter((b) => b.life < b.maxLife);
      for (const bolt of bolts) {
        bolt.life += 16;
        const progress = bolt.life / bolt.maxLife;
        // Flash bright then fade
        const flashAlpha = progress < 0.1
          ? bolt.alpha * (progress / 0.1)
          : bolt.alpha * (1 - (progress - 0.1) / 0.9);

        if (flashAlpha <= 0) continue;

        // Core bolt
        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let i = 1; i < bolt.points.length; i++) {
          ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
        }
        ctx.strokeStyle = `hsla(270, 80%, 75%, ${flashAlpha})`;
        ctx.lineWidth = bolt.width;
        ctx.shadowBlur = 25;
        ctx.shadowColor = `hsla(270, 80%, 60%, ${flashAlpha * 0.8})`;
        ctx.stroke();

        // Outer glow
        ctx.strokeStyle = `hsla(260, 60%, 55%, ${flashAlpha * 0.3})`;
        ctx.lineWidth = bolt.width + 4;
        ctx.shadowBlur = 40;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── Mouse reactive glow ──
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        grad.addColorStop(0, "hsla(270, 60%, 55%, 0.06)");
        grad.addColorStop(0.5, "hsla(260, 50%, 45%, 0.02)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(mx - 180, my - 180, 360, 360);
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Deep dark base with electric tinted radials */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse 130% 60% at 25% 0%, hsla(270, 50%, 18%, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 100% 50% at 80% 100%, hsla(260, 40%, 14%, 0.6) 0%, transparent 55%),
            radial-gradient(ellipse 80% 80% at 50% 50%, hsla(255, 30%, 8%, 1) 0%, hsla(250, 35%, 4%, 1) 100%)
          `,
        }}
      />

      {/* Animated electric energy waves */}
      <div className="fixed inset-0 -z-25 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full"
          style={{
            height: "2px",
            top: "25%",
            background: "linear-gradient(90deg, transparent 0%, hsla(270, 70%, 55%, 0.15) 30%, hsla(260, 60%, 65%, 0.25) 50%, hsla(270, 70%, 55%, 0.15) 70%, transparent 100%)",
            boxShadow: "0 0 20px 4px hsla(270, 70%, 55%, 0.1)",
            animation: "electricWave 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-full"
          style={{
            height: "1px",
            top: "55%",
            background: "linear-gradient(90deg, transparent 0%, hsla(260, 60%, 50%, 0.1) 20%, hsla(270, 70%, 60%, 0.2) 50%, hsla(260, 60%, 50%, 0.1) 80%, transparent 100%)",
            boxShadow: "0 0 15px 3px hsla(270, 60%, 50%, 0.08)",
            animation: "electricWave 8s ease-in-out 2s infinite",
          }}
        />
        <div
          className="absolute w-full"
          style={{
            height: "1px",
            top: "78%",
            background: "linear-gradient(90deg, transparent 0%, hsla(270, 50%, 55%, 0.08) 30%, hsla(265, 60%, 60%, 0.15) 50%, hsla(270, 50%, 55%, 0.08) 70%, transparent 100%)",
            boxShadow: "0 0 12px 2px hsla(270, 50%, 55%, 0.06)",
            animation: "electricWave 10s ease-in-out 4s infinite",
          }}
        />
      </div>

      {/* Ambient pulsing orbs */}
      <div className="fixed inset-0 -z-22 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            top: "-8%",
            left: "-5%",
            background: "radial-gradient(circle, hsla(270, 60%, 40%, 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "orbPulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            bottom: "5%",
            right: "-3%",
            background: "radial-gradient(circle, hsla(260, 50%, 45%, 0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "orbPulse 10s ease-in-out 3s infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: "45%",
            left: "40%",
            background: "radial-gradient(circle, hsla(265, 55%, 50%, 0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "orbPulse 12s ease-in-out 1s infinite",
          }}
        />
      </div>

      {/* Lightning & particles canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{ opacity: 0.85 }}
      />

      {/* Subtle tech grid */}
      <div
        className="fixed inset-0 -z-15 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(hsla(270, 50%, 60%, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, hsla(270, 50%, 60%, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Film grain */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Dramatic vignette */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 35%, hsla(255, 35%, 4%, 0.65) 100%)",
        }}
      />
    </>
  );
};

export default BackgroundEffects;
