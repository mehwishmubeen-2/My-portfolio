import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Static backup array in case your MongoDB database is empty or loading
const FALLBACK_PROJECTS = [
  {
    _id: "static-1",
    title: "Parallel & Distributed Computing Engine",
    desc: "A high-performance computing system utilizing multi-threading, distributed nodes, and advanced data structures to process complex algorithms in parallel.",
    tags: ["Python", "Docker", "DevOps", "Algorithms"],
    accent: "#2563eb",
    githubLink: "https://github.com",
    liveLink: "https://google.com"
  },
  {
    _id: "static-2",
    title: "SnapBook",
    desc: "A service-based photographer booking platform featuring SEO-optimized landing pages, real-time availability, and an AI assistant for client inquiries.",
    tags: ["React / Next.js", "Node.js", "OpenAI", "MongoDB"],
    accent: "#f43f5e",
    githubLink: "https://github.com",
    liveLink: "https://google.com"
  },
  {
    _id: "static-3",
    title: "SignVerse",
    desc: "An accessibility-focused web application that leverages machine learning models to translate sign language gestures into text in real-time.",
    tags: ["JavaScript (ES6+)", "Machine Learning", "Python", "HTML5 / CSS3"],
    accent: "#7c3aed",
    githubLink: "https://github.com",
    liveLink: "https://google.com"
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");

  // Fetch real-time projects uploaded to MongoDB
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (error) {
        console.error("Error fetching database projects, using fallbacks:", error);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extract all unique tags dynamically across all your project uploads
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags || []))];

  // Filter projects by user clicking tag chips
  const filteredProjects = selectedTag === "All" 
    ? projects 
    : projects.filter((p) => p.tags?.includes(selectedTag));

  return (
    <div className="projects-root">
      {/* ── NAVIGATION ─────────────────────────────────── */}
      <nav className="proj-nav">
        <Link to="/" className="back-home-link">
          ← Back to Overview
        </Link>
        <Link to="/chat" className="proj-nav-cta">
          <span className="pulse-dot" /> Ask AI About My Code
        </Link>
      </nav>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="proj-header">
        <p className="proj-eyebrow">Engineering Repository</p>
        <h1>All Shipped <span className="title-accent">Projects</span></h1>
        <p className="proj-subtitle">
          Explore my collection of systems, applications, and core AI architectures. 
          Filtered in real-time through my MongoDB cluster database.
        </p>
      </header>

      {/* ── DYNAMIC TAG FILTER ──────────────────────────── */}
      <div className="filter-container">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`filter-chip ${selectedTag === tag ? "chip--active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── GRID SYSTEM ─────────────────────────────────── */}
      <main className="proj-main">
        {loading ? (
          <div className="proj-loading">Querying MongoDB Engine...</div>
        ) : (
          <div className="projects-showcase-grid">
            {filteredProjects.map((proj) => (
              <div 
                key={proj._id} 
                className="showcase-card" 
                style={{ "--accent": proj.accent || "#6d5cff" }}
              >
                <div className="card-top-accent" style={{ background: proj.accent || "#6d5cff" }} />
                
                <div className="card-inner-body">
                  <h3 className="card-title">{proj.title}</h3>
                  <p className="card-desc">{proj.desc}</p>
                  
                  <div className="card-tags-row">
                    {proj.tags?.map((t) => (
                      <span key={t} className="card-tag-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="card-actions-footer">
                  <a href={proj.githubLink || "https://github.com"} target="_blank" rel="noreferrer" className="action-btn">
                    Code Base 🐙
                  </a>
                  <a href={proj.liveLink || "#"} target="_blank" rel="noreferrer" className="action-btn active-demo">
                    Live Launch 🔗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── THEME ENHANCEMENTS & SCOPED CSS ────────────── */}
      <style>{`
        .projects-root {
          --bg: #080b11;
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
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        .proj-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 4rem;
          border-bottom: 1px solid var(--border);
        }

        .back-home-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
          transition: color 0.2s;
        }
        .back-home-link:hover { color: var(--accent2); }

        .proj-nav-cta {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .5rem 1.25rem;
          background: rgba(109,92,255,.15);
          border: 1px solid rgba(109,92,255,.4);
          border-radius: 100px;
          font-size: .8rem;
          font-weight: 600;
          color: #a89dff;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent2);
          animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.4); }
        }

        .proj-header {
          text-align: center;
          max-width: 700px;
          margin: 4rem auto 2.5rem;
          padding: 0 1.5rem;
        }

        .proj-eyebrow {
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: .5rem;
        }

        .proj-header h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -.02em;
          margin-bottom: 1rem;
        }

        .title-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .proj-subtitle {
          color: var(--muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .filter-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-width: 800px;
          margin: 0 auto 3rem;
          padding: 0 1.5rem;
        }

        .filter-chip {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 0.5rem 1.1rem;
          border-radius: 100px;
          font-family: var(--font-head);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-chip:hover {
          border-color: var(--accent);
          color: var(--text);
        }

        .chip--active {
          background: rgba(109,92,255,0.15);
          border-color: var(--accent);
          color: #a89dff;
          font-weight: 600;
        }

        .proj-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .proj-loading {
          text-align: center;
          color: var(--accent2);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          margin-top: 3rem;
        }

        .projects-showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .showcase-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color .2.5s, transform .25s;
        }

        .showcase-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .card-top-accent {
          height: 4px;
          width: 100%;
        }

        .card-inner-body {
          padding: 2rem;
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text);
          letter-spacing: -.01em;
        }

        .card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .card-tag-pill {
          padding: .25rem .75rem;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: .7rem;
          color: var(--muted);
        }

        .card-actions-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.15);
        }

        .action-btn {
          text-align: center;
          padding: 1rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--muted);
          transition: color 0.2s, background 0.2s;
        }

        .action-btn:first-child {
          border-right: 1px solid var(--border);
        }

        .action-btn:hover {
          color: var(--text);
          background: rgba(255,255,255,0.02);
        }

        .action-btn.active-demo {
          color: var(--accent2);
        }
        
        .action-btn.active-demo:hover {
          background: rgba(0, 229, 192, 0.04);
        }

        @media (max-width: 768px) {
          .proj-nav { padding: 1rem 1.5rem; }
          .projects-showcase-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}