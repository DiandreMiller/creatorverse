import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css";

const About = () => {
  return (
    <main className="container" style={{ position: "relative", overflow: "hidden" }}>
      {/* Cosmic background layers */}
      <div className="cosmic-bg" aria-hidden="true" />
      <div className="starry-overlay" aria-hidden="true" />

      <article
        style={{
          marginTop: "2rem",
          marginBottom: "3rem",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "2rem",
        }}
      >
        <header style={{ textAlign: "center" }}>
          <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>About</h1>
          <p style={{ opacity: 0.9 }}>✨ Learn more about what this app does ✨</p>
        </header>

        <section style={{ marginTop: "1.5rem", lineHeight: "1.7" }}>
          <p>
            Welcome to <strong>CreatorVerse</strong> — a space built to celebrate
            and showcase talented content creators across YouTube and beyond.
          </p>
          <p>
            With this app, you can add your favorite creators by submitting their
            channel details, description, and avatar. Once added, creators are
            displayed in a sleek grid with automatic previews, making it easy to
            explore and discover new talent.
          </p>
          <p>
            Whether you’re a fan looking to keep track of your favorite channels or
            a curator building a hub of amazing content, <em>CreatorVerse</em> is
            here to help. 🌌
          </p>
        </section>
      </article>
    </main>
  );
};

export default About;