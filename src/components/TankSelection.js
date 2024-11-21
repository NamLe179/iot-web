// const TankSelection = ({ token, onSelectTank }) => {
//     const [tanks, setTanks] = useState([]);

//     useEffect(() => {
//         const fetchTanks = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/tanks', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const data = await response.json();
//                 setTanks(data);
//             } catch (err) {
//                 console.error('Error fetching tanks', err);
//             }
//         };

//         fetchTanks();
//     }, [token]);

//     return (
//         <div className="tank-selection">
//             <h2>Chọn bể nước</h2>
//             <ul>
//                 {tanks.map((tank) => (
//                     <li key={tank.id} onClick={() => onSelectTank(tank)}>
//                         {tank.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TankSelection.css';

const TankSelection = ({onSelectTank}) => {
    const navigate = useNavigate();

    const handleSelect = (tankName) =>{
        onSelectTank(tankName);
        navigate('/dashboard');
    };

    return (
        <div className="select-tank-container">
            <h2>Chọn bể nước</h2>
            <button className="select-tank" onClick={() => handleSelect('Bể số 1')}>Bể số 1</button>
        </div>
    )
}

export default TankSelection;
