import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import Groq from "groq-sdk"; // Using the installed Groq SDK

// Initialize Groq client
// dangerouslyAllowBrowser: true is required to run directly on the frontend
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! ✦ I'm Mehwish's AI assistant. Feel free to ask me anything about her skills, projects, or background!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll logic when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // System instructions to guide the AI's persona
      const systemMessage = {
        role: "system",
        content: "You are an AI assistant representing Mehwish. Answer questions professionally about her skills, projects (like SignVerse and SnapBook), and tech stack based on the user's queries."
      };

      // Call Groq via the official SDK syntax
      const chatCompletion = await groq.chat.completions.create({
        messages: [systemMessage, ...updatedMessages],
        model: "llama-3.3-70b-versatile", // Fast, high-quality model
        temperature: 0.7,
        max_tokens: 1024,
      });

      // Extract response content safely from the Groq structure
      const aiReply = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);

    } catch (error) {
      console.error("Groq SDK connection error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble connecting to the Groq API. Please check your internet connection and API key configuration!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-enhanced-root">
      {/* ── CHAT PAGE NAV ── */}
      <nav className="chat-nav">
        <Link to="/" className="back-link">
          ← Back to Overview
        </Link>
        <div className="chat-logo">&lt;<span>dev</span>/&gt;</div>
      </nav>

      {/* ── MAIN CHAT AREA ── */}
      <main className="chat-main-interface">
        <div className="chat-interface-header">
          <span className="ai-status-badge">✦ AI Core Interface</span>
          <h1>Conversation with Mehwish-AI</h1>
          <p>Powered by real-time insights from Groq Cloud</p>
        </div>

        {/* The Message Box */}
        <div className="messages-stream-container">
          {messages.map((msg, index) => (
            // Hide the system prompt from the user interface
            msg.role !== "system" && (
              <div key={index} className={`message-wrapper ${msg.role === "user" ? "user-wrapper" : "ai-wrapper"}`}>
                <div className="message-bubble-enhanced">
                  {msg.content}
                </div>
              </div>
            )
          ))}
          
          {/* Loading bubble animation */}
          {loading && (
            <div className="message-wrapper ai-wrapper">
              <div className="message-bubble-enhanced loading-bubble">
                <span className="dot-blink">.</span>
                <span className="dot-blink">.</span>
                <span className="dot-blink">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* The Input Form */}
        <form onSubmit={sendMessage} className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about SignVerse, SnapBook, or her tech stack..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "Thinking..." : "Send ✦"}
          </button>
        </form>
      </main>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .chat-enhanced-root {
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
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 4rem;
          border-bottom: 1px solid var(--border);
        }
        
        .back-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--accent2); }

        .chat-logo {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -.01em;
        }
        .chat-logo span { color: var(--accent); }

        .chat-main-interface {
          flex: 1;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .chat-interface-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .chat-interface-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0.5rem 0;
          color: var(--text);
        }

        .chat-interface-header p {
          font-size: 0.85rem;
          color: var(--muted);
        }

        .ai-status-badge {
          display: inline-block;
          padding: .25rem .75rem;
          border-radius: 100px;
          background: rgba(0,229,192,.1);
          border: 1px solid rgba(0,229,192,.3);
          font-size: .7rem;
          font-weight: 700;
          color: var(--accent2);
          text-transform: uppercase;
        }

        .messages-stream-container {
          flex: 1;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          overflow-y: auto;
          height: 450px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .message-wrapper { display: flex; width: 100%; }
        .ai-wrapper { justify-content: flex-start; }
        .user-wrapper { justify-content: flex-end; }

        .message-bubble-enhanced {
          max-width: 75%;
          padding: 0.85rem 1.25rem;
          border-radius: 14px;
          font-size: 0.95rem;
          line-height: 1.6;
          white-space: pre-line; 
        }

        .ai-wrapper .message-bubble-enhanced {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          border-bottom-left-radius: 2px;
        }

        .user-wrapper .message-bubble-enhanced {
          background: linear-gradient(135deg, var(--accent), #5848d9); 
          color: white;
          border-bottom-right-radius: 2px;
        }

        .loading-bubble { display: flex; gap: 3px; padding: 1rem 1.5rem; }
        .dot-blink {
          font-weight: bold;
          font-size: 1.2rem;
          line-height: 0.5;
          animation: blink 1.4s infinite both;
          color: var(--accent2);
        }
        .dot-blink:nth-child(2) { animation-delay: .2s; }
        .dot-blink:nth-child(3) { animation-delay: .4s; }

        @keyframes blink { 0%, 100% { opacity: .2; } 20% { opacity: 1; } }

        .chat-input-area {
          display: flex;
          gap: 0.75rem;
        }

        .chat-input-area input {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1rem;
          color: var(--text);
          font-family: var(--font-head);
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }

        .chat-input-area input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .chat-input-area button {
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0 1.5rem;
          font-family: var(--font-head);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }

        .chat-input-area button:hover:not(:disabled) { background: #5848d9; }
        .chat-input-area button:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 600px) {
          .chat-nav { padding: 1rem; }
          .chat-main-interface { padding: 1rem; }
          .messages-stream-container { height: 380px; }
          .message-bubble-enhanced { max-width: 85%; }
        }
      `}</style>
    </div>
  );
}

export default Chatbot;