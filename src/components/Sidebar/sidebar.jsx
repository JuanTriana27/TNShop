import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import '../../assets/css/sidebar.css';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Guarda el estado del sidebar en localStorage
    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    // Ajusta el sidebar al redimensionar la ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768 && !isCollapsed) {
                setIsCollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed, setIsCollapsed]); // Añade setIsCollapsed aquí

    // Escucha los cambios de autenticación
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Cuando haya un usuario autenticado, busca su información adicional en Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Actualiza el objeto usuario para incluir displayName (nombre de usuario)
                        setUser(prevUser => ({ ...prevUser, displayName: userData.displayName }));
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    return (
        <nav
            className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
            style={{
                '--sidebar-width': isCollapsed ? '5rem' : '18rem'
            }}
        >
            <div className="sidebar-top-wrapper">
                <div className="sidebar-top">
                    <Link to="/" className="logo_wrapper">
                        <img src={require('../../assets/img/icono.svg').default} alt="Logo" className="logo-small" />
                        <span className="company-name">TNSHOP</span>
                    </Link>
                </div>
                <button
                    className="expand-btn"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <svg
                        style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>

            <div className="search_wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => isCollapsed && setIsCollapsed(false)}
                />
            </div>

            <div className="sidebar-links">
                <ul>
                    <li>
                        <Link to="/" className={`tooltip ${isActive('/')}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            <span className="link">Home</span>
                            <span className="tooltip_content">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className={`tooltip ${isActive('/dashboard')}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                />
                            </svg>
                            <span className="link">Dashboard</span>
                            <span className="tooltip_content">Dashboard</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="separator"></div>

            <div className="sidebar__profile">
                <div className="avatar_wrapper">
                    <img src={user?.photoURL || "/user-avatar.jpg"} alt="User" className="avatar" />
                </div>
                <div className="avatar_name">
                    <div className="user-name">{user?.displayName || "Invitado"}</div>
                    <div className="email">{user?.email || "Sin email"}</div>
                </div>
                <Link to="/logout" className="logout">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                </Link>
            </div>
        </nav>
    );
};

export default Sidebar;
