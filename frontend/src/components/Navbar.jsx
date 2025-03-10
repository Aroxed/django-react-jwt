import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">
            <Link to="/">Django React JWT</Link>
          </div>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <span className="py-2">Welcome, {user?.username}</span>
                <Link to="/profile" className="py-2 px-4 hover:bg-blue-700 rounded">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="py-2 px-4 hover:bg-blue-700 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 