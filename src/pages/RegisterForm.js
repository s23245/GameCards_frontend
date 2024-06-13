import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RegistrationForm.module.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', { firstName, lastName, email, password });
            console.log('User registered successfully:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            setErrorMessage(error.response.data.message);
        }
    };


    return (
        <div className={styles.container}>
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
            <p className="text-center mt-3">
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default RegisterForm;
