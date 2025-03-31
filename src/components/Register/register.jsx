import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Importar hook de navegación

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializar hook

    const handleRegister = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        
        try {
            // Versión con variable usada
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            setMensaje(`¡Registro exitoso! Redirigiendo...`);
            console.log('UID del usuario:', userCredential.user.uid); // Usamos la variable
            
            setEmail('');
            setPassword('');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err) {
            
            // Manejo específico de errores
            if (err.code === 'auth/email-already-in-use') {
                setError('⚠️ El correo ya está registrado. ¿Quieres:');
            } else {
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="register-email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="register-email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Contraseña:</label>
                    <input
                        type="password"
                        id="register-password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>

            {mensaje && (
                <div style={{ 
                    color: 'green', 
                    margin: '15px 0',
                    padding: '10px',
                    backgroundColor: '#e6ffe6',
                    borderRadius: '5px'
                }}>
                    {mensaje}
                </div>
            )}

            {error && (
                <div style={{ 
                    color: '#cc0000', 
                    margin: '15px 0',
                    padding: '15px',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '5px'
                }}>
                    <p>{error}</p>
                    
                    {/* Mostrar opciones solo para el error de email existente */}
                    {error.startsWith('⚠️') && (
                        <div style={{ marginTop: '10px' }}>
                            <button 
                                onClick={() => navigate('/login')}
                                style={{
                                    marginRight: '10px',
                                    padding: '8px 15px',
                                    backgroundColor: '#0066cc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Iniciar Sesión
                            </button>
                            
                            <button 
                                onClick={() => {
                                    setEmail('');
                                    setPassword('');
                                    setError('');
                                }}
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Usar otro correo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Register;