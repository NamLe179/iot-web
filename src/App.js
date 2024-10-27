import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorLog from './components/SensorLog';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <aside className="sidebar">
                    <nav>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/sensor-log">Sensor Log</Link>
                    </nav>
                </aside>
                <main>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/sensor-log" element={<SensorLog />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
