"use client";
import { useState } from "react";
import type { Task, User } from "../types";
import { fmtDate } from "../lib/utils";

type Props = { user: User; query: string; onQuery: (q: string) => void; onMenu: () => void; urgent: Task[]; notify: boolean; onProfile: () => void };

export default function Header({ user, query, onQuery, onMenu, urgent, notify, onProfile }: Props) {
  const [open, setOpen] = useState(false);
  const n = notify ? urgent.length : 0;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <button aria-label="Buka menu" onClick={onMenu} className="rounded-xl p-2 text-xl hover:bg-line">☰</button>
        <div className="flex items-center gap-2 font-display text-lg font-semibold">
          <span aria-hidden>🐶</span><span className="hidden md:inline">Snoopy Task Hub</span>
        </div>
        <label className="relative mx-auto max-w-md flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden>🔍</span>
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Cari judul atau kategori…" aria-label="Cari tugas" className="input rounded-full py-2 pl-10" />
        </label>
        <div className="relative">
          <button aria-label="Notifikasi" onClick={() => setOpen(!open)} className="relative rounded-xl p-2 text-xl hover:bg-line">
            🔔
            {n > 0 && <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{n}</span>}
          </button>
          {open && (
            <div className="card absolute right-0 top-12 w-72 p-4">
              <p className="font-display font-semibold">Deadline terdekat</p>
              {n === 0 ? <p className="mt-2 text-sm text-muted">Belum ada tugas yang mepet. Santai dulu ☕</p> : (
                <ul className="mt-2 space-y-2 text-sm">
                  {urgent.map((t) => <li key={t.id}><b>{t.title}</b><br /><span className="text-muted">📅 {fmtDate(t.deadline)}</span></li>)}
                </ul>
              )}
            </div>
          )}
        </div>
        <button onClick={onProfile} className="flex items-center gap-2 rounded-full border border-line bg-bg py-1 pl-1 pr-3 hover:bg-line">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/40 text-lg">{user.avatar}</span>
          <span className="hidden text-sm font-bold sm:inline">{user.name}</span>
        </button>
      </div>
    </header>
  );
}
