const BackgroundEffects = () => {
  return (
    <>
      {/* Base gradient background */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: `
            linear-gradient(
              160deg,
              hsl(250, 30%, 8%) 0%,
              hsl(260, 25%, 12%) 25%,
              hsl(270, 20%, 10%) 50%,
              hsl(255, 28%, 9%) 75%,
              hsl(245, 30%, 7%) 100%
            )
          `,
        }}
      />

      {/* Animated purple-gold ambient orbs */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Large purple orb top-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "-10%",
            left: "-8%",
            background: "radial-gradient(circle, hsla(270, 55%, 40%, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "orbFloat1 20s ease-in-out infinite",
          }}
        />
        {/* Gold orb mid-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            top: "30%",
            right: "-5%",
            background: "radial-gradient(circle, hsla(42, 80%, 50%, 0.08) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "orbFloat2 25s ease-in-out infinite",
          }}
        />
        {/* Purple orb bottom-center */}
        <div
          className="absolute rounded-full"
          style={{
            width: "700px",
            height: "700px",
            bottom: "-15%",
            left: "30%",
            background: "radial-gradient(circle, hsla(265, 50%, 35%, 0.1) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "orbFloat3 22s ease-in-out infinite",
          }}
        />
        {/* Small gold accent top-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: "5%",
            right: "15%",
            background: "radial-gradient(circle, hsla(40, 85%, 55%, 0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "orbFloat2 18s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Subtle grain/noise overlay for texture */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Soft vignette */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 50%, hsla(250, 30%, 5%, 0.5) 100%)",
        }}
      />
    </>
  );
};

export default BackgroundEffects;
