import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import TopNav from '../TopNav/topnav';
import '../../assets/css/home.css'

const Home = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />
            <TopNav
                isSidebarCollapsed={isSidebarCollapsed}
                handleLogout={handleLogout}
            />

            <div className="main-content">
                <h1>¡Bienvenido {auth.currentUser?.email}!</h1>
                <p>Has accedido al área privada</p>
            </div>
        </div>
    );
};

export default Home;