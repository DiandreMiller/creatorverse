import { useState } from "react";
import axios from "axios";

const AddCreator = () => {
    const URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: "",
        imageURL: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddACreator = async (event) => {
        event.preventDefault(); 
        try {
            const { data } = await axios.post(
                `${URL}/rest/v1/creators`,
                {
                    ...formData,
                    create_at: new Date().toISOString() 
                },
                {
                    headers: {
                        apikey: API_KEY,
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation"
                    }
                }
            );

            console.log("data:", data);
            alert(`${data[0].name} has been added`);

            setFormData({
                name: "",
                description: "",
                url: "",
                imageURL: ""
            });
        } catch (error) {
            console.error("Error inserting Data:", error.response?.data || error.message);
            alert("Failed to add creator");
        }
    };

    return (
        <div>
            <h1 style={{ color: "green" }}>This page is to add a creator</h1>
            <form onSubmit={handleAddACreator} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="url"
                    placeholder="URL"
                    value={formData.url}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="imageURL"
                    placeholder="Image URL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;