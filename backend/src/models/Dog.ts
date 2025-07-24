import mongoose, { Schema, Document } from 'mongoose';
import { Dog as DogType } from '@dog-walking-app/shared';

export interface DogDocument extends Omit<DogType, '_id'>, Document {}

const dogSchema = new Schema<DogDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  ownerId: {
    type: String,
    required: true,
    ref: 'User'
  },
  walkingInstructions: {
    type: String,
    trim: true
  },
  emergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  medicalNotes: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Dog = mongoose.model<DogDocument>('Dog', dogSchema);
