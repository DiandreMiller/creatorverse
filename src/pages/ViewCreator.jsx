import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css";
import EditCreator from "../components/EditCreator";
import DeleteCreator from "../components/DeleteCreator";

//This is to show a single creator
const ViewCreator = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();

  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [creator, setCreator] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/rest/v1/creators?id=eq.${creatorId}&select=id,name,description,url,%22imageURL%22`,
          {
            headers: {
              apikey: API_KEY,
              Authorization: `Bearer ${API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        setCreator(data[0] || null);
      } catch (error) {
        console.error(
          "Error fetching single creator:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [URL, API_KEY, creatorId]);

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
            <h2>Loading creator…</h2>
          </header>
          <progress aria-busy="true" />
        </article>
      </main>
    );
  }

  if (!creator) {
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
          }}
        >
          <header>
            <h2>Creator not found</h2>
            <p>We couldn’t find this creator.</p>
          </header>
          <p>
            <Link to="/show-creators" role="button" className="secondary">
              ← Back to all creators
            </Link>
          </p>
        </article>
      </main>
    );
  }

  return (
    <main className="container cosmic-background">
      <nav aria-label="breadcrumb" style={{ marginTop: "1rem" }}>
        <ul>
          <li><Link to="/show-creators">Creators</Link></li>
          <li>{creator.name}</li>
        </ul>
      </nav>

      {!editing ? (
        <article
          style={{
            marginTop: "1rem",
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
            <h2 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>
              {creator.name}
            </h2>
            <p style={{ opacity: 0.9 }}>
              {creator.description || "No description provided."}
            </p>
          </header>

          <div className="grid">
            <figure style={{ margin: 0 }}>
              <img
                src={creator.imageURL}
                alt={creator.name}
                className="creator-image"
                style={{ width: "100%", maxHeight: 360, objectFit: "cover" }}
              />
              <figcaption style={{ textAlign: "center", marginTop: "0.5rem" }}>
                {creator.name}
              </figcaption>
            </figure>

            {/* Right column: stacked, aligned buttons */}
            <section>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  maxWidth: "280px",
                }}
              >
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  style={{ width: "100%" }}
                >
                  Visit YouTube Page
                </a>

                <button
                  onClick={() => setEditing(true)}
                  style={{ width: "100%" }}
                >
                  Edit Creator
                </button>

                <DeleteCreator
                  creatorId={creator.id}
                  onDeleted={() => navigate("/show-creators")}
                />
              </div>

              <p style={{ marginTop: "1rem" }}>
                <Link to="/show-creators">← Back to all creators</Link>
              </p>
            </section>
          </div>
        </article>
      ) : (
        <article
          style={{
            marginTop: "1rem",
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
            <h2>Edit {creator.name}</h2>
          </header>

          <EditCreator
            creatorId={creatorId}
            creator={creator}
            onCancel={() => setEditing(false)}
            onSave={(updated) => {
              setCreator(updated);
              setEditing(false);
            }}
          />

          <footer style={{ marginTop: "0.75rem", textAlign: "center" }}>
            <button className="secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </footer>
        </article>
      )}
    </main>
  );
};

export default ViewCreator;