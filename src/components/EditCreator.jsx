import { useState, useEffect } from "react";
import axios from "axios";

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

  const handleUpdate = async () => {
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
      onSave?.(data[0]);
    } catch (error) {
      console.error("Error updating creator:", error.response?.data || error.message);
      alert("Failed to update creator");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Edit Creator</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="url" value={formData.url} onChange={handleChange} placeholder="YouTube URL" />
      <input name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image URL" />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleUpdate} disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <button onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCreator;