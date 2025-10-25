import { getCoursesInfo } from "@/app/actions/get-courses-metadata";
import { formatDistance } from "date-fns";
import React from "react";

const CoursesList = async () => {
  const courses = await getCoursesInfo();
  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="flex">
            <img
              src={course.thumbnail_url || ""}
              alt="Course thumbnail"
              className="max-w-[250px] border w-full"
            />
            <div className="flex-1 border p-2">
              <p className="uppercase text-xs text-muted-foreground font-medium">
                By <span>{course.company.name}</span>
              </p>
              <p className="font-medium">{course.title}</p>
              <p className="text-xs text-muted-foreground font-medium">
                {formatDistance(new Date(course.created_at!), new Date(), {
                  addSuffix: true,
                })}
              </p>
              <p className="line-clamp-2 text-sm mt-2 text-muted-foreground/80">
                {course.description}
              </p>
              <div>
                {Array.from(
                  new Map(
                    course.categories.map((c) => [c.category.id, c.category])
                  ).values()
                ).map((category) => (
                  <p key={category.id}>{category.name}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CoursesList;
