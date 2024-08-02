import { createContext, useContext, useState, useEffect } from 'react';

// Define the structure for the authenticated user, including permissions
interface AuthUser {
  role: string;
  permissions: string[];
}

// Define the context type including permissions
interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

// Create context with extended type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Fetch the authenticated user and their role and permissions
    const fetchUser = async () => {
      // Replace with your actual logic to fetch user data
      const response = await fetch('/api/user');
      const data = await response.json();

      setUser(data); // Ensure data includes role and permissions
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
