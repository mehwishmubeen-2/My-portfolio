import { useEffect, useRef, useState } from "react";

// Animated word cycling
const ROLES = ["MERN STACK Developer", "AI/ML Engineer", "React Specialist", "Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const canvasRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth, H = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,169,110,${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines between close particles
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,169,110,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Radial glow behind content */
        .hero-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          padding: calc(var(--nav-h) + 4rem) clamp(1.5rem, 6vw, 5rem) 5rem;
        }

        .hero-greeting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.2s ease forwards;
        }
        .hero-greeting-line {
          width: 32px;
          height: 1px;
          background: var(--accent);
        }
        .hero-greeting span {
          font-size: 0.82rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 400;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.4s ease forwards;
        }

        .hero-name span {
          color: var(--accent);
          font-style: italic;
        }

        .hero-role {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2.5vw, 1.7rem);
          font-weight: 400;
          color: var(--muted);
          margin-bottom: 2rem;
          min-height: 1.4em;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.6s ease forwards;
        }

        .hero-role .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        .hero-desc {
          font-size: 1rem;
          color: var(--muted);
          max-width: 480px;
          line-height: 1.9;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.8s ease forwards;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeSlideUp 0.8s 1s ease forwards;
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          opacity: 0;
          animation: fadeIn 1s 1.5s ease forwards;
          z-index: 1;
        }
        .hero-scroll span {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hero-scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 1.8s ease-in-out infinite;
        }

        /* Floating badge removed */

        /* Horizontal rule accent */
        .hero-hr {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          opacity: 0.2;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50%       { transform: scaleY(0.6); opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .hero-badge { display: none; }
        }
      `}</style>

      <div className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-greeting">
            <div className="hero-greeting-line" />
            <span>Hello</span>
          </div>

          <h1 className="hero-name">
            Mehwish <span>Mubeen</span>
          </h1>

          <h2 className="hero-role">
            {displayed}
            <span className="cursor" />
          </h2>

          <p className="hero-desc">
I build intelligent, performant web experiences that live at the intersection of machine learning and modern engineering. Based in Lahore — available worldwide.          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View My Work ↓
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo("contact")}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" onClick={() => scrollTo("about")}>
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>

        <div className="hero-hr" />
      </div>
    </>
  );
}