import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                const { token, user } = await response.json();
                localStorage.setItem('token', token);
                setUser(user);
                setIsAuthenticated(true);
                setIsLoading(false);
                setError(null);
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = { user, isAuthenticated: !!user, isLoading, error };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;