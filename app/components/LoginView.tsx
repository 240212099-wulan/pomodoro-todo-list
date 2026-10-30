"use client";
import { useState } from "react";
export default function LoginView({ onSubmit, onBack }: { onSubmit: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState("");
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSubmit(name.trim()); }} className="card w-full max-w-md rounded-[2rem] p-8">
        <div className="text-center text-5xl" aria-hidden>🐾</div>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold">Kenalan Dulu Yuk!</h2>
        <label className="mt-6 block text-sm font-semibold" htmlFor="nick">Nickname</label>
        <input id="nick" autoFocus required maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Lulu" className="input mt-1" />
        <button type="submit" className="btn mt-5 w-full">Masuk ke Dashboard </button>
        <button type="button" onClick={onBack} className="mt-3 w-full text-sm text-muted hover:underline">← Kembali</button>
      </form>
    </main>
  );
}
