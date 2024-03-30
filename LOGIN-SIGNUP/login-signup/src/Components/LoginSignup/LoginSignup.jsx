import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            errors.email = 'Please enter a valid email address.';
        }
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters.';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Submitting form data:', formData);
            // Simulate form data submission
            console.log(`Name: ${formData.name || 'N/A'}; Email: ${formData.email}; Password: ${formData.password}`);
            
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        } else {
            console.log('Form has errors.');
            setFormErrors(errors);
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {action==="Login" ? null : (
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="text" placeholder='Name' name="name" value={formData.name} onChange={handleChange}/>
                        </div>
                    )}
                    
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email ID' name="email" value={formData.email} onChange={handleChange}/>
                        {formErrors.email && <p className="error">{formErrors.email}</p>}
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange}/>
                        {formErrors.password && <p className="error">{formErrors.password}</p>}
                    </div>
                    {action==="Sign Up" ? null : (
                        <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
                    )}
                    <div className="submit-container">
                        <input type="submit" value="Submit" className="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}
