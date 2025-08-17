import { useState } from "react";
import axios from "axios";
import "@picocss/pico/css/pico.min.css";

const AddCreator = () => {
  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    imageURL: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddACreator = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const { data } = await axios.post(
        `${URL}/rest/v1/creators`,
        {
          ...formData,
          create_at: new Date().toISOString(),
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      alert(`${data[0].name} has been added`);
      setFormData({ name: "", description: "", url: "", imageURL: "" });
    } catch (error) {
      console.error("Error inserting Data:", error.response?.data || error.message);
      alert("Failed to add creator");
    } finally {
      setSaving(false);
    }
  };

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
        }}
      >
        <header style={{ textAlign: "center", paddingTop: "1rem" }}>
          <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>
            Add a Creator
          </h1>
          <p style={{ opacity: 0.9 }}>Provide the creator’s info and submit to save ✨</p>
        </header>

        <form onSubmit={handleAddACreator} style={{ padding: "0 1rem 1rem 1rem" }}>
          <fieldset>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="e.g., Keep It 100 Dre"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                }}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                placeholder="Short description of the channel or creator"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                }}
              />
            </label>

            <div className="grid">
              <label>
                Channel URL
                <input
                  type="url"
                  name="url"
                  placeholder="https://youtube.com/@example"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  style={{
                    backdropFilter: "blur(2px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  }}
                />
                <small>Use the full URL, including https://</small>
              </label>

              <label>
                Image URL
                <input
                  type="url"
                  name="imageURL"
                  placeholder="https://…/avatar.jpg"
                  value={formData.imageURL}
                  onChange={handleChange}
                  required
                  style={{
                    backdropFilter: "blur(2px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  }}
                />
                <small>Paste a direct image link (JPG/PNG/WebP).</small>
              </label>
            </div>

            {formData.imageURL ? (
              <figure
                style={{
                  maxWidth: 320,
                  marginTop: 16,
                  marginBottom: 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.45), 0 0 40px rgba(100,170,255,0.20), 0 0 60px rgba(255,120,200,0.14)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <img
                  src={formData.imageURL}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                  }}
                />
                <figcaption style={{ textAlign: "center", padding: "0.4rem 0", opacity: 0.85 }}>
                  Preview
                </figcaption>
              </figure>
            ) : null}
          </fieldset>

          <div role="group" style={{ marginTop: 8 }}>
            <button type="submit" aria-busy={saving}>
              {saving ? "Adding…" : "Add Creator"}
            </button>
            <button
              type="reset"
              className="secondary"
              onClick={() =>
                setFormData({ name: "", description: "", url: "", imageURL: "" })
              }
              disabled={saving}
            >
              Clear
            </button>
          </div>
        </form>
      </article>

      <StyleKeyframes />
    </main>
  );
};

export default AddCreator;

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
      @keyframes float {
        0% { transform: translateY(0px) }
        50% { transform: translateY(-8px) }
        100% { transform: translateY(0px) }
      }
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