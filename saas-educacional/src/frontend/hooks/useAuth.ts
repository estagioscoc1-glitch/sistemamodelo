'use client';

import { useState, useEffect, useCallback } from 'react';
import { login as loginApi, logout as logoutApi, getStoredUser, isAuthenticated } from '@/lib/auth';

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser && isAuthenticated()) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await loginApi(email, senha);
      setUser(loggedUser);
      setIsLoggedIn(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    logoutApi();
  }, []);

  return { user, isLoggedIn, isLoading, error, login, logout };
}
