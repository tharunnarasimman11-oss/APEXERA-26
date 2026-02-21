const aboutCards = [
  {
    icon: "🎓",
    title: "Workshops",
    subtitle: "MATLAB & Generative AI",
    description: "Master cutting-edge tools in MATLAB for sustainable problem-solving and dive into the transformative world of Generative AI. Learn from experts and build real solutions.",
  },
  {
    icon: "🏆",
    title: "Competitions",
    subtitle: "Coding • Debate • Ideas",
    description: "Compete in AlgoArena coding challenge, Word Warriors debate, and InnoVision idea pitch. Showcase your skills and win big!",
  },
  {
    icon: "💰",
    title: "Cash Prizes",
    subtitle: "Win up to ₹5,000",
    description: "Exciting cash prizes, certificates, and recognition await the top performers. Your innovation deserves rewards!",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">About APEXERA '26</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
        {aboutCards.map((card) => (
          <div key={card.title} className="glass-card p-6 sm:p-8 text-center">
            <h3 className="text-primary font-display font-bold text-xl sm:text-2xl mb-3 relative z-10">{card.icon} {card.title}</h3>
            <p className="text-secondary font-bold text-base sm:text-lg mb-3 relative z-10">{card.subtitle}</p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed relative z-10">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
