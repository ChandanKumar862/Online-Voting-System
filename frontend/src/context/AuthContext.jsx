import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { mockStore } from '../services/mockStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('voting_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          mockStore.currentUser = parsed;
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login({ email, password });
      setUser(result.user);
      localStorage.setItem('voting_user', JSON.stringify(result.user));
      if (result.token) {
        localStorage.setItem('voting_auth_token', result.token);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      localStorage.setItem('voting_user', JSON.stringify(result.user));
      if (result.token) {
        localStorage.setItem('voting_auth_token', result.token);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (targetRole) => {
    const switchedUser = mockStore.switchDemoUser(targetRole);
    setUser({ ...switchedUser });
    localStorage.setItem('voting_user', JSON.stringify(switchedUser));
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    mockStore.currentUser = updated;
    localStorage.setItem('voting_user', JSON.stringify(updated));
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isVoter: user?.role === 'voter',
    isCandidate: user?.role === 'candidate',
    loading,
    login,
    register,
    logout,
    switchRole,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
