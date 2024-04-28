import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you move your styles to a separate CSS file

const Navbar = () => {
  return (
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li className="center"><Link to="/public-safety">Public Safety</Link></li>
      <li className="logo">
        <img src="ccnybuslogo.png" alt="CCNY Bus Logo" />
      </li>
      <li className="upward"><Link to="/my-qr-code">My QR Code</Link></li>
      <li className="forward"><Link to="/login-signup">Login/Signup</Link></li>
    </ul>
  );
};

export default Navbar;

