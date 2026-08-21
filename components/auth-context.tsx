'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const stored = localStorage.getItem('lokseva_auth') || sessionStorage.getItem('lokseva_auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.token && parsed?.user) {
            setToken(parsed.token);
            setUser(parsed.user);

            // Verify session with backend asynchronously
            try {
              const res = await fetch(`${apiUrl}/api/auth/me`, {
                headers: { Authorization: `Bearer ${parsed.token}` },
              });
              if (res.ok) {
                const freshUser = await res.json();
                setUser(freshUser);
                const updated = { token: parsed.token, user: freshUser };
                localStorage.setItem('lokseva_auth', JSON.stringify(updated));
                sessionStorage.setItem('lokseva_auth', JSON.stringify(updated));
              } else if (res.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('lokseva_auth');
                sessionStorage.removeItem('lokseva_auth');
                setToken(null);
                setUser(null);
              }
            } catch {
              // Network error - retain local session for offline resilience
            }
          }
        }
      } catch {
        // Storage access or JSON parse error
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = (newToken: string, newUser: AuthUser) => {
    const authData = { token: newToken, user: newUser };
    localStorage.setItem('lokseva_auth', JSON.stringify(authData));
    sessionStorage.setItem('lokseva_auth', JSON.stringify(authData));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('lokseva_auth');
    sessionStorage.removeItem('lokseva_auth');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
