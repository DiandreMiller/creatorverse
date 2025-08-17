import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@picocss/pico/css/pico.min.css";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(`${URL}/rest/v1/creators?select=*`, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        });
        setCreators(data || []);
      } catch (error) {
        console.error("Error fetching creators:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, [URL, API_KEY]);

  const handleNavigate = (id) => navigate(`/view-creator/${id}`);

  const filtered = useMemo(() => {
    if (!q.trim()) return creators;
    const s = q.toLowerCase();
    return creators.filter(
      (c) =>
        c.name?.toLowerCase().includes(s) ||
        c.description?.toLowerCase().includes(s)
    );
  }, [q, creators]);

  if (loading) {
    return (
      <main className="container" style={{ position: "relative", overflow: "hidden" }}>
        {/* Cosmic background */}
        <BackgroundVibes />

        <article style={{ textAlign: "center", marginTop: "3rem" }}>
          <header>
            <h2 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>
              Loading creators…
            </h2>
          </header>
          <progress aria-busy="true" />
        </article>
      </main>
    );
  }

  return (
    <main className="container" style={{ position: "relative", overflow: "hidden" }}>
      {/* Cosmic background */}
      <BackgroundVibes />

      <header style={{ textAlign: "center", paddingTop: "1.25rem", marginBottom: "0.75rem" }}>
        <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>Creators</h1>
        <p style={{ opacity: 0.9 }}>Browse and select a creator to view details ✨</p>

        <form role="search" style={{ maxWidth: 560, margin: "0 auto" }}>
          <input
            type="search"
            placeholder="Search creators…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search creators"
            style={{
              backdropFilter: "blur(2px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}
          />
        </form>
      </header>

      {filtered.length === 0 ? (
        <article style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <header>
            <h3>No creators found</h3>
          </header>
          <p>Try a different search or add a new creator.</p>
        </article>
      ) : (
        <ul
          role="list"
          className="grid"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((creator) => (
            <li key={creator.id} style={{ listStyle: "none" }}>
              <article
                style={{
                  height: "100%",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate(creator.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 36px rgba(0,0,0,0.45), 0 0 30px rgba(120,180,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
                }}
              >
                <header style={{ padding: "12px 12px 0 12px" }}>
                  <h3 style={{ marginBottom: "0.25rem" }}>{creator.name}</h3>
                  <p style={{ marginTop: 0, opacity: 0.9 }}>
                    {creator.description || "No description provided."}
                  </p>
                </header>

                {creator.imageURL && (
                  <figure style={{ padding: "12px", paddingTop: 0 }}>
                    <img
                      src={creator.imageURL}
                      alt={creator.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                      }}
                    />
                    <figcaption style={{ marginTop: "8px", opacity: 0.86 }}>
                      {creator.name}
                    </figcaption>
                  </figure>
                )}

                <footer style={{ padding: "0 12px 12px 12px" }}>
                  <button onClick={() => handleNavigate(creator.id)}>
                    View Creator
                  </button>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      )}

      {/* Animations & helpers */}
      <StyleKeyframes />
    </main>
  );
};

export default ShowCreators;

/* --- Helpers for background/animations  --- */

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