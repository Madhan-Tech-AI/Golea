import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'faculty' | 'student';
  department?: string;
  studentId?: string;
  facultyId?: string;
  avatar?: string;
  phone?: string;
  joinDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signup: (userData: Omit<User, 'id' | 'joinDate'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Simple in-memory storage for demo
let users: User[] = [];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signup: async (userData: Omit<User, 'id' | 'joinDate'>) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
          throw new Error('User already exists with this email');
        }
        
        const newUser: User = {
          ...userData,
          id: `${userData.role}_${Date.now()}`,
          joinDate: new Date().toISOString(),
        };
        
        users.push(newUser);
        set({ user: newUser, isAuthenticated: true });
      },

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = users.find(u => u.email === email);
        
        if (!user) {
          throw new Error('No account found with this email');
        }
        
        // For demo purposes, accept any password
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });
          
          // Update in users array
          const userIndex = users.findIndex(u => u.id === user.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
