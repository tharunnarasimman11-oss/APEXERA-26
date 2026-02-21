const day1Events = [
  { title: "MIND – Generative AI Workshop", desc: "Explore how Generative AI can solve sustainability problems. Hands-on activities included!", sdg: "🤖 Based on SDGs: 4, 9" },
  { title: "Convergence – SDG Hackathon", desc: "Collaborative hackathon to develop impactful solutions aligned with SDG 7, 9, 13, 17.", sdg: "💡 Based on SDGs: 7, 9, 13, 17" },
  { title: "AlgoArena – Coding Competition", desc: "Two-round challenge: Round 1 tests debugging, Round 2 focuses on complex sustainability solutions.", sdg: "💻 Based on SDGs: 7, 9, 13, 17" },
];

const day2Events = [
  { title: "TechTangle – MATLAB Workshop", desc: "Create mini-models addressing real-world sustainability challenges using MATLAB.", sdg: "⚡ Based on SDGs: 4, 9" },
  { title: "InnoVision – Idea Pitching", desc: "Present sustainable business models focusing on circular economy and renewable energy.", sdg: "🚀 Based on SDGs: 1, 3, 11, 14, 15" },
  { title: "Word Warriors – Debate Contest", desc: "Debate on Gender Equality, AI's Economic Impact, and Justice System.", sdg: "🎤 Based on SDGs: 5, 8, 16" },
];

const ScheduleSection = () => {
  const renderDay = (date: string, label: string, events: typeof day1Events) => (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="font-display font-black text-4xl sm:text-5xl text-primary" style={{ textShadow: "0 0 20px hsla(180,100%,50%,0.5)" }}>
            {date}
          </div>
          <div className="text-muted-foreground text-sm font-semibold">{label}</div>
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex flex-col gap-4 sm:gap-5 pl-4 sm:pl-8 border-l-2 border-primary/30">
        {events.map((item, i) => (
          <div key={i} className="glass-card p-5 sm:p-6">
            <h4 className="text-primary font-bold text-base sm:text-lg md:text-xl mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {item.title}
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.desc}</p>
            <p className="text-primary font-semibold text-sm mt-3">{item.sdg}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="schedule" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-6">Event Schedule</h2>
      <h3 className="text-primary font-display font-bold text-xl sm:text-2xl text-center mb-10" style={{ textShadow: "0 0 20px hsla(180,100%,50%,0.5)" }}>
        2-DAY EVENT SCHEDULE
      </h3>
      <div className="max-w-5xl w-full">
        {renderDay("16", "March 2026", day1Events)}
        {renderDay("17", "March 2026", day2Events)}
      </div>
    </section>
  );
};

export default ScheduleSection;
