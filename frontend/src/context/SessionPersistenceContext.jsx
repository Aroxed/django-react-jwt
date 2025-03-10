import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const SessionPersistenceContext = createContext();

// Custom hook to use the session persistence context
export const useSessionPersistence = () => useContext(SessionPersistenceContext);

export const SessionPersistenceProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  // Load tokens from sessionStorage on initial render
  useEffect(() => {
    try {
      const storedTokens = sessionStorage.getItem('auth_tokens');
      if (storedTokens) {
        setTokens(JSON.parse(storedTokens));
      }
    } catch (error) {
      console.error('Error loading tokens from sessionStorage:', error);
    }
  }, []);

  // Save tokens to sessionStorage whenever they change
  useEffect(() => {
    if (tokens.accessToken && tokens.refreshToken) {
      try {
        sessionStorage.setItem('auth_tokens', JSON.stringify(tokens));
      } catch (error) {
        console.error('Error saving tokens to sessionStorage:', error);
      }
    } else if (!tokens.accessToken && !tokens.refreshToken) {
      // Clear tokens from sessionStorage when they're removed from state
      sessionStorage.removeItem('auth_tokens');
    }
  }, [tokens]);

  const saveTokens = (accessToken, refreshToken) => {
    setTokens({ accessToken, refreshToken });
  };

  const clearTokens = () => {
    setTokens({ accessToken: null, refreshToken: null });
  };

  return (
    <SessionPersistenceContext.Provider
      value={{
        ...tokens,
        saveTokens,
        clearTokens,
      }}
    >
      {children}
    </SessionPersistenceContext.Provider>
  );
}; 