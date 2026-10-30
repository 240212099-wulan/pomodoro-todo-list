"use client";
import type { Settings } from "../types";
import Toggle from "./Toggle";

export default function SettingsView({ s, onChange, onLogout }: { s: Settings; onChange: (s: Settings) => void; onLogout: () => void }) {
  const num = (k: "focus" | "short" | "long", label: string) => (
    <label className="block text-sm font-semibold">{label} (menit)
      <input type="number" min={1} max={120} value={s[k]} onChange={(e) => onChange({ ...s, [k]: Math.min(120, Math.max(1, Number(e.target.value) || 1)) })} className="input mt-1 font-normal" />
    </label>
  );
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h1 className="font-display text-3xl font-semibold">Settings ⚙️</h1>
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <div><p className="font-bold">Mode Gelap</p><p className="text-sm text-muted">{s.dark ? "Deep Espresso 🌙" : "Warm Cream ☀️"}</p></div>
          <Toggle on={s.dark} onChange={(v) => onChange({ ...s, dark: v })} label="Mode gelap" />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="font-bold">Notifikasi Deadline</p><p className="text-sm text-muted">Ingatkan tugas yang hampir jatuh tempo</p></div>
          <Toggle on={s.notify} onChange={(v) => onChange({ ...s, notify: v })} label="Notifikasi deadline" />
        </div>
      </section>
      <section className="card space-y-3">
        <h2 className="font-display text-xl font-semibold">Pomodoro</h2>
        <div className="grid gap-3 sm:grid-cols-3">{num("focus", "Focus")}{num("short", "Short Break")}{num("long", "Long Break")}</div>
      </section>
      <button onClick={onLogout} className="btn w-full bg-coral text-white">🚪 Log Out</button>
    </div>
  );
}
