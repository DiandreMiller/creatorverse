import "@picocss/pico/css/pico.min.css";

const About = () => {
  return (
    <main className="container" style={{ position: "relative", overflow: "hidden" }}>
      {/* Cosmic background layers */}
      <BackgroundVibes />

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

      <StyleKeyframes />
    </main>
  );
};

export default About;

/* --- Helpers for the cosmic background and animations --- */

function BackgroundVibes() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(1200px 800px at 10% 10%, rgba(255,0,128,0.12), transparent), radial-gradient(1000px 700px at 90% 20%, rgba(0,150,255,0.12), transparent), radial-gradient(900px 700px at 50% 100%, rgba(120,255,120,0.10), transparent), linear-gradient(120deg, #0a0a12 0%, #0b0f2a 50%, #120a1a 100%)",
          animation: "hueshift 16s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.8), transparent 60%), radial-gradient(2px 2px at 30% 80%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(1.5px 1.5px at 50% 30%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(1.75px 1.75px at 70% 60%, rgba(255,255,255,0.8), transparent 60%), radial-gradient(1.25px 1.25px at 85% 40%, rgba(255,255,255,0.6), transparent 60%)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.6,
          animation: "twinkle 3s ease-in-out infinite alternate",
        }}
      />
    </>
  );
}

function StyleKeyframes() {
  return (
    <style>{`
      @keyframes hueshift {
        0%   { filter: hue-rotate(0deg) saturate(1) }
        100% { filter: hue-rotate(25deg) saturate(1.1) }
      }
      @keyframes twinkle {
        0%   { opacity: 0.45; transform: translateY(0px) }
        100% { opacity: 0.75; transform: translateY(-6px) }
      }
    `}</style>
  );
}