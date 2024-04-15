import React, { useState } from 'react';
import styles from './QrCode.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function QrCode({token}) {
  
  const navigate = useNavigate();
  // console.log(token.user.email)

  const handleResetPassword = () => {
    navigate('/signup')
  }
  if(!token){
    return <Navigate  to="/login" replace={true}/>
  }
  return (
    <>
   
        <div className="App">
            <h1 className={styles.header}>My Profile</h1>
            <div className={styles.inputContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.textContainer}>
                        {/* <h3>Name: Jay Trivedi</h3> */}
                        <h3>Student Id: 123456789 </h3>
                        <h3>Email address: {token.user.email}</h3>
                    </div>
                    <div className={styles.imageContainer}>
                        <img className={styles.ccnyimg} src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Street 125" />
                        <h3>My QR Code</h3>
                    </div>
                </div>
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div> 
    </>
  )
}

export default QrCode