'use client'

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import type {UserRead} from "@/services/IsyBuildApi";

// interface AuthUser {
//   id: number;
//   email: string;
//   first_name: string | null;
//   last_name: string | null;
//   date_joined: string;
//   is_active: boolean;
//   role: string;
// }

interface AuthContextType {
  user: UserRead | null;
  setUser: (user: UserRead | null) => void;
  clearUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserRead | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');


    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
      }
    }
  }, []);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
