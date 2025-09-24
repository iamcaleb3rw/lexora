"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyPageSkeleton() {
  return (
    <div className="w-full">
      <div className="border-b py-6 bg-white flex justify-end px-4  sticky top-0"></div>
      <div className="p-2 flex gap-5">
        <div className="border w-20 flex items-center justify-center aspect-square p-3 rounded-2xl">
          <Skeleton className="w-14 h-14 bg-muted-foreground/30 rounded-md" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-6 w-48 rounded bg-muted-foreground/20" />
          <Skeleton className="h-4 w-full max-w-[640px] bg-muted-foreground/20 rounded" />
          <Skeleton className="h-4 w-full max-w-[600px] bg-muted-foreground/20 rounded" />
        </div>
      </div>
      <hr />
      <div className="p-2">
        <Skeleton className="h-6 w-64 rounded mb-4 bg-muted-foreground/20" />
        <div className="flex flex-col items-center justify-center border border-dashed min-h-[250px] bg-muted/40 p-4 gap-4 rounded">
          <Skeleton className="h-5 w-60 rounded bg-muted-foreground/20" />
          <Skeleton className="h-10 w-40 rounded bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}
