"use client";

import type React from "react";

import { Trophy, Star, Gift } from "lucide-react";
import { LessonNode } from "./lesson-node";
import { UserProgress } from "./user-progress";

// Mock data based on the database schema
const mockLessons = [
  {
    id: 1,
    title: "Introduction",
    type: "video",
    status: "completed",
    xp: 10,
    order: 1,
  },
  {
    id: 2,
    title: "Basic Concepts",
    type: "text",
    status: "completed",
    xp: 15,
    order: 2,
  },
  {
    id: 3,
    title: "Practice Quiz",
    type: "quiz",
    status: "completed",
    xp: 20,
    order: 3,
  },
  {
    id: 4,
    title: "Getting Started",
    type: "video",
    status: "current",
    xp: 10,
    order: 4,
  },
  {
    id: 5,
    title: "Advanced Topics",
    type: "text",
    status: "locked",
    xp: 25,
    order: 5,
  },
  {
    id: 6,
    title: "Final Project",
    type: "project",
    status: "locked",
    xp: 50,
    order: 6,
  },
  {
    id: 7,
    title: "Certification",
    type: "assignment",
    status: "locked",
    xp: 30,
    order: 7,
  },
];

const pathPositions = [
  { x: 50, y: 0 }, // Center start
  { x: 30, y: 140 }, // Left
  { x: 20, y: 280 }, // Far left
  { x: 50, y: 420 }, // Center
  { x: 70, y: 560 }, // Right
  { x: 80, y: 700 }, // Far right
  { x: 50, y: 840 }, // Center end
];

export function LearningPath() {
  return (
    <div className="relative mt-16 min-h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Learning Path</h1>
          <UserProgress totalXp={55} currentStreak={3} />
        </div>
      </header>

      {/* Main Content */}
      <div className="container relative mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Course Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Web Development Fundamentals
            </h2>
            <p className="text-muted-foreground">
              Master the basics and build your first project
            </p>
          </div>

          {/* Learning Path */}
          <div className="relative" style={{ minHeight: "1000px" }}>
            <svg
              className="absolute inset-0 h-full w-full"
              style={{ zIndex: 0 }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="oklch(0.75 0.15 142)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="40%"
                    stopColor="oklch(0.65 0.25 250)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.65 0.01 264)"
                    stopOpacity="0.6"
                  />
                </linearGradient>
              </defs>
              <path
                d={`
                  M ${pathPositions[0].x}% ${pathPositions[0].y}
                  C ${pathPositions[0].x}% ${pathPositions[0].y + 70},
                    ${pathPositions[1].x}% ${pathPositions[1].y - 70},
                    ${pathPositions[1].x}% ${pathPositions[1].y}
                  
                  C ${pathPositions[1].x}% ${pathPositions[1].y + 70},
                    ${pathPositions[2].x}% ${pathPositions[2].y - 70},
                    ${pathPositions[2].x}% ${pathPositions[2].y}
                  
                  C ${pathPositions[2].x}% ${pathPositions[2].y + 70},
                    ${pathPositions[3].x}% ${pathPositions[3].y - 70},
                    ${pathPositions[3].x}% ${pathPositions[3].y}
                  
                  C ${pathPositions[3].x}% ${pathPositions[3].y + 70},
                    ${pathPositions[4].x}% ${pathPositions[4].y - 70},
                    ${pathPositions[4].x}% ${pathPositions[4].y}
                  
                  C ${pathPositions[4].x}% ${pathPositions[4].y + 70},
                    ${pathPositions[5].x}% ${pathPositions[5].y - 70},
                    ${pathPositions[5].x}% ${pathPositions[5].y}
                  
                  C ${pathPositions[5].x}% ${pathPositions[5].y + 70},
                    ${pathPositions[6].x}% ${pathPositions[6].y - 70},
                    ${pathPositions[6].x}% ${pathPositions[6].y}
                `}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative" style={{ zIndex: 10 }}>
              {mockLessons.map((lesson, index) => {
                const position = pathPositions[index];
                return (
                  <div
                    key={lesson.id}
                    className="absolute"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <LessonNode lesson={lesson} position="center" />
                  </div>
                );
              })}

              <div
                className="absolute flex gap-8"
                style={{
                  left: "50%",
                  top: "980px",
                  transform: "translateX(-50%)",
                }}
              >
                <RewardNode icon={Gift} label="Treasure" locked />
                <RewardNode icon={Star} label="Achievement" locked />
                <RewardNode icon={Trophy} label="Certificate" locked />
              </div>
            </div>
          </div>

          {/* Character Illustration */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-warning/20 to-accent/20">
                <div className="text-7xl">🎓</div>
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full bg-warning shadow-lg">
                <div className="text-3xl">🔥</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardNode({
  icon: Icon,
  label,
  locked,
}: {
  icon: React.ElementType;
  label: string;
  locked: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        disabled={locked}
        className="group relative flex h-20 w-20 items-center justify-center rounded-2xl bg-locked shadow-[0_8px_0_0_oklch(0.65_0.01_264)] transition-all hover:translate-y-1 hover:shadow-[0_4px_0_0_oklch(0.65_0.01_264)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon className="h-10 w-10 text-locked-foreground" />
      </button>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
