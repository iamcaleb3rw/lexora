"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function EmptyDemoSkeleton() {
  return (
    <div className="border mt-5 rounded-md p-6 animate-pulse bg-gradient-to-br from-muted/60 to-muted/30">
      <div className="flex flex-col items-center text-center gap-5">
        {/* Icon placeholder */}
        <div className="relative">
          <Skeleton className="w-14 bg-muted-foreground/30 h-14 rounded-full " />
          <div className="absolute inset-0 rounded-full bg-muted/50 blur-md" />
        </div>

        {/* Title */}
        <div className="space-y-2 w-full max-w-xs">
          <Skeleton className="h-5 w-3/4 bg-muted-foreground/30 mx-auto rounded-md " />
          <Skeleton className="h-4 w-1/2 bg-muted-foreground/20 mx-auto rounded-md " />
        </div>

        {/* Description */}
        <div className="space-y-2 w-full max-w-sm">
          <Skeleton className="h-3 bg-muted-foreground/30 w-5/6 mx-auto rounded-md " />
          <Skeleton className="h-3 bg-muted-foreground/10 w-2/3 mx-auto rounded-md " />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-8 bg-muted-foreground/20 w-28 rounded-md" />
          <Skeleton className="h-8 bg-muted-foreground/20 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
