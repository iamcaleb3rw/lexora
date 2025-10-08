import React from "react";

type Step = {
  id: number;
  label?: string;
  done?: boolean;
  locked?: boolean;
  icon?: "check" | "book" | "dumbbell" | "trophy" | "star";
};

const STEPS: Step[] = [
  { id: 1, done: true, icon: "check" },
  { id: 2, done: true, icon: "book" },
  { id: 3, done: true, icon: "check" },
  { id: 4, label: "COMMENCER", icon: "dumbbell" },
  { id: 5, locked: true },
  { id: 6, locked: true, icon: "star" },
  { id: 7, locked: true, icon: "trophy" },
];

export default function SidebarProgress() {
  return (
    <aside className="sidebar">
      <div className="steps">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`step ${s.done ? "done" : ""} ${s.locked ? "locked" : ""}`}
          >
            <div className="step-circle">
              {s.done && (
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    d="M4 12l4 4L20 4"
                  />
                </svg>
              )}
              {s.icon === "book" && (
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M3 5h14v14H3z" fill="#fff" opacity="0.85" />
                </svg>
              )}
              {s.icon === "dumbbell" && (
                <svg className="icon" viewBox="0 0 24 24">
                  <rect
                    x="2"
                    y="10"
                    width="20"
                    height="4"
                    rx="1"
                    fill="#fff"
                    opacity="0.95"
                  />
                </svg>
              )}
              {!s.done && !s.locked && !s.icon && <div className="dot" />}
              {s.locked && (
                <svg className="lock" viewBox="0 0 24 24">
                  <path
                    d="M6 10V8a6 6 0 0 1 12 0v2"
                    fill="none"
                    stroke="#9aa0a6"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="9"
                    rx="2"
                    fill="#e6e9eb"
                  />
                </svg>
              )}
            </div>

            {/* label for specific step */}
            {s.label && <div className="label">{s.label}</div>}
          </div>
        ))}
      </div>

      <div className="chest">
        <svg viewBox="0 0 64 48" className="chest-svg">
          <rect x="4" y="18" width="56" height="24" rx="4" fill="#b3bcc2" />
          <rect x="10" y="10" width="44" height="10" rx="2" fill="#cfd7db" />
          <rect x="28" y="24" width="8" height="10" rx="1" fill="#839aa3" />
        </svg>
      </div>
    </aside>
  );
}
