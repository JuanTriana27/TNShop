import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

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
            console.error('Error de autenticación:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Ingresar</button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <p>¿No tienes cuenta?
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            marginLeft: '5px',
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            cursor: 'pointer'
                        }}
                    >
                        Regístrate aquí
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;