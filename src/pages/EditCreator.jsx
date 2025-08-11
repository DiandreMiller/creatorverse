import { useState } from "react";
import axios from "axios";

const EditCreator = ({ displayCreator, setDisplayCreator }) => {
  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    imageURL: "",
  });

  const handleSelectChange = (event) => {
    const creatorId = event.target.value;
    setSelectedId(creatorId);

    const singleCreator = displayCreator.find(
      (creator) => creator.id === creatorId
    );
    if (singleCreator) {
      setFormData({
        name: singleCreator.name,
        description: singleCreator.description,
        url: singleCreator.url,
        imageURL: singleCreator.imageURL,
      });
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // PUT request to update creator
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${URL}/rest/v1/creators?id=eq.${selectedId}`,
        formData,
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      setDisplayCreator((prev) =>
        prev.map((creator) =>
          creator.id === selectedId ? { ...creator, ...formData } : creator
        )
      );

      alert("Creator updated successfully!");
    } catch (error) {
      console.error(
        "Error updating creator:",
        error.response?.data || error.message
      );
      alert("Failed to update creator");
    }
  };

  return (
    <div>
      <h1 style={{ color: "orange" }}>Edit a Creator</h1>

      <select value={selectedId} onChange={handleSelectChange}>
        <option value="">-- Select Creator --</option>
        {displayCreator.map((creator) => (
          <option key={creator.id} value={creator.id}>
            {creator.name}
          </option>
        ))}
      </select>

      {selectedId && (
        <div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="YouTube URL"
          />
          <input
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <button onClick={handleUpdate}>Update Creator</button>
        </div>
      )}
    </div>
  );
};

export default EditCreator;