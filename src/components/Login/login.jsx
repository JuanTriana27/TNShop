import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
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