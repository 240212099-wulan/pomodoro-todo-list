"use client";
import { useEffect, useState } from "react";

// Baca localStorage setelah mount agar tidak ada hydration error.
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) setValue(JSON.parse(s));
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value, ready]);
  return [value, setValue, ready] as const;
}
