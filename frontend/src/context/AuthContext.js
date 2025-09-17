import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentDriver, setCurrentDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchDriver();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchDriver = async () => {
        try {
            const response = await axios.get(`${API_BASE}/driver/profile`);
            setCurrentDriver(response.data);
        } catch (error) {
            console.error("Failed to fetch driver data:", error.response?.data || error.message);
            localStorage.removeItem('token');
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE}/driver/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setCurrentDriver(response.data.driver);
            return response.data;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE}/driver/logout`);
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentDriver(null);
    };

    const value = {
        currentDriver,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}