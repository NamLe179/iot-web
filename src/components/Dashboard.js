import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onLogout, token }) => {
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

    const [latestData, setLatestData] = useState({ waterLevel: null, temperature: null });


    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/logs', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                console.log(data)
                setLogs(data);
                if (data.length > 0) {
                    // Lấy log mới nhất (phần tử đầu tiên)
                    setLatestData({ 
                        waterLevel: data[0].waterLevel, 
                        temperature: data[0].temperature 
                    });
                }
            } catch (err) {
                console.error('Error fetching logs', err);
            }
        };

        fetchLogs();
    }, [token]);

    const togglePump = async (status) => {
        try {
            const action = status ? "ON" : "OFF"
            const response = await axios.post('http://localhost:3000/pump/manual', { "action": action }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (response.data.message === "success") {
                setIsPumpOn(status);
            } else {
                alert('Không thể điều khiển bơm. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi kết nối đến server.');
        }
    };


    const handleConfirmAuto = async () => {

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


        try {
            const response = await axios.post('http://localhost:3000/pump/auto', {
                minLevel: minLevel,
                maxLevel: maxLevel,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.data.message === "success") {
                setErrorMessage('');
                setShowAutoPopup(false);
                console.log("Auto Mode - Min Water Level:", minWaterLevel, "Max Water Level:", maxWaterLevel);
            } else {
                setErrorMessage('Lỗi: Không thể cập nhật chế độ tự động.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Lỗi khi kết nối đến server.');
        }

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


    const handleConfirmAdjust = async () => {
        if (!tankHeight) {
            setErrorMessage('Vui lòng điền đủ thông tin.');
            return;
        }

        console.log(tankHeight);

        try {
            const response = await axios.post('http://localhost:3000/logs/update-water-level', {
                waterLevel : parseInt(tankHeight),
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            // if (response.data.success) {
            //     setErrorMessage('');
            //     setShowAdjustPopup(false);
            //     console.log("Tank Height: ", tankHeight);
            // } else {
            //     setErrorMessage('Lỗi: Không thể cập nhật thông số bể nước.');
            // }
        } catch (error) {
            console.error(error);
            setErrorMessage('Lỗi khi kết nối đến server.');
        }

    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {/* <button onClick={onLogout} className="logout-button">Logout</button> */}
            <div className="metrics">
                <div className="metric">Lượng nước: {latestData.waterLevel}%</div>
                <div className="metric">Nhiệt độ: {latestData.temperature}°C</div>
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

                    <button onClick={() => { setShowAutoPopup(false); setErrorMessage(''); }}>Đóng</button>
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
