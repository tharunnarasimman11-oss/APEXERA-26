import heroBg from "@/assets/hero-bg.jpeg";

const BackgroundEffects = () => {
  return (
    <>
      {/* Hero image as fixed background with overlay */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay for readability */}
      <div
        className="fixed inset-0 -z-15"
        style={{
          background: `
            linear-gradient(
              180deg,
              hsla(250, 30%, 10%, 0.75) 0%,
              hsla(250, 30%, 10%, 0.85) 30%,
              hsla(250, 30%, 10%, 0.92) 60%,
              hsl(250, 30%, 10%) 100%
            )
          `,
        }}
      />
      {/* Subtle purple ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsla(270,60%,50%,0.06), transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsla(40,90%,55%,0.04), transparent 50%)
          `,
        }}
      />
    </>
  );
};

export default BackgroundEffects;
