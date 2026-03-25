import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore user from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('nutriai_token');
      const storedUser = localStorage.getItem('nutriai_user');
      if (token && storedUser && storedUser !== '[object Object]') {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Auth restoration failed:', e);
      localStorage.removeItem('nutriai_token');
      localStorage.removeItem('nutriai_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('nutriai_token', data.token);
    localStorage.setItem('nutriai_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('nutriai_token', data.token);
    localStorage.setItem('nutriai_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('nutriai_token');
    localStorage.removeItem('nutriai_user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('nutriai_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
