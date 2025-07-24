import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { DogManagement } from './DogManagement';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

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
          {user?.role === 'owner' ? (
            <DogManagement />
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
};
