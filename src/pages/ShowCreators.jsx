import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css"; 

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
        console.error(
          "Error fetching creators:",
          error.response?.data || error.message
        );
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
      <main className="container cosmic-background">
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
            textAlign: "center",
          }}
        >
          <header>
            <h2>Loading creators…</h2>
          </header>
          <progress aria-busy="true" />
        </article>
      </main>
    );
  }

  return (
    <main className="container cosmic-background">
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
        <div
          className="creator-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gridTemplateRows: "none",
          }}
        >
          {filtered.map((creator) => (
            <div key={creator.id}>
              <article
                className="creator-card"
                onClick={() => handleNavigate(creator.id)}
                style={{ cursor: "pointer" }}
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
                      className="creator-image"
                      style={{ height: 220 }}
                    />
                    <figcaption style={{ marginTop: "8px", opacity: 0.86 }}>
                      {creator.name}
                    </figcaption>
                  </figure>
                )}

                <footer style={{ padding: "0 12px 12px 12px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(creator.id);
                    }}
                  >
                    View Creator
                  </button>
                </footer>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ShowCreators;