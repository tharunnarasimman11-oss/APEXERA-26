import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 6, label: "Epic Events" },
  { target: 5000, label: "Cash Prizes", prefix: "₹" },
  { target: 1, label: "Day of Innovation" },
];

const HeroSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

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

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 relative">
      <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider mb-4 animate-title-glow animate-fade-in-up">
        APE<span className="text-primary animate-electric-pulse inline-block">X</span>ERA '25
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light tracking-wider mb-8 animate-fade-in-up-delay-1">
        Towards the Summit of Sustainable Era
      </p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 animate-fade-in-up-delay-2">
        {[
          { icon: "📅", title: "Date & Time", value: "Coming Soon" },
          { icon: "📍", title: "Venue", value: "Sri Sairam Engineering College" },
          { icon: "🎟️", title: "Registration", value: "FREE FOR ALL", highlight: true },
        ].map((item) => (
          <div key={item.title} className="glass-card p-4 sm:p-6 text-center min-w-[160px]">
            <h3 className="text-primary font-display font-bold text-base sm:text-lg mb-2">{item.icon} {item.title}</h3>
            <p className={`text-sm sm:text-base ${item.highlight ? "text-green-400 font-bold text-lg" : "text-muted-foreground"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div ref={statsRef} className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8 animate-fade-in-up-delay-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-primary" style={{ textShadow: "0 0 20px hsla(180,100%,50%,0.5)" }}>
              {stat.prefix || ""}{counts[i].toLocaleString()}
            </div>
            <div className="text-muted-foreground text-sm sm:text-base mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <button onClick={scrollToEvents} className="btn-electric text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 animate-btn-pulse animate-fade-in-up-delay-4">
        <span className="relative z-10">⚡ REGISTER NOW ⚡</span>
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
