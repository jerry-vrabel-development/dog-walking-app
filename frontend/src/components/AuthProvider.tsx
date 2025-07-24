import React, { useState, useEffect, ReactNode } from 'react';
import { User } from '@dog-walking-app/shared';
import { authApi } from '../services/api';
import { AuthContextType } from '../types/auth';
import { AuthContext } from '../contexts/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authApi.getCurrentUser();
          setUser(response.data.data);
        } catch {
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { user: userData, token } = response.data.data;
      
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'owner' | 'walker';
    phone?: string;
    address?: string;
  }) => {
    try {
      const response = await authApi.register(userData);
      const { user: newUser, token } = response.data.data;
      
      localStorage.setItem('authToken', token);
      setUser(newUser);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Registration failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    authApi.logout();
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
