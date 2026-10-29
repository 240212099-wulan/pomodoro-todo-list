export type Priority = "low" | "medium" | "high";
export type Task = { id: string; title: string; description: string; deadline: string; priority: Priority; category: string; done: boolean };
export type User = { name: string; avatar: string };
export type Settings = { dark: boolean; notify: boolean; focus: number; short: number; long: number };
export type View = "dashboard" | "tasks" | "pomodoro" | "profile" | "settings";
export type Stage = "landing" | "login" | "app";
export type TaskActions = {
  q: string;
  onToggle: (id: string) => void;
  onFocus: (t: Task) => void;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
};
