import React from 'react';
import '../../assets/css/topnav.css';

const TopNav = ({ isSidebarCollapsed, handleLogout }) => {
    return (
        <nav className={`top-nav ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="nav-content">
                {/* Parte izquierda */}
                <div className="nav-left">
                    <div className="nav-logo">
                        <span>TNSHOP</span>
                    </div>
                </div>

                {/* Parte derecha */}
                <div className="nav-right">
                    <div className="nav-icon" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </div>

                    {/* Menú móvil */}
                    <div className="nav-icon mobile-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;