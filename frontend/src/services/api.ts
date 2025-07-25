// apps/frontend/src/services/api.ts
import axios from 'axios';
import {
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  ApiResponse,
  Dog,
  CreateDogRequest
} from '@dog-walking-app/shared'

export type { User };

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://our-backend-url.com' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to all requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: LoginRequest) => 
    api.post<ApiResponse<AuthResponse>>('/auth/login', credentials),
  
  register: (userData: RegisterRequest) => 
    api.post<ApiResponse<AuthResponse>>('/auth/register', userData),
  
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },

  getCurrentUser: () => 
    api.get<ApiResponse<User>>('/auth/me'),
};

export const userApi = {
  getUsers: () => api.get<ApiResponse<User[]>>('/users'),
  createUser: (user: Omit<User, '_id' | 'createdAt'>) => 
    api.post<ApiResponse<User>>('/users', user),
  deleteUser: (id: string) =>
    api.delete<ApiResponse<null>>(`/users/${id}`),
};

export const dogApi = {
  getDogs: () => api.get<ApiResponse<Dog[]>>('/dogs'),
  createDog: (dogData: CreateDogRequest) => 
    api.post<ApiResponse<Dog>>('/dogs', dogData),
  updateDog: (id: string, dogData: Partial<CreateDogRequest>) =>
    api.put<ApiResponse<Dog>>(`/dogs/${id}`, dogData),
  deleteDog: (id: string) =>
    api.delete<ApiResponse<null>>(`/dogs/${id}`),
};
