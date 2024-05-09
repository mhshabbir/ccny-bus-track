import React from 'react';

const UserProfile = () => {
  // Function to handle the password reset if needed
  const handleResetPassword = () => {
    // Reset password logic
  };

  return (
    <div className="profile-container">
        <div className="header">
            <h1>My Profile</h1>
        </div>
        
        <div className="profile-content">
            <div className="profile-info">
                <div className="profile-photo" /> {/* Placeholder for profile photo */}
                <div className="details">
                    <p>Name: <span id="userName">Muhammad Hasnain</span></p>
                    <p>ID Number: <span id="userId">123456789</span></p>
                    <p>CCNY Email: <span id="userEmail">mshabbir001@citymail.cuny.edu</span></p>
                    <button id="resetPassword" className="reset-btn" onClick={handleResetPassword}>Reset Password</button>
                </div>
            </div>
            
            <div className="qr-container">
                <img src="path_to_qr_code_image.jpg" alt="User QR Code" className="qr-code" />
                <p>My QR Code</p>
            </div>
        </div>
    </div>
  );
};

export default UserProfile;