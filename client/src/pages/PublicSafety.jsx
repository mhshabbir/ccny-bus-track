import React, { useState } from 'react';
import styles from './QrCode.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function PublicSafety({token}) {
  
  const navigate = useNavigate();
  // console.log(token.user.email)

  const handleSubmit = () => {
    navigate('/signup')
  }
  if(!token){
    return <Navigate  to="/login" replace={true}/>
  }
  return (
    <>
   
        <div className="App">
            <h1 className={styles.header}>Public Safety</h1>
            <div className={styles.inputContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.textContainer}>
                        {/* <h3>Name: Jay Trivedi</h3> */}
                        <h3>Student Id: 123456789 </h3>
                        <h3>Email address: {token.user.email}</h3>
                    </div>
                </div>
                <form className="loginForm" onSubmit={handleSubmit}>
                        <input />
                </form>
                <button onClick={handleSubmit}>Send Email</button>
            </div>
        </div> 
    </>
  )
}

export default PublicSafety