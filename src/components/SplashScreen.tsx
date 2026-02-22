import { useState, useEffect } from "react";
import mascotImg from "@/assets/mascot.jpeg";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 800);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const removeTimer = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  // Generate particles once
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: `${Math.random() * 4}s`,
    duration: `${Math.random() * 3 + 3}s`,
  }));

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(270, 60%, 18%), hsl(42, 80%, 55%))",
        backgroundSize: "400% 400%",
        animation: "splashGradientShift 6s ease infinite",
      }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "hsl(42, 80%, 65%)",
            opacity: 0.5,
            animation: `splashParticleFloat ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Mascot */}
      <div
        className="relative"
        style={{ animation: "splashEntrance 0.8s ease-out both" }}
      >
        <img
          src={mascotImg}
          alt="APEXERA Mascot"
          className="w-40 h-40 sm:w-52 sm:h-52 object-contain drop-shadow-2xl"
          style={{
            animation: "splashFloat 3s ease-in-out infinite",
            filter: "drop-shadow(0 20px 40px hsla(42, 80%, 55%, 0.4))",
          }}
        />
      </div>

      {/* Text */}
      <div
        className={`mt-6 flex flex-col items-center gap-2 transition-all duration-700 ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold font-display"
          style={{ color: "hsl(42, 80%, 75%)" }}
        >
          Welcome
        </h1>
        <p
          className="text-xs sm:text-sm uppercase tracking-widest"
          style={{ color: "hsla(42, 80%, 75%, 0.6)" }}
        >
          Your event awaits
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "hsl(42, 80%, 65%)",
              animation: `splashDotPulse 1.2s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
