"use client";

import React, { useState } from "react";
import { Check, Book, Play, FileText, Code, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          disabled={isLocked}
          whileHover={{ scale: isLocked ? 1 : 1.02 }}
          whileTap={{
            scale: isLocked ? 1 : 0.96,
            y: 4,
            transition: { type: "spring", stiffness: 600, damping: 25 },
          }}
          className={cn(
            "relative flex  h-12 w-12 items-center justify-center rounded-full transition-all duration-150 ease-out",
            isLocked &&
              "bg-gradient-to-b from-[#4a4a4a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_5px_0_0_#1a1a1a,0_6px_8px_rgba(0,0,0,0.4)] cursor-not-allowed",
            isCurrent &&
              "bg-gradient-to-b from-[#60a5fa] via-[#3b82f6] to-[#2563eb] shadow-[0_5px_0_0_#1e40af,0_6px_12px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]",
            isCompleted &&
              "bg-gradient-to-b from-[#4ade80] via-[#22c55e] to-[#16a34a] shadow-[0_5px_0_0_#15803d,0_6px_12px_rgba(34,197,94,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]",
            !isLocked &&
              !isCurrent &&
              !isCompleted &&
              "bg-gradient-to-b from-[#6a6a6a] via-[#5a5a5a] to-[#4a4a4a] shadow-[0_5px_0_0_#2a2a2a,0_6px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
            "active:translate-y-[4px] active:shadow-[0_1px_0_0_#1a1a1a,0_2px_4px_rgba(0,0,0,0.4)]"
          )}
        >
          <div
            className={cn(
              "absolute inset-x-2 top-1 h-4 rounded-t-md bg-gradient-to-b from-white/40 to-transparent blur-[1px]",
              isLocked && "from-white/10"
            )}
          />
          <div className="absolute inset-0 rounded-lg " />

          <motion.div
            key={lesson.status}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative z-10"
          >
            {isCompleted && (
              <Check className="h-6 w-6 text-white drop-shadow" />
            )}
            {isCurrent && <Icon className="h-7 w-7 text-white drop-shadow" />}
            {isLocked && (
              <Lock className="h-6 w-6 text-[#2a2a2a] drop-shadow" />
            )}
            {!isLocked && !isCurrent && !isCompleted && (
              <Icon className="h-6 w-6 text-[#2a2a2a] drop-shadow" />
            )}
          </motion.div>

          {isCurrent && (
            <span className="absolute -inset-1 rounded-lg bg-blue-400/20 blur-md" />
          )}
          {isCompleted && (
            <span className="absolute -inset-1 rounded-lg bg-green-400/20 blur-md" />
          )}
        </motion.button>
      </PopoverTrigger>

      <PopoverContent className="sm:max-w-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="text-sm font-medium">Lesson</span>
            <span className="text-sm font-semibold">{lesson.title}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="text-sm font-medium">Type</span>
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
            <button className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Start Lesson
            </button>
          )}
          {isCompleted && (
            <button className="w-full rounded-lg border border-border bg-background px-4 py-2 font-semibold hover:bg-muted transition">
              Review Lesson
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
