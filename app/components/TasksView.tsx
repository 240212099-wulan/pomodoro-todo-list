"use client";
import { useState } from "react";
import type { Task, TaskActions } from "../types";
import { byDeadline, matches } from "../lib/utils";
import TaskCard from "./TaskCard";

type Tab = "all" | "active" | "done";

export default function TasksView({ tasks, a, onAdd }: { tasks: Task[]; a: TaskActions; onAdd: () => void }) {
  const [tab, setTab] = useState<Tab>("all");
  const count = { all: tasks.length, active: tasks.filter((t) => !t.done).length, done: tasks.filter((t) => t.done).length };
  const tabs: [Tab, string][] = [["all", "Semua"], ["active", "Aktif"], ["done", "Selesai"]];
  const list = tasks.filter((t) => matches(t, a.q) && (tab === "all" || (tab === "done") === t.done)).sort(byDeadline);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold">My Tasks ✅</h1>
        <button onClick={onAdd} className="btn">+ Tambah Tugas Baru</button>
      </div>
      <div className="flex gap-2 overflow-x-auto" role="tablist">
        {tabs.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${tab === id ? "bg-btn text-btnink" : "bg-card border border-line hover:bg-line"}`}>
            {label} ({count[id]})
          </button>
        ))}
      </div>
      {list.length === 0 ? <p className="card text-center text-muted">Belum ada tugas di sini 🐾</p> : (
        <ul className="space-y-3">{list.map((t) => <TaskCard key={t.id} t={t} a={a} full />)}</ul>
      )}
    </div>
  );
}
