const BackgroundEffects = () => {
  return (
    <>
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsla(180,100%,50%,0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsla(180,100%,50%,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Soft ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, hsla(180,100%,50%,0.03), transparent 50%),
            radial-gradient(ellipse at 80% 20%, hsla(210,100%,50%,0.03), transparent 50%)
          `,
        }}
      />
    </>
  );
};

export default BackgroundEffects;
