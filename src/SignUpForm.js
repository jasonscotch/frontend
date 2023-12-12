import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm({ signupUser }) {
    
    const [formData, setFormData] = useState({username: "", password: "", firstName: "", lastName: "", email: ""});
  
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser(formData);
            navigate('/companies');
        } catch (e) {
            console.error("login error:", e)
        }
    };

    const {username, password, firstName, lastName, email} = formData;
    
    return (
        <div>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    id="password"
                    name="password"
                    type='password'
                    value={password}
                    onChange={handleChange}
                />
                <label htmlFor='firstName'>First Name:</label>
                <input 
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                />
                <label htmlFor='lastName'>Last Name:</label>
                <input 
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                />
                <label htmlFor='email'>Email:</label>
                <input 
                    id="email"
                    name="email"
                    type='email'
                    value={email}
                    onChange={handleChange}
                />
                <button type='submit' className='button-85'>Submit</button>
            </form>
        </div>
    );
}

export default SignUpForm;