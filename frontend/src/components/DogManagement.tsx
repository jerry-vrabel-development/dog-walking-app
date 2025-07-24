import React, { useState } from 'react';
import { AddDogForm } from './AddDogForm';
import { DogList } from './DogList';

export const DogManagement: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDogAdded = () => {
    setShowAddForm(false);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh of dog list
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Dogs</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New Dog
          </button>
        )}
      </div>

      {showAddForm && (
        <AddDogForm 
          onDogAdded={handleDogAdded}
          onCancel={handleCancel}
        />
      )}

      <DogList refreshTrigger={refreshTrigger} />
    </div>
  );
};
