import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [controlMode, setControlMode] = useState(null);
    const [isPumpOn, setIsPumpOn] = useState(false);
    const [showAutoPopup, setShowAutoPopup] = useState(false);
    const [showAdjustPopup, setShowAdjustPopup] = useState(false);
    const [minWaterLevel, setMinWaterLevel] = useState('');
    const [maxWaterLevel, setMaxWaterLevel] = useState('');
    // const [distanceToSensor, setDistanceToSensor] = useState('');
    const [tankHeight, setTankHeight] = useState('');
    // const [distanceToFull, setDistanceToFull] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const togglePump = (status) => {
        setIsPumpOn(status);
    };

    const handleConfirmAuto = () => {
        if (!minWaterLevel || !maxWaterLevel) {
            setErrorMessage('Vui lòng điền đủ thông tin.');
            return;
        }
        const minLevel = parseFloat(minWaterLevel);
        const maxLevel = parseFloat(maxWaterLevel);

        if (minLevel < 15 || maxLevel > 75 || minLevel >= maxLevel) {
            setErrorMessage('Lượng nước không hợp lệ (tối thiểu > 15% và tối đa < 75%).');
            return;
        }

        setErrorMessage('');
        setShowAutoPopup(false);
        console.log("Auto Mode - Min Water Level:", minWaterLevel, "Max Water Level:", maxWaterLevel);
    };

    // const handleConfirmAdjust = () => {
    //     if (!distanceToSensor || !distanceToFull) {
    //         setErrorMessage('Vui lòng điền đủ thông tin.');
    //         return;
    //     }
    //     const distanceFull = parseFloat(distanceToFull);

    //     if (distanceFull < 25) {
    //         setErrorMessage('Khoảng cách từ sensor đến mực nước khi bể đầy phải ít nhất là 25cm.');
    //         return;
    //     }

    //     setErrorMessage('');
    //     setShowAdjustPopup(false);
    //     console.log("Distance to Sensor:", distanceToSensor, "Distance to Full:", distanceToFull);
    // };

    const handleConfirmAdjust = () => {
        if (!tankHeight) {
            setErrorMessage('Vui lòng điền đủ thông tin.');
            return;
        }

        setErrorMessage('');
        setShowAdjustPopup(false);
        console.log("Tank Height: ", tankHeight);
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
                    <p>Lưu ý: Lượng nước tối thiểu ít nhất là 15% và tối đa là 75%.</p>
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
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleConfirmAuto}>Xác nhận</button>
                    <button onClick={() => {setShowAutoPopup(false); setErrorMessage(''); }}>Đóng</button>
                </div>
            )}

            {/* Popup điều chỉnh thông số */}
            {showAdjustPopup && (
                <div className="popup">
                    <h3>Điều chỉnh thông số</h3>
                    {/* <p>Lưu ý: Khoảng cách từ sensor đến mực nước khi bể đầy ít nhất là 25cm.</p> */}
                    <input
                        type="number"
                        placeholder="Độ cao của bể nước"
                        value={tankHeight}
                        onChange={(e) => setTankHeight(e.target.value)}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleConfirmAdjust}>Xác nhận</button>
                    <button onClick={() => { setShowAdjustPopup(false); setErrorMessage(''); }}>Đóng</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
