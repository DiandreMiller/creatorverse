import { useState, useEffect } from "react";
import axios from "axios";
import "@picocss/pico/css/pico.min.css";
import "../components/cosmic.css";

const EditCreator = ({ creatorId, creator, onCancel, onSave }) => {
  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [formData, setFormData] = useState({
    id: creator?.id ?? "",
    name: creator?.name ?? "",
    description: creator?.description ?? "",
    url: creator?.url ?? "",
    imageURL: creator?.imageURL ?? "",
  });
  const [saving, setSaving] = useState(false);

  // Keep form in sync if the parent updates "creator"
  useEffect(() => {
    setFormData({
      id: creator?.id ?? "",
      name: creator?.name ?? "",
      description: creator?.description ?? "",
      url: creator?.url ?? "",
      imageURL: creator?.imageURL ?? "",
    });
  }, [creator]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e?.preventDefault?.();

    const rowId = formData.id || creator?.id || creatorId;
    if (!rowId) {
      alert("Missing creator ID");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...formData, id: rowId };

      const { data } = await axios.put(
        `${URL}/rest/v1/creators?id=eq.${rowId}`,
        payload,
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      onSave?.(data?.[0] ?? payload); 
    } catch (error) {
      console.error("Error updating creator:", error.response?.data || error.message);
      alert("Failed to update creator");
    } finally {
      setSaving(false);
    }
  };

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
        <header style={{ textAlign: "center" }}>
          <h1 style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}>
            Edit Creator
          </h1>
          <p style={{ opacity: 0.9 }}>Update the details and save your changes.</p>
        </header>

        <form onSubmit={handleUpdate}>
          <fieldset>
            {/* Name */}
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="e.g., Keep It 100 Dre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            {/* Description */}
            <label>
              Description
              <textarea
                name="description"
                placeholder="Short description of the channel or creator"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
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
                />
                <small>Paste a direct image link (JPG/PNG/WebP).</small>
              </label>
            </div>

            {/* Live preview */}
            {formData.imageURL ? (
              <figure style={{ maxWidth: 280, marginTop: "0.75rem" }}>
                <img
                  src={formData.imageURL}
                  alt="Preview"
                  className="creator-image" 
                  style={{ height: 200 }}
                />
                <figcaption>Preview</figcaption>
              </figure>
            ) : null}
          </fieldset>

          <div role="group" style={{ marginTop: "0.75rem" }}>
            <button type="submit" aria-busy={saving} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default EditCreator;