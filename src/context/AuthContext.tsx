
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'student' | 'club' | 'admin';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  department?: string;
  year?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Predefined users for the app
const PREDEFINED_USERS: Record<string, { password: string; user: User }> = {
  'admin@inloop.com': {
    password: 'admin',
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@inloop.com',
      role: 'admin',
      avatar: '/placeholder.svg',
      bio: 'System Administrator',
      department: 'Administration',
      year: 0,
    },
  },
  'club@inloop.com': {
    password: 'club123',
    user: {
      id: '2',
      username: 'Computer Science Club',
      email: 'club@inloop.com',
      role: 'club',
      avatar: '/placeholder.svg',
      bio: 'Official Computer Science Club',
      department: 'Computer Science',
      year: 0,
    },
  },
  'student@inloop.com': {
    password: 'student123',
    user: {
      id: '3',
      username: 'John Doe',
      email: 'student@inloop.com',
      role: 'student',
      avatar: '/placeholder.svg',
      bio: 'Computer Science Student',
      department: 'Computer Science',
      year: 3,
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('inloop_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerEmail = email.toLowerCase();
    
    // Check predefined users
    if (PREDEFINED_USERS[lowerEmail] && PREDEFINED_USERS[lowerEmail].password === password) {
      const loggedInUser = PREDEFINED_USERS[lowerEmail].user;
      setUser(loggedInUser);
      localStorage.setItem('inloop_user', JSON.stringify(loggedInUser));
      return true;
    }
    
    // Check localStorage for other users
    const storedUsers = JSON.parse(localStorage.getItem('inloop_users') || '{}');
    
    if (storedUsers[lowerEmail] && storedUsers[lowerEmail].password === password) {
      const loggedInUser = storedUsers[lowerEmail].user;
      setUser(loggedInUser);
      localStorage.setItem('inloop_user', JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const signup = async (
    username: string, 
    email: string, 
    password: string, 
    role: UserRole
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerEmail = email.toLowerCase();
    
    // Check if email already exists in predefined users
    if (PREDEFINED_USERS[lowerEmail]) {
      return false;
    }
    
    // Check if email already exists in stored users
    const storedUsers = JSON.parse(localStorage.getItem('inloop_users') || '{}');
    
    if (storedUsers[lowerEmail]) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email: lowerEmail,
      role,
      avatar: '/placeholder.svg',
    };
    
    // Store new user
    storedUsers[lowerEmail] = { password, user: newUser };
    localStorage.setItem('inloop_users', JSON.stringify(storedUsers));
    
    // Auto login
    setUser(newUser);
    localStorage.setItem('inloop_user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inloop_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('inloop_user', JSON.stringify(updatedUser));
    
    // Also update in the stored users if it's not a predefined user
    if (!PREDEFINED_USERS[user.email]) {
      const storedUsers = JSON.parse(localStorage.getItem('inloop_users') || '{}');
      
      if (storedUsers[user.email]) {
        storedUsers[user.email].user = updatedUser;
        localStorage.setItem('inloop_users', JSON.stringify(storedUsers));
      }
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
