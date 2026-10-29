"use client";
export default function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${on ? "bg-btn" : "bg-line"}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow transition-all ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}
