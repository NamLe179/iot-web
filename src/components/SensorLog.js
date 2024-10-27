import React from 'react';
import './SensorLog.css';

const SensorLog = () => {
    const sensorData = [
        { waterLevel: 71, temperature: 34.0, pumpStatus: true, timestamp: '2024-10-27T10:00:00Z' },
        // Thêm dữ liệu vào đây nếu cần
    ];

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
                    {sensorData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.waterLevel}</td>
                            <td>{item.temperature}</td>
                            <td>{item.pumpStatus ? 'ON' : 'OFF'}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorLog;
