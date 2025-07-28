import React from 'react';
import { Dog } from '@dog-walking-app/shared';

interface DogProfileProps {
  dog: Dog;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const DogProfile: React.FC<DogProfileProps> = ({ dog, onEdit, onDelete, onBack }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${dog.name}? This action cannot be undone.`)) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Dog List
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Dog Header */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{dog.name}</h1>
            <div className="flex items-center mt-1">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {dog.breed}
              </span>
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {dog.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-900">{dog.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Breed:</span>
                <span className="ml-2 text-gray-900">{dog.breed}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Age:</span>
                <span className="ml-2 text-gray-900">{dog.age} years old</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className={`ml-2 ${dog.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {dog.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Emergency Contact</h3>
            <div className="text-gray-900">
              {dog.emergencyContact}
            </div>
          </div>
        </div>

        {/* Walking Instructions */}
        {dog.walkingInstructions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Walking Instructions</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">{dog.walkingInstructions}</p>
            </div>
          </div>
        )}

        {/* Medical Notes */}
        {dog.medicalNotes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Notes</h3>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-800 whitespace-pre-wrap">{dog.medicalNotes}</p>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Dog ID:</span>
              <span className="ml-2 font-mono text-xs">{dog._id}</span>
            </div>
            <div>
              <span className="font-medium">Owner ID:</span>
              <span className="ml-2 font-mono text-xs">{dog.ownerId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
