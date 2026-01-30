import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored auth on mount
        const storedToken = localStorage.getItem('civicmind_token');
        const storedUser = localStorage.getItem('civicmind_user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setLoading(false);
    }, []);

    const login = async (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('civicmind_token', authToken);
        localStorage.setItem('civicmind_user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('civicmind_token');
        localStorage.removeItem('civicmind_user');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('civicmind_user', JSON.stringify(userData));
    };

    const isWorker = user?.role === 'worker';
    const isSupervisor = user?.role === 'supervisor';

    const value = {
        user,
        token,
        login,
        logout,
        updateUser,
        isWorker,
        isSupervisor,
        isAuthenticated: !!token,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
