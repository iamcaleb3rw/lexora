import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function CourseCarouselSkeleton() {
  return (
    <div className=" w-full max-w-4xl p-2">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 ">
        <div className="col-span-1  flex flex-col border rounded-md  h-[150px]">
          <div className="h-[50%] border-b"></div>
          <div className="w-full flex flex-1 flex-col justify-between  p-1">
            <Skeleton className="h-4 w-[80%] bg-muted-foreground/20" />
            <Skeleton className="h-8 w-full bg-muted-foreground/20" />
          </div>
        </div>
        <div className="col-span-1  flex flex-col border rounded-md  h-[150px]">
          <div className="h-[50%] border-b"></div>
          <div className="w-full flex flex-1 flex-col justify-between  p-1">
            <Skeleton className="h-4 w-[80%] bg-muted-foreground/20" />
            <Skeleton className="h-8 w-full bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
