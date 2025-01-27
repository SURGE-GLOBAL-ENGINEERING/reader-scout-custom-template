import { isBrowser } from "@/utils/helpers";
import { useState, useEffect } from "react";

// Internal helper functions
const getStorageKey = (key: string): string => `app:${key}`;

const getStorageValue = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser()) return defaultValue;

  try {
    const item = window.localStorage.getItem(getStorageKey(key));
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const setStorageValue = <T>(key: string, value: T): void => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

// Main hook for React components
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with stored value or initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStorageValue(key, initialValue);
  });

  // Update localStorage when state changes
  useEffect(() => {
    setStorageValue(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
