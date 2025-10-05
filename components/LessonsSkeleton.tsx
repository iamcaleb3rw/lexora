"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LessonsSkeleton = () => {
  return (
    <div className="p-4 md:p-10">
      <div>
        {/* Course Title */}
        <Skeleton className="h-8 w-64 mb-2 bg-muted-foreground/20" />
        <hr />
        <div className="mt-16">
          <div className="w-full flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-muted-foreground/20 mb-2" />
            <Skeleton className="h-6 w-32 bg-muted-foreground/20 mb-2" />
          </div>
          <div className="bg-white shadow-xs border rounded-lg overflow-hidden divide-y divide-gray-200">
            {/* Fake Lessons */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 ">
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-5 w-5 rounded bg-muted-foreground/15" />
                  <Skeleton className="h-4 w-48 bg-muted-foreground/15" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-6 rounded-md  bg-muted-foreground/15" />
                  <Skeleton className="h-6 w-20 rounded-md  bg-muted-foreground/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsSkeleton;
