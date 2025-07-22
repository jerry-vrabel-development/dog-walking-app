export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'owner' | 'walker' | 'admin';
  phone?: string;
  address?: string;
  createdAt?: Date;
}

export interface Walker extends User {
  role: 'walker';
  experience: string;
  availability: string[];
  rating?: number;
  isAvailable: boolean;
}

export interface Owner extends User {
  role: 'owner';
  dogs: string[]; // Dog IDs
}
