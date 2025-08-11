import { useState, useEffect } from "react";
import axios  from "axios";
import { useParams, Link } from "react-router-dom";

const ViewCreator = () => {

    const { creatorId } = useParams()
    const URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [displaySingleCreator, setDisplaySingleCreator] = useState({});

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
                setDisplaySingleCreator(data[0] || {});;
                console.log('single Creator:', data);
            } catch (error) {
                console.error('Error fetching single creator:', error);
                
            }
        }
        fetchCreator();
    },[URL, API_KEY, creatorId]);

    
    return (
        <div>
            <h1 style={{ color: 'pink' }}>This page is to view a creator</h1>
            <h3>{displaySingleCreator.name}</h3>
            <img src={displaySingleCreator.imageURL} />
            <br />
            <Link to={displaySingleCreator.url} target="_blank" rel="noopener noreferrer">
                <button style={{ color: 'green' }}>Visit YouTube Page</button>
            </Link>
        </div>
    )
}

export default ViewCreator;