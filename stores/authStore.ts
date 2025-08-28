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
  login: (email: string, password: string, role: 'faculty' | 'student') => Promise<void>;
  loginWithOTP: (phone: string, otp: string, role: 'faculty' | 'student') => Promise<void>;
  loginWithId: (id: string, role: 'faculty' | 'student') => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock users for testing
const mockUsers = {
  faculty: [
    {
      id: 'f1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'faculty' as const,
      department: 'Computer Science',
      facultyId: 'FAC001',
      phone: '+1234567890',
      joinDate: '2020-08-15',
    },
    {
      id: 'f2',
      name: 'Prof. Mike Chen',
      email: 'mike.chen@university.edu',
      role: 'faculty' as const,
      department: 'Information Technology',
      facultyId: 'FAC002',
      phone: '+1234567891',
      joinDate: '2019-09-01',
    },
  ],
  student: [
    {
      id: 's1',
      name: 'John Doe',
      email: 'john.doe@student.edu',
      role: 'student' as const,
      department: 'Computer Science',
      studentId: 'STU001',
      phone: '+1234567892',
      joinDate: '2022-08-20',
    },
    {
      id: 's2',
      name: 'Emma Wilson',
      email: 'emma.wilson@student.edu',
      role: 'student' as const,
      department: 'Information Technology',
      studentId: 'STU002',
      phone: '+1234567893',
      joinDate: '2022-08-20',
    },
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string, role: 'faculty' | 'student') => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockUsers[role];
        const user = users.find(u => u.email === email);
        
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },

      loginWithOTP: async (phone: string, otp: string, role: 'faculty' | 'student') => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockUsers[role];
        const user = users.find(u => u.phone === phone);
        
        if (user && otp === '123456') {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid OTP');
        }
      },

      loginWithId: async (id: string, role: 'faculty' | 'student') => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockUsers[role];
        const user = users.find(u => 
          (role === 'faculty' && u.facultyId === id) || 
          (role === 'student' && u.studentId === id)
        );
        
        if (user) {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid ID');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);