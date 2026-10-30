import type { Priority, Task } from "../types";

export const PRIO: Record<Priority, { label: string; cls: string }> = {
  low: { label: "🟢 Rendah", cls: "bg-sage text-[#4a5a2b]" },
  medium: { label: "🟡 Sedang", cls: "bg-accent/40 text-ink" },
  high: { label: "🔴 Tinggi", cls: "bg-coral text-white" },
};

export const fmtDate = (d: string) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Tanpa deadline";

export const byDeadline = (a: Task, b: Task) => (a.deadline || "9999").localeCompare(b.deadline || "9999");

export const matches = (t: Task, q: string) => !q || `${t.title} ${t.category}`.toLowerCase().includes(q.toLowerCase());

export const isUrgent = (t: Task) =>
  !t.done && !!t.deadline && new Date(t.deadline + "T23:59:59").getTime() - Date.now() < 864e5;

export function highlight(text: string, q: string) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-accent/50 px-0.5 text-inherit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}
