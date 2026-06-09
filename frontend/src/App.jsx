import { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom' // 1. IMPORT THIS
import Hero from "./components/hero";
import About from "./components/About";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import ChatBot from "./components/Chatbot";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Chat with AI"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Highlight active nav based on scroll position
      const sections = NAV_LINKS.map((l) => ({
        id: l === "Chat with AI" ? "chatbot" : l.toLowerCase(),
        label: l,
        el: document.getElementById(l === "Chat with AI" ? "chatbot" : l.toLowerCase()),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section) => {
    const id = section === "Chat with AI" ? "chatbot" : section.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --bg2: #111118;
          --surface: #16161f;
          --surface2: #1e1e2a;
          --border: rgba(255,255,255,0.07);
          --accent: #c8a96e;
          --accent2: #e8c98a;
          --text: #f0eee8;
          --muted: #7a7888;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          --nav-h: 72px;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }

        ::selection { background: var(--accent); color: #000; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

        /* Nav */
        .app-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          transition: background 0.4s ease, border-bottom 0.4s ease;
        }
        .app-nav.scrolled {
          background: rgba(10,10,15,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.02em;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links button {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          cursor: pointer;
          padding: 0.25rem 0;
          position: relative;
          transition: color 0.3s;
        }
        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        .nav-links button:hover,
        .nav-links button.active {
          color: var(--accent);
        }
        .nav-links button.active::after,
        .nav-links button:hover::after {
          width: 100%;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 110;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--text);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(10,10,15,0.97);
          backdrop-filter: blur(20px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          background: none;
          border: none;
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 400;
          color: var(--text);
          cursor: pointer;
          transition: color 0.3s;
          letter-spacing: 0.02em;
        }
        .mobile-menu button:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }

        /* Sections */
        section {
          min-height: 100vh;
          padding: calc(var(--nav-h) + 3rem) clamp(1.5rem, 6vw, 5rem) 5rem;
        }
        section#home { padding-top: 0; }

        /* Utility classes used across components */
        .tag {
          display: inline-block;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(200,169,110,0.3);
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .section-sub {
          color: var(--muted);
          font-size: 1rem;
          max-width: 520px;
          line-height: 1.8;
          margin-bottom: 3.5rem;
        }

        .divider {
          width: 60px;
          height: 1px;
          background: var(--accent);
          margin-bottom: 1.5rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          border-radius: 3px;
        }
        .btn-primary {
          background: var(--accent);
          color: #000;
          border: 1px solid var(--accent);
        }
        .btn-primary:hover {
          background: var(--accent2);
          border-color: var(--accent2);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,169,110,0.25);
        }
        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
        }

        /* Fade-in animation for sections */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Navbar */}
      <nav className={`app-nav${scrolled ? " scrolled" : ""}`}>
        <span className="nav-logo" />

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

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>{link}</button>
        ))}
      </div>

      {/* Pages */}
      <main>
        <section id="home"><Hero /></section>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* AI Chatbot */}
      <div id="chatbot">
        <ChatBot />
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "2rem",
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        fontSize: "0.8rem",
        letterSpacing: "0.08em",
      }}>
        © {new Date().getFullYear()}i am Mehwish Mubeen  — Built with React + Vite
      </footer>
    </BrowserRouter>
  );
}