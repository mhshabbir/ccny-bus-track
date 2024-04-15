import React, { useState } from 'react';
import styles from './QrCode.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function PublicSafety({token}) {
  const [emailContent, setEmailContent] = useState('');
  
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
            <h1 className={styles.header}>My Profile</h1>
            <div className={styles.inputContainer}>
                <div className={styles.contentContainerP}>
                    <div className={styles.textContainer}>
                        {/* <h3>Name: Jay Trivedi</h3> */}
                        <h3>Student Id: 123456789 </h3>
                        <h3>Email address: {token.user.email}</h3>
                    </div>
                    <form className="loginForm" onSubmit={handleSubmit}>
                      <input
                          type="text"
                          placeholder="Enter your concern here"
                          value={emailContent}
                          onChange={(e) => setEmailContent(e.target.value)}
                          className={styles.largeInput}  // Use CSS modules to style this input
                        />
                    </form>
                </div>
                <button onClick={handleSubmit}>Send Email</button>
            </div>
        </div> 
    </>
  )
}

export default PublicSafety