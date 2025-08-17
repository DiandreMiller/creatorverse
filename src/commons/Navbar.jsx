import { Link } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';

const Navbar = () => {
  return (
    <header className="container-fluid">
      <nav className="container">
        <ul>
          <li><strong>CreatorVerse</strong></li>
        </ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/show-creators">Show Creators</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;