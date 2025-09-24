"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg ml-20 pt-8">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Skeleton className="bg-muted-foreground/20 h-4 w-32 rounded" />
        <Skeleton className="bg-muted-foreground/20 h-10 w-full rounded" />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Skeleton className="bg-muted-foreground/20 h-4 w-40 rounded" />
        <Skeleton className=" bg-muted-foreground/20 h-24 w-full rounded" />
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col gap-2">
        <Skeleton className=" bg-muted-foreground/20 h-4 w-36 rounded" />
        <Skeleton className="bg-muted-foreground/20 h-48 w-full rounded border border-dashed border-gray-300 flex items-center justify-center" />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-2">
        <Skeleton className="bg-muted-foreground/20 h-4 w-32 rounded" />
        <Skeleton className="bg-muted-foreground/20 h-10 w-full rounded" />
      </div>

      {/* Published Checkbox */}
      <div className="flex items-center gap-2">
        <Skeleton className="bg-muted-foreground/20 h-4 w-4 rounded" />
        <Skeleton className="bg-muted-foreground/20 h-4 w-24 rounded" />
      </div>

      {/* Submit Button */}
      <Skeleton className="bg-muted-foreground/20 h-10 w-40 rounded mt-4" />
    </div>
  );
}
