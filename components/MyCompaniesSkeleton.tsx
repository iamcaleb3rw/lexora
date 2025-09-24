import { Skeleton } from "@/components/ui/skeleton";

export default function MyCompaniesSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-3 p-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="min-h-[150px] flex flex-col justify-between border rounded-xl shadow-xs p-2"
        >
          {/* Top Row (Logo + Name + Link) */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full bg-muted-foreground/30" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* Description */}
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4" />

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-9 flex-1 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
