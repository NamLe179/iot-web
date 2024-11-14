import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorLog from './components/SensorLog';
import Login from './components/Login';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        // Giả lập tài khoản và mật khẩu cố định
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
        } else {
            alert('Sai tên tài khoản hoặc mật khẩu!');
        }
    };

    const handleLogout = () => {
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
                            element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/sensor-log"
                            element={isLoggedIn ? <SensorLog /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
