import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';


const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDemoDuel = () => {
        navigate('/duel-demo');
    };

    return (
        <div className={styles.homeContainer}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">GameCards</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-outline-light me-2" onClick={handleDemoDuel}>Demo Duel</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={handleLogout}>Account</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={styles.content}>
                <h1>Welcome to GameCards</h1>
                <p>Prepare for an exciting adventure in the world of GameCards. Challenge your friends to duels and become the ultimate champion!</p>
                <img src="/assets/images/background/sky_bridge.png" alt="Hero Background" className={styles.heroImage} />
            </div>
        </div>
    );
};

export default Home;
