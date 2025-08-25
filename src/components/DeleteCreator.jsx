import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//Delete Creator
const DeleteCreator = ({ creatorId: propId, onDeleted }) => {
  const { creatorId: routeId } = useParams();
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const idToDelete = propId || routeId; 

  const deleteACreator = async () => {
    if (!idToDelete) {
      alert("Missing creator ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this creator?")) {
      try {
        await axios.delete(`${URL}/rest/v1/creators?id=eq.${idToDelete}`, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        alert("Creator deleted successfully");
        if (onDeleted) {
          onDeleted(); 
        } else {
          navigate("/show-creators"); 
        }
      } catch (error) {
        console.error("Error deleting creator:", error.response?.data || error.message);
        alert("Failed to delete creator");
      }
    }
  };

  return (
    <button onClick={deleteACreator} style={{ color: "red" }}>
      Delete
    </button>
  );
};

export default DeleteCreator;