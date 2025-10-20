"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/TriggerButton";
import React from "react";

const WorkspaceSkeleton = () => {
  return (
    <div className="p-2">
      {/* Sidebar Trigger */}
      <SidebarTrigger />

      {/* Welcome text */}
      <div>
        <Skeleton className="md:mx-14 my-4 h-5 w-[200px]" />
      </div>

      {/* Intro text */}
      <div className="md:mx-14 space-y-1">
        <Skeleton className="h-4 bg-muted-foreground/10 w-[180px]" />
        <Skeleton className="h-3 bg-muted-foreground/10 w-[300px]" />
      </div>

      <hr className="md:mx-14 max-w-4xl mb-4 mt-1" />

      {/* Course Carousel placeholder */}
      <div className="md:ml-12 flex gap-3 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[130px] bg-muted-foreground/10 w-[260px] rounded-xl shrink-0"
          />
        ))}
      </div>

      <hr className="my-4" />

      {/* Job profile heading */}
      <div>
        <div className="md:mx-14 space-y-1 mt-4">
          <Skeleton className="h-5 bg-muted-foreground/10 w-[140px]" />
          <Skeleton className="h-4 bg-muted-foreground/10 w-[260px]" />
        </div>

        <hr className="md:mx-14 max-w-4xl my-4" />

        {/* Statistic cards grid */}
        <div className="grid md:mx-12 gap-3 grid-cols-8">
          <div className="col-span-5">
            <Skeleton className="h-[160px] bg-muted-foreground/10 w-full rounded-xl" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-[160px] bg-muted-foreground/10 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSkeleton;
