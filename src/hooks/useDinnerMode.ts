import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'steward-dinner-mode';

export function useDinnerMode() {
  const [isDinner, setIsDinner] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Sync the HTML attribute whenever the state changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDinner) {
      html.setAttribute('data-theme', 'dinner');
    } else {
      html.removeAttribute('data-theme');
    }
  }, [isDinner]);

  const toggleDinner = useCallback(() => {
    setIsDinner((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  return { isDinner, toggleDinner };
}
