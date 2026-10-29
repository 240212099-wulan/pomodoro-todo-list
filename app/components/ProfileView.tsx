"use client";
import { useState } from "react";
import type { User } from "../types";

const AVATARS = ["🐶", "🐱", "🐰", "🦊", "🐼"];

export default function ProfileView({ user, onSave }: { user: User; onSave: (u: User) => void }) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [saved, setSaved] = useState(false);
  return (
    <div className="mx-auto max-w-md space-y-5">
      <div className="card rounded-[2rem] p-8 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-accent/40 text-6xl">{avatar}</div>
        <h1 className="mt-3 font-display text-2xl font-semibold">{name || "…"}</h1>
        <p className="text-sm text-muted">Pelajar & Developer</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) { onSave({ name: name.trim(), avatar }); setSaved(true); } }} className="card space-y-4">
        <h2 className="font-display text-xl font-semibold">Edit Profil</h2>
        <label className="block text-sm font-semibold">Nickname
          <input value={name} maxLength={20} onChange={(e) => { setName(e.target.value); setSaved(false); }} className="input mt-1 font-normal" />
        </label>
        <div>
          <p className="text-sm font-semibold">Avatar</p>
          <div className="mt-2 flex gap-2">
            {AVATARS.map((a) => (
              <button type="button" key={a} onClick={() => { setAvatar(a); setSaved(false); }} aria-pressed={avatar === a} className={`grid h-12 w-12 place-items-center rounded-2xl border-2 text-2xl transition ${avatar === a ? "border-accent bg-accent/30" : "border-line"}`}>{a}</button>
            ))}
          </div>
        </div>
        <button type="submit" className="btn w-full">Simpan Profil</button>
        {saved && <p className="text-center text-sm text-muted">Profil tersimpan 🐾</p>}
      </form>
    </div>
  );
}
