import React, { createContext, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        try {
            const response = await axios.get('/api/users/profile', { withCredentials: true });
            setIsAuthenticated(true);
            setUser(response.data);
        } catch {
            setIsAuthenticated(false);
            setUser({})
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await axios.post('/api/auth/sign-out', {}, { withCredentials: true });
        } catch (error) {
            console.error('Sign out error:', error);
        }
        setIsAuthenticated(false);
        setUser({})
        navigate('/');
    }, [navigate]);

    const contextValue = React.useMemo(() => ({
        isAuthenticated,
        user,
        setIsAuthenticated,
        signOut,
        checkAuth
    }), [isAuthenticated, user, signOut, checkAuth]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
