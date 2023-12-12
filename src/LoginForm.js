import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ loginUser }) {
    
    const [formData, setFormData] = useState({username: '', password: ''});
  
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
            await loginUser(formData);
            navigate('/companies');
        } catch (e) {
            console.error("login error:", e)
        }
        
    };

    const {username, password} = formData;
    
    return (
        <div>
            <h3>Log In</h3>
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
                <button type='submit' className='button-85'>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;