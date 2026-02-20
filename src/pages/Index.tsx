import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import ScheduleSection from "@/components/ScheduleSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative">
      <BackgroundEffects />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ScheduleSection />
      <PartnersSection />
      <ContactSection />
    </div>
  );
};

export default Index;
