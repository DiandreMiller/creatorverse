import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

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


//App.js
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AddCreator />} path='/add-creator'/>
        <Route element={<About />} path='/about' />
        <Route element={<Home />} path='/' />
        <Route element={<ShowCreators />} path='/show-creators'/>
        <Route element={<ViewCreator  />} path='/view-creator/:creatorId'/>
        <Route element={<FOUROFOUR />} path='/*'/>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;

