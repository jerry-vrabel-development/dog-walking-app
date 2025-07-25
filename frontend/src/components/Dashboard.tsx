import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DogManagement } from './DogManagement';
import { UserManagement } from './UserManagement';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeAdminView, setActiveAdminView] = useState<'dashboard' | 'users' | 'stats' | 'dogs'>('dashboard');

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'owner':
        return <DogManagement />;
      
      case 'walker':
        return (
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Walker Dashboard
              </h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome, {user?.name}!
                </h3>
                <p className="text-gray-600">
                  Walk requests and earnings dashboard coming soon...
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'admin':
        if (activeAdminView === 'users') {
          return <UserManagement onBack={() => setActiveAdminView('dashboard')} />;
        }
        
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Admin Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    User Management
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Manage all users, walkers, and owners
                  </p>
                  <button 
                    onClick={() => setActiveAdminView('users')}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    View Users
                  </button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900 mb-2">
                    System Stats
                  </h3>
                  <p className="text-green-700 text-sm">
                    View platform statistics and metrics
                  </p>
                  <button 
                    onClick={() => setActiveAdminView('stats')}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                  >
                    View Stats
                  </button>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900 mb-2">
                    All Dogs
                  </h3>
                  <p className="text-purple-700 text-sm">
                    View and manage all registered dogs
                  </p>
                  <button 
                    onClick={() => setActiveAdminView('dogs')}
                    className="mt-3 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                  >
                    View Dogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">
              Unknown user role
            </h2>
            <p className="text-gray-600 mt-2">
              Please contact support for assistance.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dog Walker App
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}!
                {user?.role && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {user.role}
                  </span>
                )}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};
