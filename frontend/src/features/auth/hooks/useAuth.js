import {useContext , useEffect} from 'react';
import {AuthContext} from '../auth.context';
import {login, register, logout, getMe} from '../services/auth.api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const {user , setUser , loading , setLoading} = context;

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username ,email, password, name) => {
    setLoading(true);
    try {
      const userData = await register(username, email, password, name);
      setUser(userData);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

      useEffect(() => {
        const fetchUser = async () => {
         const data = await getMe()
         setUser(data)
         setLoading(false)
        }
        fetchUser()
    }
    ,[])


  return { user, loading, handleLogin, handleRegister, handleLogout, fetchUserProfile };
};