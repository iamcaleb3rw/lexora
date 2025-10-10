"use client";

import React from "react";
import { LessonNode } from "@/components/lesson-node";

interface Lesson {
  id: number;
  title: string;
  type: string;
  status: string;
  xp: number;
  order: number;
}

// 20 lessons
const sampleLessons: Lesson[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Lesson ${i + 1}`,
  type:
    i % 4 === 0
      ? "video"
      : i % 4 === 1
        ? "text"
        : i % 4 === 2
          ? "quiz"
          : "project",
  status: i < 3 ? "completed" : i === 3 ? "current" : "locked",
  xp: (i + 1) * 50,
  order: i + 1,
}));

const LESSONS_PER_CLUSTER = 2;
const STEP_X = 50;
const STEP_Y = 50;
const NODE_SIZE = 48;

export default function LearningPath() {
  const rawPositions = sampleLessons.map((lesson, index) => {
    const clusterIndex = Math.floor(index / LESSONS_PER_CLUSTER);
    const nodeIndex = index % LESSONS_PER_CLUSTER;
    const isEvenCluster = clusterIndex % 2 === 0;

    const offsetX = isEvenCluster
      ? -STEP_X / 2 + nodeIndex * STEP_X
      : STEP_X / 2 + (LESSONS_PER_CLUSTER - 1 - nodeIndex) * STEP_X;

    const offsetY = STEP_Y / 2 + index * STEP_Y;

    return { x: offsetX, y: offsetY, clusterIndex };
  });

  // Center horizontally by shifting all nodes based on max/min X
  const allX = rawPositions.map((p) => p.x);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const centerShift = (maxX + minX) / 2;

  const positions = rawPositions.map((p) => ({
    x: p.x - centerShift, // subtract centerShift to center around 0
    y: p.y,
    clusterIndex: p.clusterIndex,
  }));

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-200 py-20">
      <div className="text-center space-y-2 mb-16">
        <h1 className="text-4xl font-bold text-slate-900">
          Perfectly Centered Zigzag Path ✨
        </h1>
        <p className="text-slate-600">Now truly centered on all screens</p>
      </div>

      <div className="relative w-full h-[2400px] flex justify-center">
        <div className="relative">
          {sampleLessons.map((lesson, index) => {
            const { x, y } = positions[index];
            return (
              <div
                key={lesson.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${x - NODE_SIZE / 2}px)`,
                  top: y - NODE_SIZE / 2,
                }}
              >
                <LessonNode lesson={lesson} position="center" />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
