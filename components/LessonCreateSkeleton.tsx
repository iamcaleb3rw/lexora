"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LessonFormSkeleton() {
  return (
    <div className="max-w-xl mt-14 mx-auto p-6">
      {/* Page Title */}
      <Skeleton className="h-7 w-40 mb-6" />

      <div className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>

        {/* Lesson Type Select */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Select */}
        </div>

        {/* Video URL / Project Deliverables / Text Editor */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input/Textarea */}
        </div>

        {/* Editor Placeholder */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-48 w-full" /> {/* Rich Text Editor Box */}
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
