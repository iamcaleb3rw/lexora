"use client";

import { Flame, Zap } from "lucide-react";

interface UserProgressProps {
  totalXp: number;
  currentStreak: number;
}

export function UserProgress({ totalXp, currentStreak }: UserProgressProps) {
  return (
    <div className="flex items-center gap-4">
      {/* XP Display */}
      <div className="flex items-center gap-2 rounded-full bg-warning/20 px-3 py-1.5">
        <Zap className="h-4 w-4 text-warning-foreground" fill="currentColor" />
        <span className="text-sm font-bold text-warning-foreground">
          {totalXp} XP
        </span>
      </div>

      {/* Streak Display */}
      <div className="flex items-center gap-2 rounded-full bg-destructive/20 px-3 py-1.5">
        <Flame className="h-4 w-4 text-destructive" fill="currentColor" />
        <span className="text-sm font-bold text-destructive">
          {currentStreak} day streak
        </span>
      </div>
    </div>
  );
}
