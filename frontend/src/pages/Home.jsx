import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TYPED_STRINGS = [
  "Full Stack Developer",
  "AI Engineer",
  "React Specialist",
  "Problem Solver",
];

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % strings.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}
const SKILLS = [
  { label: "React / Next.js", icon: "⚛" },
  { label: "Node.js / Express", icon: "🟩" },
  { label: "MongoDB", icon: "🍃" },
  { label: "Python / FastAPI", icon: "🐍" },
  { label: "OpenAI / LangChain", icon: "🤖" },
  { label: "REST APIs", icon: "🔗" },
  { label: "Docker", icon: "🐳" },
  { label: "Git & GitHub", icon: "🐙" },
  { label: "JavaScript (ES6+)", icon: "🟨" },
  { label: "HTML5 / CSS3", icon: "🌐" },
  { label: "DevOps / CI-CD", icon: "♾️" },
  { label: "Data Structures & Algorithms", icon: "📊" },
  { label: "Problem Solving", icon: "🧠" },
  { label: "Information Security", icon: "🛡️" },
  { label: "Artificial Intelligence", icon: "🧠" },
  { label: "Machine Learning", icon: "📈" }
];
const PROJECTS = [
  {
    title: "Parallel & Distributed Computing Engine",
    desc: "A high-performance computing system utilizing multi-threading, distributed nodes, and advanced data structures to process complex algorithms in parallel.",
    tags: ["Python", "Docker", "DevOps", "Algorithms"],
    gradient: "from-blue-600 to-cyan-500",
    accent: "#2563eb",
  },
  {
    title: "SnapBook",
    desc: "A service-based photographer booking platform featuring SEO-optimized landing pages, real-time availability, and an AI assistant for client inquiries.",
    tags: ["React / Next.js", "Node.js", "OpenAI", "MongoDB"],
    gradient: "from-rose-500 to-pink-600",
    accent: "#f43f5e",
  },
  {
    title: "SignVerse",
    desc: "An accessibility-focused web application that leverages machine learning models to translate sign language gestures into text in real-time.",
    tags: ["JavaScript (ES6+)", "Machine Learning", "Python", "HTML5 / CSS3"],
    gradient: "from-purple-600 to-indigo-600",
    accent: "#7c3aed",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const typed = useTypingEffect(TYPED_STRINGS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home-root">
      {/* ── NAV ─────────────────────────────────────── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <span className="nav-logo">
          &lt;<span>dev</span>/&gt;
        </span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <Link to="/chat" className="nav-cta">
          <span className="pulse-dot" /> Chat with AI
        </Link>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="grid-lines" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="dot" /> Available for work
          </p>
          <h1 className="hero-name">
            Hi, I'm <span className="name-accent">Mehwish Mubeen</span>
          </h1>
          <h2 className="hero-typed">
            {typed}
            <span className="cursor">|</span>
          </h2>
          <p className="hero-sub">
            I build intelligent, full-stack web applications that combine clean
            engineering with the power of modern AI. Let's create something
            remarkable.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
            <Link to="/chat" className="btn btn-ai">
              <span className="ai-spark">✦</span> Ask My AI
            </Link>
          </div>
        </div>

       <div className="hero-card-wrap">
          <div className="hero-card">
            <div className="card-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="card-tab">portfolio.js</span>
            </div>
            <pre className="card-code">{`const developer = {
  name: "Mehwish Mubeen",
  role: "Full Stack Engineer",
  stack: ["React", "Node.js", "MongoDB", "OpenAI"],
  openToWork: true,
  passion: "Crafting software that thinks 🚀"
};`}</pre>
            <div className="card-footer">
              <span className="status-dot" /> AI chatbot active
            </div>
          </div>
        </div>
      </section>
      {/* ── ABOUT ───────────────────────────────────── */}
      <section id="about" className="section about-section">
        <div className="section-inner about-grid">
          <div className="about-text">
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              I craft software that <em>thinks</em>
            </h2>
            <p>
              With a passion for both clean code and cutting-edge AI, I build
              products that feel intelligent from the ground up — from smooth
              React interfaces to powerful Node.js APIs and LLM integrations.
            </p>
            <p>
              My AI-powered portfolio chatbot isn't just a gimmick. It knows my
              projects, skills, and experience, and can answer any question about
              my work in real time.
            </p>
            <Link to="/chat" className="btn btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
              Meet the AI →
            </Link>
          </div>
          <div className="stats-grid">
            {[
             
              { n: "1+", l: "Years Coding" },
              { n: "5", l: "Projects Shipped" },
              { n: "2+", l: "AI Assistants Built" },
              { n: "∞", l: "Curiosity" },
            ].map(({ n, l }) => (
              <div key={l} className="stat-card">
                <span className="stat-n">{n}</span>
                <span className="stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────── */}
      <section id="skills" className="section skills-section">
        <div className="section-inner">
          <p className="section-label">Skills</p>
          <h2 className="section-title">My Toolbox</h2>
          <div className="skills-grid">
            {SKILLS.map(({ label, icon }) => (
              <div key={label} className="skill-pill">
                <span className="skill-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────── */}
      <section id="projects" className="section projects-section">
        <div className="section-inner">
          <p className="section-label">Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {PROJECTS.map(({ title, desc, tags, accent }) => (
              <div key={title} className="project-card" style={{ "--accent": accent }}>
                <div className="project-bar" style={{ background: accent }} />
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{desc}</p>
                <div className="project-tags">
                  {tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <Link to="/projects" className="project-link">
                  View Project →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CTA ──────────────────────────────────── */}
      <section className="ai-cta-section">
        <div className="ai-cta-inner">
          <div className="ai-cta-glow" />
          <span className="ai-badge">✦ AI-Powered</span>
          <h2 className="ai-cta-title">Have questions? My AI has answers.</h2>
          <p className="ai-cta-sub">
            Ask about my experience, projects, tech stack, availability — the AI
            assistant knows everything about my work and responds instantly.
          </p>
          <Link to="/chat" className="btn btn-ai btn-lg">
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────── */}
      <section id="contact" className="section contact-section">
        <div className="section-inner contact-inner">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's build together</h2>
          <p className="contact-sub">
            Open to freelance projects, full-time roles, and exciting
            collaborations.
          </p>
          <a href="mailto:mehwish88f@gmail.com" className="btn btn-primary btn-lg">
            Email Me
          </a>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <span>·</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="footer">
        <span>Built with React + AI ·</span>
        <span>&copy; {new Date().getFullYear()} </span>
      </footer>

      <style>{`
        /* ── RESET & BASE ─────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .home-root {
          --bg: #080b11;
          --bg2: #0d1117;
          --surface: #111820;
          --border: rgba(255,255,255,0.07);
          --text: #e8eaf0;
          --muted: #7a8394;
          --accent: #6d5cff;
          --accent2: #00e5c0;
          --font-head: 'Syne', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-head);
          overflow-x: hidden;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        p { line-height: 1.75; color: var(--muted); }

        /* ── NAV ──────────────────────────────────── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; gap: 2rem;
          padding: 1.25rem 4rem;
          transition: background .3s, border-color .3s;
        }
        .nav--scrolled {
          background: rgba(8,11,17,.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-size: 1.1rem; font-weight: 700; color: var(--text);
          margin-right: auto; letter-spacing: -.01em;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a {
          font-size: .875rem; font-weight: 500; color: var(--muted);
          transition: color .2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          display: flex; align-items: center; gap: .5rem;
          padding: .5rem 1.25rem;
          background: rgba(109,92,255,.15);
          border: 1px solid rgba(109,92,255,.4);
          border-radius: 100px;
          font-size: .8rem; font-weight: 600; color: #a89dff;
          transition: background .2s, border-color .2s;
        }
        .nav-cta:hover { background: rgba(109,92,255,.28); border-color: rgba(109,92,255,.7); }
        .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.4); }
        }

        /* ── HERO ─────────────────────────────────── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 7rem 4rem 4rem;
          gap: 4rem; position: relative; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .grid-lines {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 500px; height: 500px; top: -100px; right: -100px;
          background: rgba(109,92,255,.18);
        }
        .orb-2 {
          width: 400px; height: 400px; bottom: 0; left: -100px;
          background: rgba(0,229,192,.1);
          animation-delay: -6s;
        }
        @keyframes drift {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(40px,30px) scale(1.08); }
        }
        .hero-content {
          flex: 1; max-width: 560px; z-index: 1;
          animation: fadeUp .8s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: .5rem;
          font-size: .8rem; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: var(--accent2);
          margin-bottom: 1.25rem;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent2); }
        .hero-name {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800; line-height: 1.1;
          color: var(--text); margin-bottom: .5rem;
          letter-spacing: -.02em;
        }
        .name-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-typed {
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 600; color: var(--muted);
          margin-bottom: 1.5rem; min-height: 2.6rem;
          letter-spacing: -.01em;
        }
        .cursor {
          display: inline-block; color: var(--accent);
          animation: blink .9s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-sub {
          font-size: 1rem; color: var(--muted); margin-bottom: 2.5rem;
          line-height: 1.8; max-width: 460px;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: .75rem; }

        /* ── BUTTONS ──────────────────────────────── */
        .btn {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.6rem; border-radius: 8px;
          font-family: var(--font-head); font-size: .9rem; font-weight: 600;
          cursor: pointer; transition: all .2s; border: none;
        }
        .btn-primary {
          background: var(--accent); color: #fff;
        }
        .btn-primary:hover { background: #5848d9; transform: translateY(-1px); }
        .btn-ghost {
          background: transparent; color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,.2); background: rgba(255,255,255,.04); }
        .btn-ai {
          background: rgba(0,229,192,.12); color: var(--accent2);
          border: 1px solid rgba(0,229,192,.3);
        }
        .btn-ai:hover { background: rgba(0,229,192,.22); border-color: rgba(0,229,192,.6); }
        .ai-spark { font-size: 1rem; }
        .btn-lg { padding: .9rem 2rem; font-size: 1rem; }

        /* ── HERO CODE CARD ───────────────────────── */
        .hero-card-wrap {
          flex: 0 0 380px; z-index: 1;
          animation: fadeUp .8s .2s ease both;
        }
        .hero-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
        }
        .card-header {
          display: flex; align-items: center; gap: 6px;
          padding: .75rem 1rem;
          background: rgba(255,255,255,.03);
          border-bottom: 1px solid var(--border);
        }
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green { background: #28c840; }
        .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .card-tab { margin-left: .5rem; font-family: var(--font-mono); font-size: .75rem; color: var(--muted); }
        .card-code {
          padding: 1.5rem; font-family: var(--font-mono); font-size: .82rem;
          line-height: 1.8; color: #c9d1d9; white-space: pre;
        }
        .card-footer {
          padding: .6rem 1rem;
          background: rgba(0,229,192,.05);
          border-top: 1px solid rgba(0,229,192,.1);
          font-size: .75rem; color: var(--accent2);
          display: flex; align-items: center; gap: .5rem;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent2);
          animation: pulse 2s infinite;
        }

        /* ── SECTIONS ─────────────────────────────── */
        .section { padding: 6rem 4rem; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-size: .75rem; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: .75rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800;
          letter-spacing: -.02em; line-height: 1.15; margin-bottom: 1.5rem; color: var(--text);
        }
        .section-title em { font-style: italic; color: var(--accent2); }

        /* ── ABOUT ────────────────────────────────── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .about-text p { margin-bottom: 1rem; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .stat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 1.5rem;
          display: flex; flex-direction: column; gap: .25rem;
          transition: border-color .2s;
        }
        .stat-card:hover { border-color: rgba(109,92,255,.4); }
        .stat-n {
          font-size: 2.4rem; font-weight: 800; letter-spacing: -.03em;
          background: linear-gradient(135deg, var(--text), var(--muted));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-l { font-size: .8rem; color: var(--muted); font-weight: 500; }

        /* ── SKILLS ───────────────────────────────── */
        .skills-section { background: var(--bg2); }
        .skills-grid {
          display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem;
        }
        .skill-pill {
          display: flex; align-items: center; gap: .5rem;
          padding: .6rem 1.2rem;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 100px; font-size: .875rem; font-weight: 500; color: var(--text);
          transition: border-color .2s, background .2s;
        }
        .skill-pill:hover { border-color: rgba(109,92,255,.5); background: rgba(109,92,255,.08); }
        .skill-icon { font-size: 1rem; }

        /* ── PROJECTS ─────────────────────────────── */
        .projects-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem; margin-top: 2rem;
        }
        .project-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color .2s, transform .2s;
        }
        .project-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .project-bar { height: 4px; width: 100%; }
        .project-title {
          font-size: 1.15rem; font-weight: 700; padding: 1.5rem 1.5rem .5rem;
          color: var(--text);
        }
        .project-desc {
          font-size: .875rem; padding: 0 1.5rem; flex: 1; margin-bottom: 1rem;
          line-height: 1.7;
        }
        .project-tags {
          display: flex; flex-wrap: wrap; gap: .4rem; padding: 0 1.5rem 1rem;
        }
        .tag {
          padding: .25rem .75rem; border-radius: 100px;
          background: rgba(109,92,255,.1); border: 1px solid rgba(109,92,255,.25);
          font-size: .73rem; font-weight: 600; color: #a89dff; letter-spacing: .04em;
        }
        .project-link {
          padding: 1rem 1.5rem; font-size: .8rem; font-weight: 600;
          color: var(--accent); border-top: 1px solid var(--border);
          transition: color .2s;
        }
        .project-link:hover { color: var(--accent2); }

        /* ── AI CTA ───────────────────────────────── */
        .ai-cta-section {
          padding: 6rem 4rem;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109,92,255,.1) 0%, transparent 70%);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          text-align: center; position: relative; overflow: hidden;
        }
        .ai-cta-inner { max-width: 640px; margin: 0 auto; position: relative; }
        .ai-cta-glow {
          position: absolute; width: 600px; height: 300px;
          background: rgba(0,229,192,.06); border-radius: 50%;
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          filter: blur(60px); pointer-events: none;
        }
        .ai-badge {
          display: inline-block; margin-bottom: 1.25rem;
          padding: .35rem 1rem; border-radius: 100px;
          background: rgba(0,229,192,.1); border: 1px solid rgba(0,229,192,.3);
          font-size: .75rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: var(--accent2);
        }
        .ai-cta-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; letter-spacing: -.02em;
          color: var(--text); margin-bottom: 1rem;
        }
        .ai-cta-sub { color: var(--muted); margin-bottom: 2rem; }

        /* ── CONTACT ──────────────────────────────── */
        .contact-inner { text-align: center; max-width: 600px; margin: 0 auto; }
        .contact-sub { margin-bottom: 2rem; font-size: 1.05rem; }
        .social-links {
          display: flex; justify-content: center; align-items: center; gap: .75rem;
          margin-top: 1.5rem; font-size: .9rem;
        }
        .social-links a { color: var(--muted); transition: color .2s; }
        .social-links a:hover { color: var(--text); }
        .social-links span { color: var(--border); }

        /* ── FOOTER ───────────────────────────────── */
        .footer {
          padding: 2rem 4rem; border-top: 1px solid var(--border);
          display: flex; justify-content: center; gap: .5rem;
          font-size: .8rem; color: var(--muted);
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width: 900px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .hero { flex-direction: column; padding: 6rem 1.5rem 3rem; gap: 3rem; }
          .hero-card-wrap { flex: unset; width: 100%; }
          .section { padding: 4rem 1.5rem; }
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .ai-cta-section { padding: 4rem 1.5rem; }
          .footer { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}