import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorLog from './components/SensorLog';
import Login from './components/Login';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setIsLoggedIn(true);
            setToken(savedToken);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
    };
    
    return (
        <Router>
            <div className="App">
                {isLoggedIn && (
                        <aside className="sidebar">
                            <nav>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/sensor-log">Sensor Log</Link>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </nav>
                        </aside>
                    )}
                <main>
                <Routes>
                        <Route
                            path="/"
                            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                        />
                        <Route
                            path="/dashboard"
                            element={isLoggedIn ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/sensor-log"
                            element={isLoggedIn ? <SensorLog token={token} /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
