import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadProfile = async() => {
    const response = await axios.get('/api/users/profile/');
    console.log(response);
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login due to useEffect
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
      
      <div className="space-y-4">
        <div className="flex border-b pb-3">
          <span className="font-semibold w-1/3">Username:</span>
          <span className="text-gray-700">{user.username}</span>
        </div>
        
        <div className="flex border-b pb-3">
          <span className="font-semibold w-1/3">Email:</span>
          <span className="text-gray-700">{user.email || 'Not provided'}</span>
        </div>
        
        <div className="flex border-b pb-3">
          <span className="font-semibold w-1/3">First Name:</span>
          <span className="text-gray-700">{user.first_name || 'Not provided'}</span>
        </div>
        
        <div className="flex pb-3">
          <span className="font-semibold w-1/3">Last Name:</span>
          <span className="text-gray-700">{user.last_name || 'Not provided'}</span>
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => loadProfile()}>Load Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage; 