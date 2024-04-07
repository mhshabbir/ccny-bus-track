import React from 'react'
import './style.css'

const navbar = () => {
  return (
    // <div className='body'>
    //   <ul className="nav-links">
    //     <li><a href="Home.html">Home</a></li>
    //     <li className="center"><a href="PublicSafety.html">Public Safety</a></li>
    //     <li className="logo"><img src="ccnybuslogo.png" alt="CCNY Bus Logo" /></li> 
    //     <li className="upward"><a href="MyQRCode.html">My QR Code</a></li>
    //     <li className="forward"><a href="LoginSignup.html">Login/Signup</a></li>
    // </ul>
    // </div>
    <nav className="navbar">
      <a href="/">Home</a>
      <a href="/publicsafety">Public Safety</a>
      <a href="/ccny">
        <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
      </a>
      <a href="/contact">My QR Code</a>
      <a href="/signup">Login/Signup</a>
    </nav>
  )
}

export default navbar

