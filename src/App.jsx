import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import supabase from './client';
import './App.css'

//Pages
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import FOUROFOUR from './pages/FOUROFOUR';

//Components
import Navbar from './components/Navbar';

console.log('supabase:', supabase);

function App() {

  useEffect(() => {
    async function fetchSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        console.log('Current session:', session);
      }
    }
    fetchSession();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div>
      <h1 style={{ color: 'red' }}>This is app.js</h1>
    </div>
      <Routes>
        <Route element={<AddCreator />} path='/add-creator'/>
        <Route element={<EditCreator />} path='/edit-creator/:id'/>
        <Route element={<ShowCreators />} path='/show-creators'/>
        <Route element={<ViewCreator />} path='/view-creator/:id'/>
        <Route element={<FOUROFOUR />} path='/*'/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

