import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 35;

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Particles: tiny luminous dots drifting upward
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.6 ? 42 : 270,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const sat = p.hue === 42 ? "80%" : "60%";
        const lum = p.hue === 42 ? "60%" : "55%";
        ctx.fillStyle = `hsla(${p.hue}, ${sat}, ${lum}, ${p.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, ${sat}, ${lum}, ${p.opacity * 0.6})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Deep layered gradient base */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% 10%, hsla(270, 55%, 22%, 0.7) 0%, transparent 60%),
            radial-gradient(ellipse 100% 70% at 80% 90%, hsla(42, 70%, 30%, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 90% 90% at 50% 50%, hsla(260, 30%, 10%, 1) 0%, hsla(250, 35%, 6%, 1) 100%)
          `,
        }}
      />

      {/* Slow-moving aurora-like light streaks */}
      <div className="fixed inset-0 -z-25 overflow-hidden pointer-events-none">
        {/* Primary purple aurora */}
        <div
          className="absolute"
          style={{
            width: "140%",
            height: "50%",
            top: "-15%",
            left: "-20%",
            background:
              "linear-gradient(135deg, hsla(270, 60%, 35%, 0.18) 0%, hsla(280, 50%, 45%, 0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
            animation: "auroraShift1 30s ease-in-out infinite alternate",
            borderRadius: "50%",
          }}
        />
        {/* Gold light streak */}
        <div
          className="absolute"
          style={{
            width: "120%",
            height: "40%",
            bottom: "-10%",
            right: "-15%",
            background:
              "linear-gradient(315deg, hsla(42, 80%, 50%, 0.1) 0%, hsla(35, 70%, 45%, 0.04) 50%, transparent 80%)",
            filter: "blur(70px)",
            animation: "auroraShift2 35s ease-in-out infinite alternate",
            borderRadius: "50%",
          }}
        />
        {/* Accent highlight */}
        <div
          className="absolute"
          style={{
            width: "500px",
            height: "500px",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, hsla(270, 50%, 50%, 0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "breathe 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating particles canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Mesh / grid lines for tech feel — very subtle */}
      <div
        className="fixed inset-0 -z-15 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `
            linear-gradient(hsla(270, 40%, 60%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsla(270, 40%, 60%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture for premium feel */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 40%, hsla(250, 35%, 5%, 0.6) 100%)",
        }}
      />
    </>
  );
};

export default BackgroundEffects;
