const whyItems = [
  "Learn from industry experts and gain hands-on experience with cutting-edge technologies like MATLAB and Generative AI",
  "Network with passionate students, professionals, and thought leaders in sustainability and innovation",
  "Win exciting cash prizes up to ₹40,000, earn certificates, and gain recognition for your talent",
  "Develop in-demand skills in coding, AI, public speaking, entrepreneurship, and problem-solving",
  "Contribute to solving real-world sustainability challenges aligned with UN Sustainable Development Goals",
  "Showcase your innovative ideas on a prestigious platform and get valuable feedback from experts",
  "Be part of a movement towards a sustainable future and make a real impact on society",
];

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-24">
      <h2 className="section-glow-title text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">Join Us at APEXERA '26</h2>

      <div className="max-w-5xl w-full">
        {/* Why attend */}
        <div className="glass-card p-6 sm:p-10 mb-10">
          <h3 className="text-primary font-bold text-xl sm:text-2xl mb-2 relative z-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            🎉 Registration is 100% FREE!
          </h3>
          <h3 className="text-primary font-bold text-lg sm:text-xl mt-4 mb-6 relative z-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Why You Should Attend?
          </h3>
          <ul className="space-y-4 relative z-10">
            {whyItems.map((item, i) => (
              <li key={i} className="text-muted-foreground text-sm sm:text-base leading-relaxed pl-8 relative hover:text-foreground hover:translate-x-1 transition-all duration-300 cursor-default">
                <span className="absolute left-0 text-secondary text-lg">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-primary font-bold text-lg sm:text-xl mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>📞 Contact Us</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-1">Sri Sairam Engineering College</p>
            <p className="text-muted-foreground text-sm sm:text-base mb-1">Chennai, Tamil Nadu</p>
           <p className="text-muted-foreground text-sm sm:text-base mb-1">Email: <a href="mailto:sec23ee010@sairamtap.edu.in" >sec23ee010@sairamtap.edu.in</a></p>
            <p className="text-muted-foreground text-sm sm:text-base">Phone: +91 9150167085</p>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg sm:text-xl mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>🔗 Quick Links</h3>
            {["Home", "About", "Events", "Schedule", "Partners"].map((link) => (
              <button key={link}
                onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                className="block text-muted-foreground text-sm sm:text-base mb-2 hover:text-primary hover:translate-x-1 transition-all duration-300 bg-transparent border-none cursor-pointer font-body text-left">
                {link}
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg sm:text-xl mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>🌱 About APEXERA '26</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Sustainable Development Congress - Towards the Summit of Sustainable Era. Join us in creating innovative solutions for a greener, more sustainable tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
