import axios from "axios";

const AddCreator = () => {
    const URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleAddACreator = async () => {
        try {
            const { data } = await axios.post(
                `${URL}/rest/v1/creators`,
                {
                    name: 'Kyle Kulinski',
                    description: 'American Political YouTuber',
                    url: 'https://www.youtube.com/@SecularTalk',
                    imageURL: 'https://yt3.googleusercontent.com/ytc/AIdro_mP1aza51ezNHZdlu-31Djm4ahXXq4nvFfPd_Vsi6FjpYg=s160-c-k-c0x00ffffff-no-rj',
                    create_at: new Date().toISOString() // ✅ matches your DB column name
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
        } catch (error) {
            console.error("Error inserting Data:", error.response?.data || error.message);
            alert("Failed to add creator");
        }
    };

    return (
        <div>
            <h1 style={{ color: "green" }}>This page is to add a creator</h1>
            <button onClick={handleAddACreator}>Add a creator</button>
        </div>
    );
};

export default AddCreator;