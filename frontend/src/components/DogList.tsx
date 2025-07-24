import React, { useState, useEffect } from 'react';
import { Dog } from '@dog-walking-app/shared';
import { dogApi } from '../services/api';

interface DogListProps {
  refreshTrigger: number;
}

export const DogList: React.FC<DogListProps> = ({ refreshTrigger }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const response = await dogApi.getDogs();
      setDogs(response.data.data);
      setError('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to load dogs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [refreshTrigger]);

  const handleDeleteDog = async (dogId: string) => {
    if (!window.confirm('Are you sure you want to delete this dog?')) {
      return;
    }

    try {
      await dogApi.deleteDog(dogId);
      setDogs(dogs.filter(dog => dog._id !== dogId));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to delete dog';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600">Loading dogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">No dogs added yet</div>
        <div className="text-gray-400">Click "Add New Dog" to get started!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dogs.map((dog) => (
        <div key={dog._id} className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{dog.name}</h3>
                <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {dog.breed}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Age:</span> {dog.age} years old
                </div>
                <div>
                  <span className="font-medium">Emergency Contact:</span> {dog.emergencyContact}
                </div>
              </div>

              {dog.walkingInstructions && (
                <div className="mt-3">
                  <span className="font-medium text-gray-700">Walking Instructions:</span>
                  <p className="text-gray-600 mt-1">{dog.walkingInstructions}</p>
                </div>
              )}

              {dog.medicalNotes && (
                <div className="mt-3">
                  <span className="font-medium text-gray-700">Medical Notes:</span>
                  <p className="text-gray-600 mt-1">{dog.medicalNotes}</p>
                </div>
              )}
            </div>

            <div className="ml-4 flex space-x-2">
              <button
                onClick={() => handleDeleteDog(dog._id!)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
