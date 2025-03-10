import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set up axios interceptor for token refresh
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we have a refresh token and haven't tried to refresh yet
        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const response = await axios.post('/api/users/token/refresh/', {
              refresh: refreshToken
            });
            
            const { access } = response.data;
            setAccessToken(access);
            
            // Update the authorization header
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log out the user
            logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Check if user session exists on initial load
    const checkUserSession = async () => {
      try {
        if (accessToken) {
          await fetchUserProfile();
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    checkUserSession();

    // Clean up interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/users/token/', { username, password });
      const { access, refresh } = response.data;
      
      // Store tokens in state instead of localStorage
      setAccessToken(access);
      setRefreshToken(refresh);
      
      await fetchUserProfile();
      navigate('/profile');
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const logout = () => {
    // Clear tokens from state
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/login');
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      if (!accessToken) {
        setLoading(false);
        return;
      }
      
      const response = await axios.get('/api/users/profile/');
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    accessToken,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 