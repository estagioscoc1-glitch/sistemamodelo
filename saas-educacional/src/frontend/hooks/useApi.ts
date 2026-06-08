'use client';

import { useState, useCallback } from 'react';
import { api, type ApiResponse } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

export function useApi<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      let response: ApiResponse<T>;
      switch (method) {
        case 'GET':
          response = await api.get<T>(endpoint);
          break;
        case 'DELETE':
          response = await api.delete<T>(endpoint);
          break;
        default:
          response = await api.get<T>(endpoint);
      }
      setState({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro na requisicao';
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
    }
  }, [endpoint, method]);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

export function useApiMutation<T, B = unknown>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(async (endpoint: string, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', body?: B) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      let response: ApiResponse<T>;
      switch (method) {
        case 'POST':
          response = await api.post<T>(endpoint, body);
          break;
        case 'PUT':
          response = await api.put<T>(endpoint, body);
          break;
        case 'PATCH':
          response = await api.patch<T>(endpoint, body);
          break;
        case 'DELETE':
          response = await api.delete<T>(endpoint);
          break;
      }
      setState({ data: response.data, isLoading: false, error: null });
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro na requisicao';
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
      throw err;
    }
  }, []);

  return { ...state, mutate };
}
