import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <main className="container">
        <article>
          <header>
            <h2>Loading creators…</h2>
          </header>
          <progress aria-busy="true" />
        </article>
      </main>
    );
  }

  return (
    <main className="container">
      <header>
        <h1>Creators</h1>
        <p>Browse and select a creator to view details.</p>
        <form role="search">
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
        <article>
          <header>
            <h3>No creators found</h3>
          </header>
          <p>Try a different search or add a new creator.</p>
        </article>
      ) : (
        <ul
          role="list"
          className="grid"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {filtered.map((creator) => (
            <li key={creator.id} style={{ listStyle: "none" }}>
              <article>
                <header>
                  <h3
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigate(creator.id)}
                  >
                    {creator.name}
                  </h3>
                  <p>{creator.description || "No description provided."}</p>
                </header>

                {creator.imageURL && (
                  <figure
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigate(creator.id)}
                  >
                    <img
                      src={creator.imageURL}
                      alt={creator.name}
                      style={{ width: "100%", maxHeight: 220, objectFit: "cover" }}
                    />
                    <figcaption>{creator.name}</figcaption>
                  </figure>
                )}

                <footer>
                  <button onClick={() => handleNavigate(creator.id)}>
                    View Creator
                  </button>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ShowCreators;