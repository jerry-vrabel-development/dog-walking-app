import { User } from './user';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'owner' | 'walker';
    phone?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
