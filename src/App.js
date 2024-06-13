import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import DuelDemo from './pages/DuelDemo';
import './styles/index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/duel-demo" element={<DuelDemo />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
