import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [controlMode, setControlMode] = useState(null);
    const [isPumpOn, setIsPumpOn] = useState(false);
    const [showAutoPopup, setShowAutoPopup] = useState(false);
    const [showAdjustPopup, setShowAdjustPopup] = useState(false);
    const [minWaterLevel, setMinWaterLevel] = useState('');
    const [maxWaterLevel, setMaxWaterLevel] = useState('');
    const [distanceToSensor, setDistanceToSensor] = useState('');
    const [distanceToFull, setDistanceToFull] = useState('');

    const togglePump = (status) => {
        setIsPumpOn(status);
    };

    const handleConfirmAuto = () => {
        setShowAutoPopup(false);
        console.log("Auto Mode - Min Water Level:", minWaterLevel, "Max Water Level:", maxWaterLevel);
    };

    const handleConfirmAdjust = () => {
        setShowAdjustPopup(false);
        console.log("Distance to Sensor:", distanceToSensor, "Distance to Full:", distanceToFull);
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {/* <button onClick={onLogout} className="logout-button">Logout</button> */}
            <div className="metrics">
                <div className="metric">Lượng nước: 71.0%</div>
                <div className="metric">Nhiệt độ: 34.0°C</div>
            </div>
            
            <div className="control-buttons">
                <button onClick={() => setControlMode('manual')}>Thủ công</button>
                <button onClick={() => { setControlMode('auto'); setShowAutoPopup(true); }}>Tự động</button>
                <button onClick={() => setShowAdjustPopup(true)}>Điều chỉnh thông số</button>
            </div>

            {/* Điều khiển bơm nước thủ công */}
            {controlMode === 'manual' && (
                <div className="manual-controls">
                    <button 
                        className={isPumpOn ? 'active' : ''} 
                        onClick={() => togglePump(true)}
                    >
                        ON
                    </button>
                    <button 
                        className={!isPumpOn ? 'active' : ''} 
                        onClick={() => togglePump(false)}
                    >
                        OFF
                    </button>
                </div>
            )}

            {/* Popup cho chế độ tự động */}
            {showAutoPopup && (
                <div className="popup">
                    <h3>Điều chỉnh lượng nước chế độ tự động</h3>
                    <input
                        type="number"
                        placeholder="Lượng nước tối thiểu"
                        value={minWaterLevel}
                        onChange={(e) => setMinWaterLevel(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Lượng nước tối đa"
                        value={maxWaterLevel}
                        onChange={(e) => setMaxWaterLevel(e.target.value)}
                    />
                    <button onClick={handleConfirmAuto}>Xác nhận</button>
                    <button onClick={() => setShowAutoPopup(false)}>Đóng</button>
                </div>
            )}

            {/* Popup điều chỉnh thông số */}
            {showAdjustPopup && (
                <div className="popup">
                    <h3>Điều chỉnh thông số</h3>
                    <input
                        type="number"
                        placeholder="Khoảng cách từ đáy bể đến sensor"
                        value={distanceToSensor}
                        onChange={(e) => setDistanceToSensor(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Khoảng cách từ sensor đến mực nước khi bể đầy"
                        value={distanceToFull}
                        onChange={(e) => setDistanceToFull(e.target.value)}
                    />
                    <button onClick={handleConfirmAdjust}>Xác nhận</button>
                    <button onClick={() => setShowAdjustPopup(false)}>Đóng</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
