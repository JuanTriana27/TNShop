import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import TopNav from '../TopNav/topnav';
import { FaChartLine, FaCog, FaBoxOpen, FaHome, FaUsers, FaShippingFast } from 'react-icons/fa';
import '../../assets/css/home.css';

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
        <div className={`home-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            <div className="main-content-wrapper">
                <TopNav
                    isSidebarCollapsed={isSidebarCollapsed}
                    handleLogout={handleLogout}
                />

                <div className="main-content">
                    <div className="welcome-hero">
                        <h1>¡Bienvenido, {auth.currentUser?.email}!</h1>
                        <p>Tu centro de control para gestionar TNSHOP</p>
                    </div>

                    <div className="quick-actions-grid">
                        <div className="action-card" onClick={() => navigate('/dashboard')}>
                            <FaChartLine className="feature-icon" />
                            <h3>Panel de Control</h3>
                            <p>Monitorea las métricas clave de tu negocio</p>
                        </div>

                        <div className="action-card" onClick={() => navigate('/products')}>
                            <FaBoxOpen className="feature-icon" />
                            <h3>Productos</h3>
                            <p>Administra tu inventario y catálogo</p>
                        </div>

                        <div className="action-card" onClick={() => navigate('/settings')}>
                            <FaCog className="feature-icon" />
                            <h3>Configuración</h3>
                            <p>Personaliza tu experiencia de usuario</p>
                        </div>
                    </div>

                    <div className="feature-highlights">
                        <div className="feature-card">
                            <FaHome className="feature-icon" />
                            <h3>Interfaz Intuitiva</h3>
                            <p>Diseño centrado en la experiencia del usuario</p>
                        </div>

                        <div className="feature-card">
                            <FaUsers className="feature-icon" />
                            <h3>Gestión de Clientes</h3>
                            <p>Administra tu base de clientes eficientemente</p>
                        </div>

                        <div className="feature-card">
                            <FaShippingFast className="feature-icon" />
                            <h3>Logística Integrada</h3>
                            <p>Sistema de seguimiento de envíos en tiempo real</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;