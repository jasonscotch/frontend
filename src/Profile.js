import React, { useState, useContext } from 'react';
import JoblyApi from './api';
import UserContext from "./UserContext";
import './Profile.css';

function ProfileForm({ getCurrentUser }) {

    const { currentUser } = useContext(UserContext);
    
    const [formData, setFormData] = useState({ firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email });

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
            await JoblyApi.updateUser(currentUser.username, formData);
            getCurrentUser();
        } catch (e) {
            console.error("edit user error:", e)
        }
    };

    const { firstName, lastName, email} = formData;
    
    return (
        <div className='profile-form'>
            <h3>Profile</h3>
            <form onSubmit={handleSubmit}>
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
                <button className='button-84' type='submit'>Save Changes</button>
            </form>
        </div>
    );
}

export default ProfileForm;