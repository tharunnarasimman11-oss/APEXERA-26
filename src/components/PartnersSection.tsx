const partners = ["IEEE", "IEEE EPS", "IEEE Sairam", "Sairam Institutions"];

const leaders = [
  { name: "Dr. B.Vijaya Ramnath", role: "Society Captain", dept: "HOD/Mech" },
  { name: "Dr. P. Maheshwari", role: "Society Advisor" },
  { name: "Dr. J. Raja", role: "Principal",role:"Sri sairam engineering college"}
  { name: "Dr. Sai Prakash Leo Muthu", role: "Chairman & CEO", dept: "Sairam Institution" },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">Our Partners</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full mb-16">
        {partners.map((p, i) => (
          <div key={p} className="glass-card p-4 sm:p-6 text-center font-bold text-primary text-sm sm:text-base font-display"
            style={{ animationDelay: `${i * 0.2}s` }}>
            {p}
          </div>
        ))}
      </div>

      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-4">Our Leadership</h2>
      <h3 className="text-primary text-center mb-8 text-base sm:text-lg font-bold font-display">Organizing Committee</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 max-w-6xl w-full">
        {leaders.map((l) => (
          <div key={l.name} className="glass-card p-5 sm:p-6 text-center group">
            <h4 className="text-primary font-bold text-sm sm:text-base mb-2 relative z-10 group-hover:scale-105 transition-transform"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {l.name}
            </h4>
            {l.dept && <p className="text-muted-foreground text-xs sm:text-sm relative z-10">{l.dept}</p>}
            <p className="text-primary text-xs sm:text-sm mt-1 relative z-10 font-semibold">{l.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
