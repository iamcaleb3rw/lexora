"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-3rem)] animate-pulse">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 w-[260px] sticky top-[3rem] h-[calc(100vh-3rem)] flex flex-col gap-4 p-4">
        <Skeleton className="h-10 w-full rounded-md bg-muted-foreground/30" />{" "}
        {/* Hide Filters Button */}
        <Separator />
        <div className="space-y-3">
          <Skeleton className="h-5 w-3/5 rounded-md bg-muted-foreground/30" />
          <Skeleton className="h-8 w-full rounded-md bg-muted-foreground/30" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 w-4/5 rounded-md bg-muted-foreground/30" />{" "}
          {/* Another Label */}
          <Skeleton className="h-8 w-full rounded-md bg-muted-foreground/30" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b px-3 py-2 flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-md bg-muted-foreground/30" />{" "}
          {/* Show Filters button */}
          <Separator orientation="vertical" />
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full rounded-md bg-muted-foreground/30" />{" "}
            {/* Search bar */}
          </div>
        </div>

        {/* Scrollable course list */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Thumbnail */}
                <Skeleton className="h-36 w-[250px] rounded-md bg-muted-foreground/30" />
                {/* Text block */}
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="h-4 w-2/5 rounded-md bg-muted-foreground/30" />{" "}
                  {/* By company */}
                  <Skeleton className="h-6 w-3/5 rounded-md bg-muted-foreground/30" />{" "}
                  {/* Course title */}
                  <Skeleton className="h-4 w-1/4 rounded-md bg-muted-foreground/30" />{" "}
                  {/* Date */}
                  <Skeleton className="h-10 w-full rounded-md bg-muted-foreground/30" />{" "}
                  {/* Description */}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
