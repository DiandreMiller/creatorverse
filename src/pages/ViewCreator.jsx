import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import EditCreator from "../components/EditCreator";
import DeleteCreator from "../components/DeleteCreator";

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
          // include id; quote imageURL due to camelCase column
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
        console.error("Error fetching single creator:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [URL, API_KEY, creatorId]);

  if (loading) {
    return (
      <main className="container">
        <article>
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
      <main className="container">
        <article>
          <header>
            <h2>Creator not found</h2>
          </header>
          <p>We couldn’t find this creator.</p>
          <nav>
            <ul>
              <li><Link to="/show-creators">Back to list</Link></li>
            </ul>
          </nav>
        </article>
      </main>
    );
  }

  return (
    <main className="container">
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link to="/show-creators">Creators</Link></li>
          <li>{creator.name}</li>
        </ul>
      </nav>

      {!editing ? (
        <article>
          <header>
            <h2>{creator.name}</h2>
            <p>{creator.description || "No description provided."}</p>
          </header>

          <div className="grid">
            <figure>
              <img
                src={creator.imageURL}
                alt={creator.name}
                style={{ maxHeight: 360, objectFit: "cover", width: "100%" }}
              />
              <figcaption>{creator.name}</figcaption>
            </figure>

            <section>
              <p>
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  Visit YouTube Page
                </a>
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => setEditing(true)}>Edit Creator</button>

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
        <article>
          <header>
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

          <footer>
            <small>
              <button className="secondary" onClick={() => setEditing(false)}>Cancel</button>
            </small>
          </footer>
        </article>
      )}
    </main>
  );
};

export default ViewCreator;