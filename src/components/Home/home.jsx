import React from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">

                <h1>¡Bienvenido {auth.currentUser?.email}!</h1>
                <p>Has accedido al área privada</p>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Home;