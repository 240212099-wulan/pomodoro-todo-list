"use client";
import { useEffect, useState } from "react";

export type Mode = "focus" | "short" | "long";
type Durations = { focus: number; short: number; long: number };

export function usePomodoro(d: Durations) {
  const [mode, setMode] = useState<Mode>("focus");
  const [left, setLeft] = useState(d.focus * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  useEffect(() => { if (running && left === 0) setRunning(false); }, [left, running]);

  const switchMode = (m: Mode) => { setMode(m); setRunning(false); setLeft(d[m] * 60); };
  const reset = () => { setRunning(false); setLeft(d[mode] * 60); };
  const pad = (n: number) => String(n).padStart(2, "0");
  const label = `${pad(Math.floor(left / 60))}:${pad(left % 60)}`;
  const progress = 1 - left / (d[mode] * 60);
  return { mode, left, running, setRunning, switchMode, reset, label, progress };
}
