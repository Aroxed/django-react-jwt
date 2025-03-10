import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { SessionPersistenceProvider } from './context/SessionPersistenceContext';

function App() {
  return (
    <SessionPersistenceProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container py-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<Navigate to="/profile" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </SessionPersistenceProvider>
  );
}

export default App; 