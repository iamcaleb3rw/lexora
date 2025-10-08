"use client";

import type React from "react";
import { useState } from "react";
import { Check, Book, Play, FileText, Code, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Lesson {
  id: number;
  title: string;
  type: any;
  status: any;
  xp: number;
  order: number;
}

interface LessonNodeProps {
  lesson: Lesson;
  position: "left" | "right" | "center";
}

const lessonIcons: Record<Lesson["type"], React.ElementType> = {
  video: Play,
  text: Book,
  quiz: FileText,
  assignment: FileText,
  project: Code,
  live: Play,
};

export function LessonNode({ lesson, position }: LessonNodeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = lessonIcons[lesson.type];
  const isCompleted = lesson.status === "completed";
  const isCurrent = lesson.status === "current";
  const isLocked = lesson.status === "locked";

  const buttonColors = cn(
    "relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ease-out",
    "shadow-[0_4px_0_#1a1a1a,0_0_12px_rgba(0,0,0,0.5)]",
    "active:translate-y-[3px] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)]",
    isLocked &&
      "border-neutral-700 bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-500 cursor-not-allowed",
    isCurrent &&
      "border-[oklch(0.58_0.22_264)] bg-gradient-to-b from-[#1CB0F6] to-[#168DC5] shadow-[0_0_16px_oklch(0.58_0.22_264)/0.5]",
    isCompleted &&
      "border-emerald-500 bg-gradient-to-b from-emerald-600 to-emerald-700 shadow-[0_0_14px_rgba(16,185,129,0.5)]",
    !isLocked &&
      !isCurrent &&
      !isCompleted &&
      "border-gray-600 bg-gradient-to-b from-gray-700 to-gray-800"
  );

  return (
    <>
      <div className="relative z-10">
        <motion.button
          disabled={isLocked}
          onClick={() => !isLocked && setIsOpen(true)}
          whileHover={{ scale: isLocked ? 1 : 1.06 }}
          whileTap={{
            scale: isLocked ? 1 : 0.85,
            y: 2,
            transition: { type: "spring", stiffness: 500, damping: 20 },
          }}
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-200 ease-out",
            "shadow-[0_6px_0_#1a1a1a,0_0_12px_rgba(0,0,0,0.5)]",
            isLocked &&
              "border-neutral-700 bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-500 cursor-not-allowed",
            isCurrent &&
              "border-[oklch(0.58_0.22_264)] bg-gradient-to-b from-[#1CB0F6] to-[#168DC5] shadow-[0_0_18px_oklch(0.58_0.22_264)/0.5]",
            isCompleted &&
              "border-emerald-500 bg-gradient-to-b from-emerald-600 to-emerald-700 shadow-[0_0_16px_rgba(16,185,129,0.5)]",
            !isLocked &&
              !isCurrent &&
              !isCompleted &&
              "border-gray-600 bg-gradient-to-b from-gray-700 to-gray-800"
          )}
        >
          {/* Mechanical top layer */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/5 to-transparent shadow-inner" />

          {/* Icon */}
          <motion.div
            key={lesson.status}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {isCompleted && (
              <Check className="h-6 w-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            )}
            {isCurrent && (
              <Icon className="h-7 w-7 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            )}
            {isLocked && (
              <Lock className="h-6 w-6 text-neutral-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
            )}
          </motion.div>

          {/* LED halo */}
          {!isLocked && (
            <span
              className={cn(
                "absolute inset-0 rounded-full blur-md opacity-50 transition-all duration-300",
                isCurrent && "bg-[oklch(0.58_0.22_264)/0.6] animate-pulse",
                isCompleted && "bg-emerald-400/40",
                !isCurrent && !isCompleted && "bg-cyan-300/10"
              )}
            />
          )}
        </motion.button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {lesson.title}
            </DialogTitle>
            <DialogDescription>
              {isCompleted && "You've completed this lesson!"}
              {isCurrent && "Ready to start this lesson?"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <span className="text-sm font-medium">Lesson Type</span>
              <span className="text-sm capitalize text-muted-foreground">
                {lesson.type}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <span className="text-sm font-medium">XP Reward</span>
              <span className="text-sm font-bold text-primary">
                +{lesson.xp} XP
              </span>
            </div>
            {isCurrent && (
              <button className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Start Lesson
              </button>
            )}
            {isCompleted && (
              <button className="w-full rounded-lg border border-border bg-background px-4 py-3 font-semibold transition-colors hover:bg-muted">
                Review Lesson
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
