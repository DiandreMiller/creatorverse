import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowCreators = () => {

    const [displayCreator, setDisplayCreator] = useState([]);
    const URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCreators = async () => {
        try {
          const { data } = await axios.get(
            `${URL}/rest/v1/creators?select=*`,
            {
              headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
  
          setDisplayCreator(data);
        } catch (error) {
          console.error("Error fetching creators:", error.response?.data || error.message);
        }
      };
  
      fetchCreators();
    }, [URL, API_KEY]);


        const handleNavigate = (id) => {
            navigate(`/view-creator/${id}`)
        }
       
        
  
  
    return (
      <div>
        <h1>Home</h1>
        {displayCreator.length > 0 ? (
          <ul>
            {displayCreator.map((creator) => (
              <li key={creator.id}>
                <h3 onClick={() => handleNavigate(creator.id)}>{creator.name}</h3>
                <p>{creator.description}</p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                  {creator.url}
                </a>
                <br />
                <img
                  src={creator.imageURL}
                  alt={creator.name}
                  style={{ width: "100px", marginTop: "10px" }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No creators found.</p>
        )}
      </div>
    );
  
}

export default ShowCreators;