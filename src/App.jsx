import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

//Pages
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import FOUROFOUR from './pages/FOUROFOUR';

function App() {
  return (
    <BrowserRouter>
      <div>
      <h1 style={{ color: 'red' }}>This is app.js</h1>
    </div>
      <Routes>
        <Route element={<AddCreator />} path='/add-creator'/>
        <Route element={<EditCreator />} path='/edit-creator'/>
        <Route element={<ShowCreators />} path='/show-creators'/>
        <Route element={<ViewCreator />} path='/view-creator'/>
        <Route element={<FOUROFOUR />} path='/*'/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;