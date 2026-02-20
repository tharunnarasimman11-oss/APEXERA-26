import { useState } from "react";
import { X } from "lucide-react";

const events = [
  { id: "techtangle", icon: "⚡", title: "TechTangle", desc: "Entangling Creativity with Sustainable Technology - Create mini-models in MATLAB that solve real sustainability challenges.", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeV6JBjkQ2iXhXnExCmrtAh4rFQ2fsVz0t-lbS35y0VAb0sHg/viewform?usp=header" },
  { id: "mind", icon: "🤖", title: "MIND", desc: "AI for Sustainable Innovation - Explore Generative AI and learn how to build solutions for a sustainable future.", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfSqryRU_JP-HxXo4eUU6_slK2k4miW9PfkqOcbUVN9joYO_Q/viewform?usp=sharing" },
  { id: "converge", icon: "💡", title: "Converge", desc: "Clashing Ideas, Building a Sustainable Future - Expert panel discussions on technology and sustainability challenges.", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSem6zcqE81PLgEfALlzleaqGzdCtSlEhb2ugNNbnAj-2sldbQ/viewform?usp=header" },
  { id: "algoarena", icon: "💻", title: "AlgoArena", desc: "Coding for a Sustainable Tomorrow - Two-round coding competition with cash prizes for top 3 winners!", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfz6LBgLJY1GAN_I6S3DjKMbizdvF8hBT1ubg3vhEHLNpYPQw/viewform?usp=dialog" },
  { id: "innovision", icon: "🚀", title: "InnoVision", desc: "Innovating for a Greener Future - Pitch your sustainable business ideas and win cash prizes and certificates!", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeIIAaJ05nC7et66tkAfRyyCRq2lOkNYxjJNIXJRk8TIDLchA/viewform?usp=header" },
  { id: "wordwarriors", icon: "🎤", title: "Word Warriors", desc: "Debating the Future of Sustainability - Tackle SDG-related topics and win prizes for your eloquence!", registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYm5kCRTK6qGlQmmi_5PJCgJaerSS89JvQqO2EHeiDPwkwRA/viewform?usp=header" },
];

const eventDetails: Record<string, { title: string; subtitle: string; description: string; outcome: string; sdgs: string }> = {
  techtangle: { title: "TechTangle", subtitle: "Entangling Creativity with Sustainable Technology", description: "TechTangle is the exciting highlight of our MATLAB workshop, designed to encourage participants to create mini-models that address real-world sustainability challenges. Participants will use MATLAB to develop innovative solutions to environmental or societal problems.", outcome: "The MATLAB workshop will provide students with practical experience using a powerful tool for technical computing and data analysis.", sdgs: "Based on SDGs: 4 (Quality Education), 9 (Industry, Innovation & Infrastructure)" },
  mind: { title: "MIND", subtitle: "AI for Sustainable Innovation", description: "MIND is an exciting workshop that dives into the world of Generative AI and its transformative potential. Participants will explore how AI can be used to solve sustainability problems.", outcome: "The Generative AI workshop will introduce students to one of the most exciting areas in artificial intelligence.", sdgs: "Based on SDGs: 4, 9" },
  converge: { title: "Converge", subtitle: "Clashing Ideas, Building a Sustainable Future", description: "Converge is an engaging event offering participants a chance to focus on sustainable development challenges. Expert panel discussions on critical global issues.", outcome: "The panel discussion will give students a chance to hear from experts and explore new perspectives on important topics.", sdgs: "Based on SDGs: 7, 9, 13, 17" },
  algoarena: { title: "AlgoArena", subtitle: "Coding for a Sustainable Tomorrow", description: "AlgoArena is a thrilling two-round coding competition. Round 1 tests debugging skills, Round 2 challenges complex sustainability coding solutions. Top 3 win cash prizes!", outcome: "Sharpen programming and problem-solving skills in a fun and competitive environment.", sdgs: "Based on SDGs: 7, 9, 13, 17" },
  innovision: { title: "InnoVision", subtitle: "Innovating for a Greener Future", description: "InnoVision is a vibrant idea pitching event. Teams pitch sustainable, innovative ideas focusing on circular economy and renewable energy.", outcome: "Encouraging creativity and innovation with essential skills like pitching and business planning.", sdgs: "Based on SDGs: 1, 3, 11, 14, 15" },
  wordwarriors: { title: "Word Warriors", subtitle: "Debating the Future of Sustainability", description: "Word Warriors is an intense debate contest tackling current SDG-related issues including Gender Equality, AI's Economic Impact, and Justice.", outcome: "Develop critical thinking and public speaking skills while boosting confidence.", sdgs: "Based on SDGs: 5, 8, 16" },
};

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const detail = selectedEvent ? eventDetails[selectedEvent] : null;

  return (
    <section id="events" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">Our Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1500px] w-full">
        {events.map((event) => (
          <div key={event.id} className="glass-card p-6 sm:p-8 group">
            {/* Top gradient bar on hover */}
            <div className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: "var(--gradient-electric)" }} />
            <h3 className="text-primary font-display font-bold text-xl sm:text-2xl mb-3 relative z-10">{event.icon} {event.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 relative z-10">{event.desc}</p>
            <div className="flex gap-3 relative z-10 flex-wrap">
              <button onClick={() => setSelectedEvent(event.id)} className="btn-electric text-sm px-5 py-2.5 flex-1 min-w-[100px]">
                <span className="relative z-10">Know More</span>
              </button>
              <a href={event.registerUrl} target="_blank" rel="noopener noreferrer" className="btn-electric-outline text-sm px-5 py-2.5 flex-1 min-w-[100px] text-center">
                Register
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && detail && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
        >
          <div className="glass-card p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative border-2 border-primary/50"
            style={{ animation: "fadeInUp 0.4s ease-out", boxShadow: "0 30px 100px hsla(180,100%,50%,0.3)" }}>
            <button onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-primary bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rotate-90">
              <X size={20} />
            </button>
            <h2 className="text-primary font-display font-black text-2xl sm:text-3xl mb-2">{detail.title}</h2>
            <h3 className="text-muted-foreground text-base sm:text-lg mb-6">{detail.subtitle}</h3>
            <h4 className="text-primary font-display font-bold text-lg mb-2">📝 Description</h4>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{detail.description}</p>
            <h4 className="text-primary font-display font-bold text-lg mb-2">🎯 Outcome</h4>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{detail.outcome}</p>
            <p className="text-primary font-semibold mt-4">🌍 {detail.sdgs}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
