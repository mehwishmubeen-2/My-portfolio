const CATEGORIES = [
  { label: 'AI / Machine Learning', skills: ['Python', 'Groq API', 'LlamaIndex', 'RAG', 'FAISS', 'Llama 3', 'Streamlit'] },
  { label: 'Frontend', skills: ['React', 'JavaScript (ES6+)', 'Vite', 'HTML5 / CSS3', 'Tailwind CSS'] },
  { label: 'Backend & Databases', skills: ['Node.js', 'Express', 'MongoDB', 'FastAPI', 'REST APIs'] },
  { label: 'Tools & DevOps', skills: ['Git & GitHub', 'Docker', 'Netlify', 'Parallel Computing', 'VS Code'] },
];

export default function Skills() {
  return (
    <section id="skills">
      <style>{`
        #skills .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
        }
        #skills .skill-cat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.75rem;
          transition: border-color 0.3s;
        }
        #skills .skill-cat:hover {
          border-color: rgba(200,169,110,0.3);
        }
        #skills .skill-cat-title {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }
        #skills .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        #skills .s-pill {
          font-size: 0.77rem;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 0.28rem 0.72rem;
          border-radius: 50px;
          transition: color 0.2s, border-color 0.2s;
        }
        #skills .s-pill:hover {
          color: var(--accent);
          border-color: rgba(200,169,110,0.4);
        }
      `}</style>

      <div className="divider" />
      <span className="tag">Expertise</span>
      <h2 className="section-title">
        Skills &amp; <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Technologies</span>
      </h2>
      <p className="section-sub">
        A curated toolkit spanning AI engineering, full-stack development, and modern DevOps practices.
      </p>

      <div className="skills-grid">
        {CATEGORIES.map(({ label, skills }) => (
          <div className="skill-cat" key={label}>
            <div className="skill-cat-title">{label}</div>
            <div className="skill-pills">
              {skills.map(s => (
                <span className="s-pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}