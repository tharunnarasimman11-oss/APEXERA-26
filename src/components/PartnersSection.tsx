const partners = ["IEEE", "IEEE EPS", "IEEE Sairam", "Sairam Institutions"];

// Add more leaders here — just add a new object with name, role, dept (optional), and photo URL
const leaders = [
  { name: "Dr. Sai Prakash Leo Muthu", role: "Chairman & CEO", dept: "Sairam Institution", photo: "https://i.pravatar.cc/200?img=1" },
  { name: "Dr. J. Raja", role: "Principal", dept: "Sri Sairam Engineering College", photo: "https://i.pravatar.cc/200?img=2" },
  { name: "Dr. B.Vijaya Ramnath", role: "Society Captain", dept: "HOD/Mech", photo: "https://i.pravatar.cc/200?img=3" },
  { name: "Dr. P. Maheshwari", role: "Society Advisor", photo: "https://i.pravatar.cc/200?img=4" },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-5xl w-full">
        {leaders.map((l) => (
          <div key={l.name} className="glass-card p-6 sm:p-8 text-center group flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary mb-4 group-hover:border-accent transition-colors duration-300"
              style={{ boxShadow: "0 0 20px hsla(270, 60%, 55%, 0.3)" }}>
              <img
                src={l.photo}
                alt={l.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h4 className="text-primary font-bold text-sm sm:text-base mb-1 relative z-10"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {l.name}
            </h4>
            <p className="text-accent text-xs sm:text-sm font-semibold mb-1 relative z-10">{l.role}</p>
            {l.dept && <p className="text-muted-foreground text-xs relative z-10">{l.dept}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
