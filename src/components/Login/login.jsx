import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../../assets/css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError('Credenciales incorrectas. Intenta nuevamente.');
        }
    };

    return (
        <div className="login-card">
            <div className="image-container"></div>

            <div className="form-container">
                <h2>Bienvenido a TNShop</h2>
                <p>Ingresa tus credenciales para continuar</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <span className="input-icon">
                            <FaEnvelope size={18} />
                        </span>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <span className="input-icon">
                            <FaLock size={18} />
                        </span>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: '#e74c3c', textAlign: 'center', margin: '15px 0' }}>{error}</p>}

                    <button type="submit">Ingresar a mi cuenta</button>

                    <div className="register-prompt">
                        <span>¿Nuevo en TNShop? </span>
                        <button
                            onClick={() => navigate('/register')}
                            className="register-link"
                        >
                            Crear cuenta nueva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;