import { api } from './api';

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('auth_user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}

export async function login(email: string, senha: string): Promise<User> {
  const response = await api.post<LoginResponse>('/auth/login', { email, senha });
  const { token, refreshToken, user } = response.data;

  localStorage.setItem('auth_token', token);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('auth_user', JSON.stringify(user));

  return user;
}

export function logout(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/login';
}

export async function refreshToken(): Promise<string | null> {
  const currentRefreshToken = localStorage.getItem('refresh_token');
  if (!currentRefreshToken) return null;

  try {
    const response = await api.post<{ token: string }>('/auth/refresh', {
      refreshToken: currentRefreshToken,
    });
    const newToken = response.data.token;
    localStorage.setItem('auth_token', newToken);
    return newToken;
  } catch {
    logout();
    return null;
  }
}
