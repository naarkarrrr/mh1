'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Role = 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'lab_technician' | 'staff';

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
  admin: {
    id: 'admin-001',
    name: 'Dr. James Wilson',
    email: 'j.wilson@hms.com',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/admin/100/100',
  },
  doctor: {
    id: 'doctor-001',
    name: 'Dr. Allison Cameron',
    email: 'a.cameron@hms.com',
    role: 'doctor',
    avatar: 'https://picsum.photos/seed/doctor/100/100',
  },
  nurse: {
    id: 'nurse-001',
    name: 'Robert Chase',
    email: 'r.chase@hms.com',
    role: 'nurse',
    avatar: 'https://picsum.photos/seed/nurse/100/100',
  },
  pharmacist: {
    id: 'pharm-001',
    name: 'Lisa Cuddy',
    email: 'l.cuddy@hms.com',
    role: 'pharmacist',
    avatar: 'https://picsum.photos/seed/pharmacist/100/100',
  },
  lab_technician: {
    id: 'lab-001',
    name: 'Eric Foreman',
    email: 'e.foreman@hms.com',
    role: 'lab_technician',
    avatar: 'https://picsum.photos/seed/labtech/100/100',
  },
  staff: {
      id: 'staff-001',
      name: 'Chris Taub',
      email: 'c.taub@hms.com',
      role: 'staff',
      avatar: 'https://picsum.photos/seed/staff/100/100',
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hms-core-user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // Basic validation
        if (mockUsers[parsedUser.role]) {
            setUser(parsedUser);
        } else {
            localStorage.removeItem('hms-core-user');
        }
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('hms-core-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (role: Role) => {
    setLoading(true);
    const userToLogin = mockUsers[role];
    localStorage.setItem('hms-core-user', JSON.stringify(userToLogin));
    setUser(userToLogin);
    
    // Redirect based on role
    router.push(`/${role}/dashboard`);

    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('hms-core-user');
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
