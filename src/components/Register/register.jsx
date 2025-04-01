// Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import AvatarSelector from '../AvatarSelector/avatar';
import Modal from '../Modal/modal';
import '../../assets/css/register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        if (!selectedAvatar) {
            setError('⚠️ Por favor selecciona un avatar');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, {
                displayName: username,
                photoURL: selectedAvatar
            });

            await setDoc(doc(db, "users", userCredential.user.uid), {
                displayName: username,
                email: email,
                photoURL: selectedAvatar,
                createdAt: new Date(),
                lastLogin: new Date()
            });

            setMensaje('¡Registro exitoso! Redirigiendo...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Error en registro:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('⚠️ El correo ya está registrado. ¿Quieres:');
            } else {
                setError(`Error: ${err.message}`);
            }
        }
    };

    const handleAvatarSelect = (url) => {
        setSelectedAvatar(url);
        setShowAvatarModal(false);
    };

    return (
        <div className="auth-card">
            <div className="image-container"></div>
            <div className="form-container">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleRegister}>
                    {/* Campo Nombre de Usuario */}
                    <div className="input-container">
                        <span className="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo Correo Electrónico */}
                    <div className="input-container">
                        <span className="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div className="input-container">
                        <span className="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Selector de Avatar */}
                    <div className="avatar-section">
                        <label>Avatar:</label>
                        <div className="avatar-preview-container">
                            {selectedAvatar ? (
                                <img
                                    src={selectedAvatar}
                                    alt="Avatar seleccionado"
                                    className="avatar-preview"
                                    onClick={() => setShowAvatarModal(true)}
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="avatar-select-btn"
                                    onClick={() => setShowAvatarModal(true)}
                                >
                                    Seleccionar Avatar
                                </button>
                            )}
                        </div>
                        {error && error.includes('avatar') && (
                            <p className="error-text">{error}</p>
                        )}
                    </div>

                    <button type="submit" className="register-btn">
                        Registrarse
                    </button>
                </form>

                {/* Mensajes de feedback */}
                {mensaje && <div className="auth-message success-message">{mensaje}</div>}
                {error && !error.includes('avatar') && (
                    <div className="auth-message error-message">
                        <p>{error}</p>
                        {error.startsWith('⚠️') && (
                            <div className="error-actions">
                                <button onClick={() => navigate('/login')} className="social-btn facebook-btn">
                                    Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => {
                                        setEmail('');
                                        setPassword('');
                                        setError('');
                                    }}
                                    className="social-btn google-btn"
                                >
                                    Usar otro correo
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Modal para selección de avatares */}
                {showAvatarModal && (
                    <Modal onClose={() => setShowAvatarModal(false)}>
                        <h3 className="modal-title">Elige tu avatar</h3>
                        <AvatarSelector onSelect={handleAvatarSelect} />
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Register;