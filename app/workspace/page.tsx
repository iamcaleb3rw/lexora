import CourseCarousel from "@/components/course-carousel";
import { CourseCarouselSkeleton } from "@/components/course-carousel-skeleton";
import WorkspaceClient from "@/components/WorkspaceClient";
import React, { Suspense } from "react";

const WorkSpace = () => {
  return (
    <WorkspaceClient>
      <Suspense fallback={<CourseCarouselSkeleton />}>
        <CourseCarousel />
      </Suspense>
    </WorkspaceClient>
  );
};

export default WorkSpace;
