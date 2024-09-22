'use client'

import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

import Cookies from "js-cookie";

// Define the structure for the authenticated user
interface AuthUser {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  date_joined: string;
  is_active: boolean;
  role: string;
}

// Define the context type including user and setters
interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  clearUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context with the AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);


  useEffect(() => {
    const storedUser = Cookies.get('user'); // If you store user info in cookies

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Clear user when logging out
  console.log("user" + user)

  const clearUser = () => {
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{user, setUser, clearUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
