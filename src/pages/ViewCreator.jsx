import { useState, useEffect } from "react";
import axios  from "axios";
import { useParams, Link } from "react-router-dom";
import EditCreator from "./EditCreator";

const ViewCreator = () => {

    const { creatorId } = useParams()
    const URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [displaySingleCreator, setDisplaySingleCreator] = useState(null);
    const [editing, setEditing] = useState(false);

    console.log('creatorId:', creatorId);
    useEffect(() => {

        const fetchCreator = async () => {
            try {
                const { data } = await axios.get(
                    `${URL}/rest/v1/creators?id=eq.${creatorId}&select=name,description,url,imageURL`,
                    {
                        headers: {
                            apikey: API_KEY,
                            Authorization: `Bearer ${API_KEY}`
                        }
                    }
                );
                setDisplaySingleCreator(data[0] || null);;
                console.log('single Creator:', data);
            } catch (error) {
                console.error('Error fetching single creator:', error);
                
            }
        }
        fetchCreator();
    },[URL, API_KEY, creatorId]);

    if (!displaySingleCreator) {
        return <p>Loading…</p>;
    }

    return (
        <div>
          <h1 style={{ color: 'pink' }}>This page is to view a creator</h1>
      
          {!editing ? (
            <>
              <h3>{displaySingleCreator.name}</h3>
              <img src={displaySingleCreator.imageURL} alt={displaySingleCreator.name} />
              <br />
              <Link to={displaySingleCreator.url} target="_blank" rel="noopener noreferrer">
                <button style={{ color: 'green' }}>Visit YouTube Page</button>
              </Link>
              <br /><br />
              <button onClick={() => setEditing(true)}>Edit Creator</button>
            </>
          ) : (
            <EditCreator
              creatorId={creatorId}
              creator={displaySingleCreator}
              onCancel={() => setEditing(false)}
              onSave={(updated) => {
                setDisplaySingleCreator(updated);
                setEditing(false);
              }}
            />
          )}
        </div>
      );
}

export default ViewCreator;