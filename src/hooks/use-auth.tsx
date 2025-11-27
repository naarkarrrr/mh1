'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Role = 'patient' | 'doctor' | 'admin';
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (role: Role) => void;
  logout: () => void;
};

const mockUsers: Record<Role, User> = {
  patient: {
    id: 'patient-001',
    name: 'Alex Ray',
    email: 'alex.ray@example.com',
    role: 'patient',
    avatar: 'https://picsum.photos/seed/patient1/100/100',
  },
  doctor: {
    id: 'doctor-001',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@hospital.com',
    role: 'doctor',
    avatar: 'https://picsum.photos/seed/doctor1/100/100',
  },
  admin: {
    id: 'admin-001',
    name: 'Maria Garcia',
    email: 'm.garcia@vlens.com',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/admin1/100/100',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('vital-lens-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('vital-lens-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (role: Role) => {
    setLoading(true);
    const userToLogin = mockUsers[role];
    localStorage.setItem('vital-lens-user', JSON.stringify(userToLogin));
    setUser(userToLogin);
    switch (role) {
      case 'patient':
        router.push('/patient/dashboard');
        break;
      case 'doctor':
        router.push('/doctor/dashboard');
        break;
      case 'admin':
        router.push('/admin/dashboard');
        break;
      default:
        router.push('/login');
    }
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('vital-lens-user');
    setUser(null);
    router.push('/login');
    setLoading(false);
  };
  
  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
