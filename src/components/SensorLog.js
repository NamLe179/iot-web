import React, { useEffect, useState } from 'react';
import './SensorLog.css';

const SensorLog = ({ token }) => {
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
            } catch (err) {
                console.error('Error fetching logs', err);
            }
        };

        fetchLogs();
    }, [token]);

    return (
        <div className="sensor-log">
            <h2>Sensor History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Lượng nước (%)</th>
                        <th>Nhiệt độ (°C)</th>
                        <th>Trạng thái máy bơm</th>
                        <th>Thời gian đo</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.waterLevel}</td>
                            <td>{log.temperature}</td>
                            <td>{log.pumpState}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorLog;
