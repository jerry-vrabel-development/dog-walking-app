// apps/frontend/src/services/api.ts
import axios from 'axios';
import { User } from '@dog-walking-app/shared'

export type { User };

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://our-backend-url.com' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userApi = {
  getUsers: () => api.get<User[]>('/users'),
  createUser: (user: Omit<User, '_id' | 'createdAt'>) => 
    api.post<User>('/users', user),
};
