import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/30" style={{
      background: "hsla(230, 60%, 7%, 0.8)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        <div className="font-display font-black text-xl sm:text-2xl tracking-wider"
          style={{ background: "var(--gradient-electric)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          APEXERA '26
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <button onClick={() => handleClick(item.href)} className="neon-link font-medium text-base bg-transparent border-none cursor-pointer font-body">
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary bg-transparent border-none cursor-pointer">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/30 py-4" style={{ background: "hsla(230, 60%, 7%, 0.98)", backdropFilter: "blur(20px)" }}>
          <ul className="flex flex-col items-center gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <button onClick={() => handleClick(item.href)} className="neon-link font-medium text-lg bg-transparent border-none cursor-pointer font-body">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
