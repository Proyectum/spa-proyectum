import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            await axios.get('/api/users/profile', { withCredentials: true });
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        }
    };

    const signOut = async () => {
        try {
            await axios.post('/api/auth/sign-out', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, signOut, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
