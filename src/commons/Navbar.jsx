import { Link } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';


const Navbar = () => {


  return (
    <div>
      <nav className='container'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/show-creators'>Show Creators</Link>
      </nav>
    </div>
  )

}

export default Navbar;