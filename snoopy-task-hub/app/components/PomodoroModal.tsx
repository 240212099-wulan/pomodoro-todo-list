"use client";
import type { Settings, Task } from "../types";
import { usePomodoro, type Mode } from "../hooks/usePomodoro";

const MODES: [Mode, string][] = [["focus", "Focus"], ["short", "Short Break"], ["long", "Long Break"]];

export function PomodoroPanel({ settings, task, onDone }: { settings: Settings; task?: Task; onDone?: () => void }) {
  const p = usePomodoro(settings);
  return (
    <div className="text-center">
      {task && <p className="mb-3 truncate text-sm text-muted">Sedang fokus: <b className="text-ink">{task.title}</b></p>}
      <div className="flex justify-center gap-1 rounded-full bg-bg p-1" role="tablist">
        {MODES.map(([m, l]) => (
          <button key={m} role="tab" aria-selected={p.mode === m} onClick={() => p.switchMode(m)} className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${p.mode === m ? "bg-btn text-btnink" : "hover:bg-line"}`}>{l}</button>
        ))}
      </div>
      <p className="my-6 font-display text-7xl font-semibold tabular-nums" aria-live="off">{p.label}</p>
      <div className="mx-auto h-2 w-full max-w-xs overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${p.progress * 100}%` }} />
      </div>
      {p.left === 0 && <p className="mt-4 font-semibold">Sesi selesai! Waktunya istirahat sebentar 🎉</p>}
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={() => p.setRunning(!p.running)} disabled={p.left === 0} className="btn min-w-28 disabled:opacity-40">{p.running ? "⏸ Pause" : "▶ Start"}</button>
        <button onClick={p.reset} className="ghost">↺ Reset</button>
      </div>
      {onDone && <button onClick={onDone} className="ghost mt-4 w-full">✓ Tandai Tugas Ini Selesai</button>}
    </div>
  );
}

export default function PomodoroModal({ task, settings, onDone, onClose }: { task: Task; settings: Settings; onDone: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="card w-full max-w-md rounded-[2rem] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">⏱️ Waktu Fokus</h2>
          <button onClick={onClose} aria-label="Tutup" className="rounded-xl p-2 hover:bg-line">✕</button>
        </div>
        <PomodoroPanel settings={settings} task={task} onDone={onDone} />
      </div>
    </div>
  );
}
