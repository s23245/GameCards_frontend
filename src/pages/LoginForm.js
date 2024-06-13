import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                const token = response.data.token || response.headers['authorization']?.split(' ')[1];
                if (token) {
                    localStorage.setItem('token', token);
                    navigate('/home');
                } else {
                    console.error('Login failed: Authorization token missing');
                    setErrorMessage('Login failed: Authorization token missing');
                }
            } else {
                console.error('Login failed: Response data is undefined');
                setErrorMessage('Login failed: Response data is undefined');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed: An error occurred');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className={`btn btn-primary w-100`}>Login</button>
            </form>
            {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
            <p className="text-center mt-3">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default LoginForm;
