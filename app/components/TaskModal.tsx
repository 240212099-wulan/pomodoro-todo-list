"use client";
import { useState } from "react";
import type { Priority, Task } from "../types";

const EMPTY: Task = { id: "", title: "", description: "", deadline: "", priority: "medium", category: "", done: false };

export default function TaskModal({ task, onSave, onClose }: { task: Task | null; onSave: (t: Task) => void; onClose: () => void }) {
  const [f, setF] = useState<Task>(task ?? EMPTY);
  const set = <K extends keyof Task>(k: K, v: Task[K]) => setF((p) => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.title.trim()) return;
    onSave({ ...f, title: f.title.trim(), category: f.category.trim() || "Umum", id: f.id || Date.now().toString() });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="card max-h-[90vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-[2rem] p-6">
        <h2 className="font-display text-2xl font-semibold">{task ? "Edit Tugas ✏️" : "Tugas Baru 🐾"}</h2>
        <label className="block text-sm font-semibold">Judul Tugas
          <input required autoFocus value={f.title} onChange={(e) => set("title", e.target.value)} className="input mt-1 font-normal" />
        </label>
        <label className="block text-sm font-semibold">Deskripsi
          <textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} className="input mt-1 font-normal" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Deadline
            <input type="date" value={f.deadline} onChange={(e) => set("deadline", e.target.value)} className="input mt-1 font-normal" />
          </label>
          <label className="block text-sm font-semibold">Priority
            <select value={f.priority} onChange={(e) => set("priority", e.target.value as Priority)} className="input mt-1 font-normal">
              <option value="low">Low 🟢</option><option value="medium">Medium 🟡</option><option value="high">High 🔴</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-semibold">Kategori
          <input list="cats" value={f.category} onChange={(e) => set("category", e.target.value)} placeholder="Kuliah, Project, Personal…" className="input mt-1 font-normal" />
          <datalist id="cats"><option value="Kuliah" /><option value="Project" /><option value="Personal" /></datalist>
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="ghost">Batal</button>
          <button type="submit" className="btn">Simpan</button>
        </div>
      </form>
    </div>
  );
}
