import { Link } from 'react-router-dom';

const Navbar = () => {


  return (
    <div>
        <h1>This is the Navbar</h1>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/show-creators'>Show Creators</Link>
    </div>
  )

}

export default Navbar;