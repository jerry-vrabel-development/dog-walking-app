import React, { useState, useEffect } from 'react';
import { Dog } from '@dog-walking-app/shared';
import { dogApi } from '../services/api';

interface EditDogFormProps {
  dog: Dog;
  onDogUpdated: () => void;
  onCancel: () => void;
}

export const EditDogForm: React.FC<EditDogFormProps> = ({ dog, onDogUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: 1,
    walkingInstructions: '',
    emergencyContact: '',
    medicalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with dog data
  useEffect(() => {
    setFormData({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      walkingInstructions: dog.walkingInstructions || '',
      emergencyContact: dog.emergencyContact,
      medicalNotes: dog.medicalNotes || ''
    });
  }, [dog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dogApi.updateDog(dog._id!, formData);
      onDogUpdated();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to update dog';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Edit {dog.name}</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Dog Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter dog's name"
            />
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
              Breed *
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter dog's breed"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (years) *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              max="25"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact *
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency contact info"
            />
          </div>
        </div>

        <div>
          <label htmlFor="walkingInstructions" className="block text-sm font-medium text-gray-700 mb-1">
            Walking Instructions
          </label>
          <textarea
            id="walkingInstructions"
            name="walkingInstructions"
            value={formData.walkingInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special walking instructions..."
          />
        </div>

        <div>
          <label htmlFor="medicalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Medical Notes
          </label>
          <textarea
            id="medicalNotes"
            name="medicalNotes"
            value={formData.medicalNotes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any medical conditions or notes..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating Dog...' : 'Update Dog'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
