'use client';

import { useState, useCallback } from 'react';

/**
 * SSR-safe localStorage hook.
 *
 * - On server: returns `initialValue` (no localStorage access).
 * - On client: reads from localStorage on first render; writes on every state update.
 * - JSON serialization is handled internally.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Quota exceeded or private browsing — silently ignore
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
