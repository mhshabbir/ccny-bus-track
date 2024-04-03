import React from 'react'

const navbar = () => {
  return (
    <div className='body'>
      <ul class="nav-links">
        <li><a href="Home.html">Home</a></li>
        <li class="center"><a href="PublicSafety.html">Public Safety</a></li>
        <li class="logo"><img src="ccnybuslogo.png" alt="CCNY Bus Logo" /></li> <!-- Logo added here -->
        <li class="upward"><a href="MyQRCode.html">My QR Code</a></li>
        <li class="forward"><a href="LoginSignup.html">Login/Signup</a></li>
    </ul>
    </div>
  )
}

export default navbar

