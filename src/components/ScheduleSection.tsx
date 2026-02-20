const scheduleItems = [
  { title: "Morning Session: TechTangle - MATLAB Workshop", desc: "Create mini-models addressing real-world sustainability challenges using MATLAB.", sdg: "📊 Based on SDGs: 4, 9" },
  { title: "Morning Session: MIND - Generative AI Workshop", desc: "Explore how Generative AI can solve sustainability problems. Hands-on activities included!", sdg: "🤖 Based on SDGs: 4, 9" },
  { title: "Midday: Converge - Panel Discussion", desc: "Expert panel discussions on critical global issues. Focus on sustainable development challenges.", sdg: "💡 Based on SDGs: 7, 9, 13, 17" },
  { title: "Afternoon: AlgoArena - Coding Competition", desc: "Two-round challenge: Round 1 tests debugging, Round 2 focuses on complex sustainability solutions.", sdg: "💻 Based on SDGs: 7, 9, 13, 17" },
  { title: "Afternoon: InnoVision - Idea Pitching", desc: "Present sustainable business models focusing on circular economy and renewable energy.", sdg: "🚀 Based on SDGs: 1, 3, 11, 14, 15" },
  { title: "Evening: Word Warriors - Debate Contest", desc: "Debate on Gender Equality, AI's Economic Impact, and Justice System.", sdg: "🎤 Based on SDGs: 5, 8, 16" },
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-6">Event Schedule</h2>
      <h3 className="text-primary font-display font-bold text-xl sm:text-2xl text-center mb-8" style={{ textShadow: "0 0 20px hsla(180,100%,50%,0.5)" }}>
        ⚡ FULL DAY EVENT SCHEDULE
      </h3>
      <div className="max-w-5xl w-full flex flex-col gap-4 sm:gap-6">
        {scheduleItems.map((item, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl p-5 sm:p-6 transition-all duration-500 cursor-default"
            style={{
              background: "hsla(230,40%,12%,0.6)",
              backdropFilter: "blur(20px)",
              borderLeft: "5px solid hsl(180,100%,50%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateX(16px) scale(1.02)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 70px hsla(180,100%,50%,0.3)";
              (e.currentTarget as HTMLDivElement).style.borderLeftWidth = "8px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              (e.currentTarget as HTMLDivElement).style.borderLeftWidth = "5px";
            }}
          >
            <h4 className="text-primary font-bold text-base sm:text-lg md:text-xl mb-2 transition-all duration-300 group-hover:translate-x-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {item.title}
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.desc}</p>
            <p className="text-primary font-semibold text-sm mt-3">{item.sdg}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
