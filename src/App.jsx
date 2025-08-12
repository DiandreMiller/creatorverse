import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import './App.css'

//Pages
import AddCreator from './pages/AddCreator';
import About from './pages/About';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import FOUROFOUR from './pages/FOUROFOUR';
import Home from './pages/Home';

//Components
import Navbar from './commons/Navbar';
import Footer from './commons/Footer';

function App() {

  const [displayCreator, setDisplayCreator] = useState([]);
  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCreator = async () => {
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
        console.log('data:', data);
      } catch (error) {
        console.error("Error fetching creators:", error.response?.data || error.message);
      }
    };

    fetchCreator();
  }, [URL, API_KEY]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AddCreator />} path='/add-creator'/>
        <Route element={<About />} path='/about' />
        <Route element={<Home />} path='/' />
        <Route element={<ShowCreators displayCreator={displayCreator} />} path='/show-creators'/>
        <Route element={<ViewCreator displayCreator={displayCreator} setDisplayCreator={setDisplayCreator} />} path='/view-creator/:creatorId'/>
        <Route element={<FOUROFOUR />} path='/*'/>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;

