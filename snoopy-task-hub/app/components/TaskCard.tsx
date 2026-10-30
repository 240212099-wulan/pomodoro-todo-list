"use client";
import type { Task, TaskActions } from "../types";
import { PRIO, fmtDate, highlight } from "../lib/utils";

export default function TaskCard({ t, a, full }: { t: Task; a: TaskActions; full?: boolean }) {
  return (
    <li className={`card flex gap-4 transition ${t.done ? "opacity-60" : ""}`}>
      <input type="checkbox" checked={t.done} onChange={() => a.onToggle(t.id)} aria-label={`Selesaikan ${t.title}`} className="mt-1 h-5 w-5 shrink-0 accent-[#6b4c3b]" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-display text-lg font-semibold ${t.done ? "line-through" : ""}`}>{highlight(t.title, a.q)}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${PRIO[t.priority].cls}`}>{PRIO[t.priority].label}</span>
        </div>
        {t.description && <p className="mt-1 truncate text-sm text-muted">{t.description}</p>}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>🏷️ {highlight(t.category, a.q)}</span>
          <span>📅 {fmtDate(t.deadline)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {!t.done && <button onClick={() => a.onFocus(t)} className="btn px-4 py-1.5 text-sm">⏱️ Fokus</button>}
          {full && (
            <>
              <button onClick={() => a.onEdit(t)} className="ghost py-1.5 text-sm" aria-label="Edit">✏️ Edit</button>
              <button onClick={() => a.onDelete(t.id)} className="ghost py-1.5 text-sm" aria-label="Hapus">🗑️ Hapus</button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
