export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a temporary placeholder action)");
  };

  return (
    <section id="contact">
      <div style={{ maxWidth: "600px" }}>
      <div className="divider" />
      <span className="tag">Get In Touch</span>
      <h2 className="section-title">Let's Collaborate</h2>
      <p className="section-sub">
        Have a question or want to work together? Drop a message below.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</label>
          <input 
            type="text" 
            required 
            style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem", color: "var(--text)", borderRadius: "3px", fontFamily: "var(--font-body)" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
          <input 
            type="email" 
            required 
            style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem", color: "var(--text)", borderRadius: "3px", fontFamily: "var(--font-body)" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
          <textarea 
            rows="5" 
            required 
            style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem", color: "var(--text)", borderRadius: "3px", resize: "none", fontFamily: "var(--font-body)" }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
          Send Message
        </button>
      </form>
      </div>
    </section>
  );
}