import React, { useEffect, useState } from 'react';
import './SensorLog.css';

const SensorLog = ({ token }) => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const logsPerPage = 16; // Số bản ghi mỗi trang
    const maxPageButtons = 5;

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

    const totalPages = Math.ceil(logs.length / logsPerPage);
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const paginatedLogs = logs.slice(indexOfFirstLog, indexOfLastLog);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (startPage > 1) {
            pageButtons.push(
                <button key="first" onClick={() => handlePageChange(1)}>
                    1
                </button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="ellipsis-start">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(<span key="ellipsis-end">...</span>);
            }
            pageButtons.push(
                <button key="last" onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

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
                    {paginatedLogs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.waterLevel}</td>
                            <td>{log.temperature}</td>
                            <td>{log.pumpState}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SensorLog;
