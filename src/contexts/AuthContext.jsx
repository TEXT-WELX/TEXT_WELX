import { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const signup = async (payload) => {
    const res = await api.post('/auth/signup', payload);
    setToken(res.data.token);
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
    setUser(null);
  };

  useEffect(()=>{
    (async ()=>{
      if(!token) { setLoading(false); return; }
      try {
        setAuthToken(token);
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        setToken(null);
        setUser(null);
      } finally { setLoading(false); }
    })();
  }, [token]);

  return <AuthContext.Provider value={{ user, login, signup, logout, token, setToken, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
