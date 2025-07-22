// apps/frontend/src/services/api.ts
import axios from 'axios';
import { Dog, Walk, User, ApiResponse, CreateDogRequest } from '@dog-walking-app/shared';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://our-backend-url.com' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface User {
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
}

export const userApi = {
  getUsers: () => api.get<User[]>('/users'),
  createUser: (user: Omit<User, '_id' | 'createdAt'>) => 
    api.post<User>('/users', user),
};
