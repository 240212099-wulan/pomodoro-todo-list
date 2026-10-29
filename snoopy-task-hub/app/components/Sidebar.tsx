"use client";
import type { User, View } from "../types";

const NAV: { id: View; label: string }[] = [
  { id: "dashboard", label: "🏠 Dashboard" },
  { id: "tasks", label: "✅ My Tasks" },
  { id: "pomodoro", label: "⏱️ Quick Pomodoro" },
  { id: "profile", label: "👤 Profile" },
  { id: "settings", label: "⚙️ Settings" },
];

type Props = { open: boolean; user: User; view: View; onNav: (v: View) => void; onClose: () => void; onLogout: () => void };

export default function Sidebar({ open, user, view, onNav, onClose, onLogout }: Props) {
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside aria-hidden={!open} className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col rounded-r-3xl bg-card p-5 shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/40 text-3xl">{user.avatar}</span>
          <div>
            <p className="font-display text-lg font-semibold">{user.name}</p>
            <span className="rounded-full bg-sage px-2 py-0.5 text-xs font-bold text-[#4a5a2b]">Pelajar & Developer</span>
          </div>
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => onNav(n.id)} className={`rounded-2xl px-4 py-3 text-left font-semibold transition ${view === n.id ? "bg-btn text-btnink" : "hover:bg-line"}`}>{n.label}</button>
          ))}
        </nav>
        <button onClick={onLogout} className="rounded-2xl px-4 py-3 text-left font-semibold text-coral hover:bg-line">🚪 Log Out</button>
      </aside>
    </>
  );
}
