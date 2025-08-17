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
    <main className="container">
      <article>
        <header>
          <h1>Add a Creator</h1>
          <p>Provide the creator’s info and submit to save.</p>
        </header>

        <form onSubmit={handleAddACreator}>
          <fieldset>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="e.g., Coding with Amy"
                value={formData.name}
                onChange={handleChange}
                required
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

            {formData.imageURL ? (
              <figure style={{ maxWidth: 280 }}>
                <img
                  src={formData.imageURL}
                  alt="Preview"
                  style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12 }}
                />
                <figcaption>Preview</figcaption>
              </figure>
            ) : null}
          </fieldset>

          <div role="group">
            <button type="submit" aria-busy={saving}>
              {saving ? "Adding…" : "Add Creator"}
            </button>
            <button
              type="reset"
              className="secondary"
              onClick={() => setFormData({ name: "", description: "", url: "", imageURL: "" })}
              disabled={saving}
            >
              Clear
            </button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default AddCreator;