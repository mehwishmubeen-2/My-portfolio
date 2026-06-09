import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Highlight active nav based on scroll position
      const sections = NAV_LINKS.map((l) => ({
        id: l.toLowerCase(),
        el: document.getElementById(l.toLowerCase()),
      }));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(NAV_LINKS[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section) => {
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <span className="nav-logo" onClick={() => scrollTo("home")}>YN.</span>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                className={active === link ? "active" : ""}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>
            {link}
          </button>
        ))}
      </div>
    </>
  );
}