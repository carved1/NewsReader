import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password, role = 'regular') => {
    if (!username?.trim() || !password?.trim()) {
      throw new Error('Username and password are required');
    }

    const normalizedRole = role === 'admin' ? 'admin' : 'regular';
    setUser({
      username: username.trim(),
      role: normalizedRole,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => user !== null;

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
