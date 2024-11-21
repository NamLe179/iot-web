import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorLog from './components/SensorLog';
import Login from './components/Login';
import TankSelection from './components/TankSelection';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [selectedTank, setSelectedTank] = useState(null);

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
        setSelectedTank(null);
    };
    
    return (
        <Router>
            <div className="App">
                {isLoggedIn &&  (
                        <aside className="sidebar">
                            <nav>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/sensor-log">Sensor Log</Link>
                                <button className="select-tank-button" onClick={() => setSelectedTank(null)}>Tank Selection</button>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </nav>
                        </aside>
                    )}
                <main>
                <Routes>
                        <Route
                            path="/"
                            element={isLoggedIn ? <Navigate to="/select-tank" /> : <Login onLogin={handleLogin} />}
                        />
                        <Route
                            path="/select-tank"
                            element={isLoggedIn ? <TankSelection onSelectTank={setSelectedTank} /> : <Navigate to="/" />}
                        />
                        {/* onLogout={handleLogout} */}
                        <Route
                            path="/dashboard"
                            element={isLoggedIn && selectedTank ? <Dashboard token={token} tank={selectedTank} /> : <Navigate to="/select-tank" />}
                        />
                        <Route
                            path="/sensor-log"
                            element={isLoggedIn && selectedTank ? <SensorLog token={token} tank={selectedTank} /> : <Navigate to="/select-tank" />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
