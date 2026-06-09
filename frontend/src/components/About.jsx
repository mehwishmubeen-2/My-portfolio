export default function About() {
  return (
    <section id="about">
      <style>{`
        #about .about-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 5rem;
          align-items: start;
          max-width: 900px;
        }
        #about .about-text p + p {
          margin-top: 1.25rem;
        }
        #about .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        #about .stat-box {
          border: 1px solid var(--border);
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        #about .stat-box:hover {
          border-color: rgba(200,169,110,0.35);
        }
        #about .stat-num {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        #about .stat-lbl {
          font-size: 0.72rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        @media (max-width: 768px) {
          #about .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      <div className="divider" />
      <span className="tag">About Me</span>
      <h2 className="section-title">
        Crafting Intelligence,<br />
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>One Line at a Time</span>
      </h2>

      <div className="about-grid">
        <div className="about-text">
          <p className="section-sub" style={{ marginBottom: '1.25rem' }}>
            I'm Mehwish Mubeen, an AI Engineer &amp; Full-Stack Developer based in Lahore, Pakistan.
            I build intelligent applications that merge cutting-edge AI with clean, user-focused interfaces.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '0.95rem' }}>
            From RAG-powered document chatbots to distributed parallel computing engines, I enjoy turning
            complex problems into elegant solutions. My stack spans Python AI backends, React frontends, and
            cloud deployments.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '0.95rem', marginTop: '1.25rem' }}>
            I'm driven by deep curiosity for how large language models work under the hood — and how to make
            them practical, fast, and accessible for real users.
          </p>
        </div>

        <div className="about-stats">
          {[
            { num: '5+',  lbl: 'Projects build' },
            { num: 'RAG', lbl: 'AI Speciality' },
            { num: 'LHR', lbl: 'Based in Lahore' },
          ].map(({ num, lbl }) => (
            <div className="stat-box" key={lbl}>
              <div className="stat-num">{num}</div>
              <div className="stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}