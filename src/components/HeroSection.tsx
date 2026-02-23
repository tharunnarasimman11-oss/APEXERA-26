import { useEffect, useRef, useState, useCallback } from "react";
import apexeraLogo from "@/assets/apexera-logo.png";

const REGISTRATION_DEADLINE = new Date("2026-03-10T23:59:00").getTime();

const getTimeLeft = () => {
  const now = Date.now();
  const diff = Math.max(0, REGISTRATION_DEADLINE - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff <= 0,
  };
};

const stats = [
  { target: 6, label: "Epic Events" },
  { target: 25000, label: "Cash Prizes", prefix: "₹" },
  { target: 2, label: "Days of Innovation" },
];

const HeroSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const logoCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  // Golden shower / sparkle particle effect around logo
  useEffect(() => {
    const canvas = logoCanvasRef.current;
    const container = logoContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; decay: number;
      hue: number; sparkle: boolean;
    }

    const particles: Particle[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const w = canvas.width;
      const h = canvas.height;
      // Spawn from top area, spread across width
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * w;
        const y = -5 + Math.random() * 10;
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 0.8 + Math.random() * 2,
          size: 1.5 + Math.random() * 3,
          alpha: 0.7 + Math.random() * 0.3,
          decay: 0.003 + Math.random() * 0.006,
          hue: 35 + Math.random() * 20, // gold range
          sparkle: Math.random() > 0.6,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.sparkle && Math.random() > 0.5) {
          // Draw star sparkle
          const spikes = 4;
          const outerR = p.size * 2;
          const innerR = p.size * 0.8;
          ctx.beginPath();
          for (let s = 0; s < spikes * 2; s++) {
            const r = s % 2 === 0 ? outerR : innerR;
            const angle = (s * Math.PI) / spikes - Math.PI / 2;
            const sx = p.x + Math.cos(angle) * r;
            const sy = p.y + Math.sin(angle) * r;
            s === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.8)`;
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Draw glowing circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.alpha})`;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, 0.6)`;
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((stat, i) => {
            const duration = 2000;
            const step = stat.target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= stat.target) {
                setCounts((prev) => { const n = [...prev]; n[i] = stat.target; return n; });
                clearInterval(timer);
              } else {
                setCounts((prev) => { const n = [...prev]; n[i] = Math.floor(current); return n; });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToEvents = () => {
    document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
  };

  const isExpired = timeLeft.expired;

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 relative">
      <div ref={logoContainerRef} className="mb-4 animate-fade-in-up relative w-[340px] sm:w-[460px] md:w-[600px] lg:w-[720px] aspect-[2/1] flex items-center justify-center">
        <canvas ref={logoCanvasRef} className="absolute inset-0 pointer-events-none z-10" />
        <img
          src={apexeraLogo}
          alt="APEXERA 26"
          className="w-full drop-shadow-[0_0_40px_hsla(40,100%,50%,0.5)] animate-title-glow-logo relative z-0"
        />
      </div>

      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light tracking-wider mb-8 animate-fade-in-up-delay-1">
        Towards the Summit of Sustainable Era
      </p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 animate-fade-in-up-delay-2">
        {[
          { icon: "📅", title: "Date & Time", value: "16th & 17th March 2026" },
          { icon: "📍", title: "Venue", value: "Sri Sairam Engineering College" },
          { icon: "🎟️", title: "Registration", value: "FREE FOR ALL", highlight: true },
        ].map((item) => (
          <div key={item.title} className="glass-card p-4 sm:p-6 text-center min-w-[160px]">
            <h3 className="text-primary font-display font-bold text-base sm:text-lg mb-2">{item.icon} {item.title}</h3>
            <p className={`text-sm sm:text-base ${item.highlight ? "text-secondary font-bold text-lg" : "text-muted-foreground"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div ref={statsRef} className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8 animate-fade-in-up-delay-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-secondary" style={{ textShadow: "0 0 20px hsla(40,90%,55%,0.4)" }}>
              {stat.prefix || ""}{counts[i].toLocaleString()}
            </div>
            <div className="text-muted-foreground text-sm sm:text-base mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 sm:p-8 mb-6 animate-fade-in-up-delay-3 text-center">
        <p className="text-secondary font-display font-bold text-lg sm:text-xl mb-4 tracking-wider">
          ⏳ REGISTRATION CLOSES IN ⏳
        </p>
        <div className="flex justify-center gap-3 sm:gap-6">
          {[
            { val: timeLeft.days, label: "Days" },
            { val: timeLeft.hours, label: "Hours" },
            { val: timeLeft.minutes, label: "Minutes" },
            { val: timeLeft.seconds, label: "Seconds" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center">
              <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-primary" style={{ textShadow: "0 0 15px hsla(270,60%,55%,0.4)", minWidth: "60px" }}>
                {String(t.val).padStart(2, "0")}
              </div>
              <span className="text-muted-foreground text-xs sm:text-sm mt-1">{t.label}</span>
            </div>
          ))}
        </div>
        {isExpired && (
          <p className="text-destructive font-display font-bold text-xl mt-4">REGISTRATION CLOSED</p>
        )}
      </div>

      <button
        onClick={isExpired ? undefined : scrollToEvents}
        disabled={isExpired}
        className={`text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 animate-fade-in-up-delay-4 ${isExpired ? "btn-electric opacity-50 cursor-not-allowed" : "btn-electric"}`}
      >
        <span className="relative z-10">{isExpired ? "REGISTRATION CLOSED" : "⚡ REGISTER NOW ⚡"}</span>
      </button>

      <div className="mt-8 sm:mt-12 text-center animate-fade-in-up-delay-4">
        <p className="text-muted-foreground text-sm sm:text-base">Organized by</p>
        <h3 className="text-primary font-display font-bold text-lg sm:text-xl md:text-2xl mt-1">IEEE Electronic Packaging Society</h3>
        <p className="text-muted-foreground text-sm sm:text-base">SEC Student Branch Chapter</p>
      </div>
    </section>
  );
};

export default HeroSection;
