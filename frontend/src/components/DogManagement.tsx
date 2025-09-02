import React, { useState } from 'react';
import { Dog } from '@dog-walking-app/shared';
import { AddDogForm } from './AddDogForm';
import { EditDogForm } from './EditDogForm';
import { DogList } from './DogList';
import { DogProfile } from './DogProfile';
import { dogApi } from '../services/api';

type ViewMode = 'list' | 'add' | 'edit' | 'profile';

interface DogManagementProps {
  isAdminView?: boolean;
}

export const DogManagement: React.FC<DogManagementProps> = ({ isAdminView = false }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState('');

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDogAdded = () => {
    setViewMode('list');
    triggerRefresh();
  };

  const handleDogUpdated = () => {
    setViewMode('list');
    setSelectedDog(null);
    triggerRefresh();
  };

  const handleEditDog = (dog: Dog) => {
    setSelectedDog(dog);
    setViewMode('edit');
  };

  const handleViewProfile = (dog: Dog) => {
    setSelectedDog(dog);
    setViewMode('profile');
  };

  const handleDeleteFromProfile = async () => {
    if (!selectedDog) return;
    
    try {
      await dogApi.deleteDog(selectedDog._id!);
      setViewMode('list');
      setSelectedDog(null);
      triggerRefresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to delete dog';
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedDog(null);
    setError('');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDog(null);
    setError('');
  };

  const renderHeader = () => {
    const title = isAdminView ? 'All Dogs (Admin View)' : 'My Dogs';
    
    switch (viewMode) {
      case 'add':
        return (
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
        );
      case 'edit':
        return (
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
        );
      case 'profile':
        return null; // DogProfile handles its own header
      default:
        return (
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {!isAdminView && ( // Only show "Add New Dog" for owners, not admins
              <button
                onClick={() => setViewMode('add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New Dog
              </button>
            )}
          </div>
        );
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError('')}
            className="ml-2 text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      );
    }

    switch (viewMode) {
      case 'add':
        // Only allow owners to add dogs, not admins viewing all dogs
        return !isAdminView ? (
          <AddDogForm
            onDogAdded={handleDogAdded}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Admins cannot add new dogs. Only dog owners can add their own dogs.
          </div>
        );
      case 'edit':
        return selectedDog ? (
          <EditDogForm
            dog={selectedDog}
            onDogUpdated={handleDogUpdated}
            onCancel={handleCancel}
          />
        ) : null;
      case 'profile':
        return selectedDog ? (
          <DogProfile
            dog={selectedDog}
            onEdit={() => setViewMode('edit')}
            onDelete={handleDeleteFromProfile}
            onBack={handleBackToList}
          />
        ) : null;
      default:
        return (
          <DogList
            refreshTrigger={refreshTrigger}
            onEditDog={handleEditDog}
            onViewProfile={handleViewProfile}
            isAdminView={isAdminView}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderHeader()}
      {error && viewMode === 'list' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => setError('')}
            className="ml-2 text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
      {renderContent()}
    </div>
  );
};
