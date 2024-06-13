import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DuelDemo.module.css';

const DuelDemo = () => {
    const [hero1, setHero1] = useState(null);
    const [hero2, setHero2] = useState(null);
    const [duelResult, setDuelResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [lastUpdateTime, setLastUpdateTime] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log('WebSocket connected');
            stompClient.subscribe('/topic/duel-progress', (message) => {
                const currentTime = new Date().getTime();
                if (currentTime - lastUpdateTime >= 1000) {
                    const duelUpdate = JSON.parse(message.body);
                    console.log('Duel update received:', duelUpdate);

                    setHero1({ ...duelUpdate.hero1 });
                    setHero2({ ...duelUpdate.hero2 });
                    setLastUpdateTime(currentTime);
                }
            });

            stompClient.subscribe('/topic/duel-result', (message) => {
                setDuelResult(message.body);
            });
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });

        return () => {
            stompClient.disconnect();
        };
    }, [lastUpdateTime]);

    const startDuel = async () => {
        try {
            console.log('Starting duel...');
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/duel/start', null, {
                params: { hero1Id: 1, hero2Id: 2 },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log('Duel started:', response.data);
        } catch (error) {
            console.error('Error starting duel:', error);
            setErrorMessage('Error starting duel: ' + error.message);
        }
    };

    const getImageUrl = (imageName) => {
        return `/assets/images/${imageName}`;
    };

    const renderHeroStats = (hero) => (
        <div className={styles.heroStats}>
            <p><strong>{hero.name}</strong></p>
            <p>HP: {hero.hp}</p>
            <p>Mana: {hero.mana}</p>
            <p>Attack: {hero.attack}</p>
            <p>Defense: {hero.defense}</p>
            <p>Attack Damage: {hero.attackDamage}</p>
            <p>Attack Speed: {hero.attackSpeed}</p>
            <p>Main Element: {hero.mainElement}</p>
            <p>Abilities: {Array.isArray(hero.abilities) ? hero.abilities.join(', ') : hero.abilities}</p>
        </div>
    );

    return (
        <div className={styles.duelContainer}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-4 d-flex align-items-center">
                            <button className="btn btn-outline-light mr-3" onClick={() => navigate('/home')}>Home</button>
                            <button className="btn btn-outline-light" onClick={() => navigate('/duel-demo')}>Duel Demo</button>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <a className="navbar-brand" href="/">GameCards</a>
                        </div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                            <button className="btn btn-outline-light mr-3" onClick={() => navigate('/login')}>Account</button>
                            <button onClick={startDuel} className="btn btn-success">Start Duel</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={styles.duelContent}>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className={styles.duelStage}>
                    {duelResult && <p className={styles.winMessage}>{duelResult}</p>}
                    {hero1 && (
                        <div className={styles.hero1}>
                            <img src={getImageUrl(hero1.imageUrl)} alt="Hero 1" className={styles.heroImage} />
                            {renderHeroStats(hero1)}
                        </div>
                    )}
                    {hero2 && (
                        <div className={styles.hero2}>
                            <img src={getImageUrl(hero2.imageUrl)} alt="Hero 2" className={styles.heroImage} />
                            {renderHeroStats(hero2)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DuelDemo;
