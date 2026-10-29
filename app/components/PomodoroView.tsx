"use client";
import type { Settings } from "../types";
import { PomodoroPanel } from "./PomodoroModal";

export default function PomodoroView({ settings }: { settings: Settings }) {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-center font-display text-3xl font-semibold">Quick Pomodoro ⏱️</h1>
      <div className="card rounded-[2rem] p-6"><PomodoroPanel settings={settings} /></div>
    </div>
  );
}
