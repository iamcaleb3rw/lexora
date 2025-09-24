import { getCourseMetadata } from "@/app/actions/getCourseMetada";
import { ThreeDButton } from "@/components/ThreeDButton";
import Link from "next/link";
import React from "react";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; companyId: string }>;
}) => {
  const courseId = await (await params).courseId;
  const companyId = (await params).companyId;
  const courseMetadata = await getCourseMetadata(Number(courseId));
  console.log(courseMetadata);
  return (
    <div>
      <div className="relative w-full">
        {/* Thumbnail wrapper */}
        <div className="h-[150px] border overflow-hidden relative">
          <img
            src={courseMetadata?.thumbnail_url || ""}
            className="w-full h-full object-cover"
            alt="Course Thumbnail"
          />

          {/* Optional: if you want something inside the thumbnail */}
        </div>

        {/* Company logo */}
        <div className="absolute -bottom-8 left-8">
          <img
            src={courseMetadata?.company.logo_url || ""}
            alt="Company Logo"
            className="h-16 w-16 bg-white p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="mt-12 px-8">
        <p className="text-xl font-semibold">{courseMetadata?.title}</p>
        <hr />
        <div>
          <div>
            {Number(courseMetadata?.lessons.length) > 0 ? (
              <p>We have lessons</p>
            ) : (
              <div className="mt-2 flex flex-col items-center justify-center border border-dashed min-h-[250px] bg-muted/40">
                You haven&apos;t yet created any lesson
                <Link
                  href={`/company-manage/${companyId}/courses/${courseId}/lessons/create-lesson`}
                >
                  <ThreeDButton text="Create lesson"></ThreeDButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
