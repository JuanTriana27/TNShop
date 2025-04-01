// src/components/ProtectedRoute/ProtectedRoute.jsx
import { getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const auth = getAuth();
    return auth.currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;