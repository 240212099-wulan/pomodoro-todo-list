"use client";
import { useEffect, useState } from "react";
import type { Settings, Stage, Task, TaskActions, User, View } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { isUrgent } from "./lib/utils";
import LandingView from "./components/LandingView";
import LoginView from "./components/LoginView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import TasksView from "./components/TasksView";
import TaskModal from "./components/TaskModal";
import PomodoroModal from "./components/PomodoroModal";
import PomodoroView from "./components/PomodoroView";
import ProfileView from "./components/ProfileView";
import SettingsView from "./components/SettingsView";

const day = (n: number) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const SEED: Task[] = [
  { id: "1", title: "Belajar Next.js", description: "Pelajari routing dan state di App Router", deadline: day(1), priority: "high", category: "Kuliah", done: false },
  { id: "2", title: "Bikin UI Snoopy Task Hub", description: "Rapikan komponen dan warna tema", deadline: day(4), priority: "medium", category: "Project", done: false },
  { id: "3", title: "Beli kopi ☕", description: "", deadline: day(7), priority: "low", category: "Personal", done: true },
];
const DEFAULTS: Settings = { dark: false, notify: true, focus: 25, short: 5, long: 15 };

export default function Home() {
  const [user, setUser, ready] = useLocalStorage<User | null>("sth-user", null);
  const [tasks, setTasks] = useLocalStorage<Task[]>("sth-tasks", SEED);
  const [settings, setSettings] = useLocalStorage<Settings>("sth-settings", DEFAULTS);
  const [stage, setStage] = useState<Stage>("landing");
  const [view, setView] = useState<View>("dashboard");
  const [side, setSide] = useState(false);
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState<Task | "new" | null>(null);
  const [focus, setFocus] = useState<Task | null>(null);

  useEffect(() => { if (ready && user) setStage("app"); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { document.documentElement.classList.toggle("dark", settings.dark); }, [settings.dark]);

  if (!ready) return null;
  if (stage === "landing") return <LandingView onStart={() => setStage("login")} />;
  if (stage === "login" || !user)
    return <LoginView onBack={() => setStage("landing")} onSubmit={(name) => { setUser({ name, avatar: "🐶" }); setStage("app"); }} />;

  const logout = () => { setUser(null); setStage("landing"); setView("dashboard"); setSide(false); setQuery(""); };
  const nav = (v: View) => { setView(v); setSide(false); };
  const save = (t: Task) => { setTasks((p) => (p.some((x) => x.id === t.id) ? p.map((x) => (x.id === t.id ? t : x)) : [...p, t])); setEdit(null); };
  const setDone = (id: string, done?: boolean) => setTasks((p) => p.map((x) => (x.id === id ? { ...x, done: done ?? !x.done } : x)));

  const a: TaskActions = {
    q: query,
    onToggle: (id) => setDone(id),
    onFocus: setFocus,
    onEdit: setEdit,
    onDelete: (id) => { if (confirm("Hapus tugas ini?")) setTasks((p) => p.filter((x) => x.id !== id)); },
  };

  return (
    <div className="min-h-screen">
      <Header user={user} query={query} onQuery={setQuery} onMenu={() => setSide(true)} urgent={tasks.filter(isUrgent)} notify={settings.notify} onProfile={() => nav("profile")} />
      <Sidebar open={side} user={user} view={view} onNav={nav} onClose={() => setSide(false)} onLogout={logout} />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {view === "dashboard" && <DashboardView name={user.name} tasks={tasks} a={a} onAdd={() => setEdit("new")} />}
        {view === "tasks" && <TasksView tasks={tasks} a={a} onAdd={() => setEdit("new")} />}
        {view === "pomodoro" && <PomodoroView settings={settings} />}
        {view === "profile" && <ProfileView user={user} onSave={setUser} />}
        {view === "settings" && <SettingsView s={settings} onChange={setSettings} onLogout={logout} />}
      </main>
      {edit && <TaskModal task={edit === "new" ? null : edit} onSave={save} onClose={() => setEdit(null)} />}
      {focus && <PomodoroModal task={focus} settings={settings} onDone={() => { setDone(focus.id, true); setFocus(null); }} onClose={() => setFocus(null)} />}
    </div>
  );
}
