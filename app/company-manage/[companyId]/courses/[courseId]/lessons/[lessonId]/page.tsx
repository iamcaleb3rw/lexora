import { getLessonById } from "@/app/actions/getLessonById";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { courses } from "@/src/db/schema";
import VideoPlayer from "@/components/VideoPlayer";
import { Rank } from "@/components/Rank";

const LessonIdPage = async ({
  params,
}: {
  params: Promise<{ lessonId: string; companyId: string; courseId: string }>;
}) => {
  const lessonId = (await params).lessonId;
  const companyId = (await params).companyId;
  const courseId = (await params).courseId;
  const lesson = await getLessonById(Number(lessonId));
  const lessonType = lesson.lesson?.type;
  console.log(lesson);
  return (
    <div>
      <div className="relative max-w-3xl mx-auto">
        {/* Fixed Header */}
        {lessonType === "text" && <ScrollProgress className="top-0 z-[999]" />}

        <h1 className="text-xl flex items-center justify-between mb-4 py-4 sticky  top-0 left-0 w-full border-b bg-white font-semibold z-50">
          {lesson?.lesson?.title}
          {lesson.lesson?.difficulty_level && (
            <div className="border shadow-xs flex rounded-full py-1 px-2 gap-3">
              <Rank rank={lesson.lesson?.difficulty_level} />
              <p className="text-sm font-bold ">
                {lesson.lesson?.difficulty_level}
              </p>
            </div>
          )}
        </h1>

        {/* Content with padding to clear header */}
        <div className="pt-0">
          {lessonType === "text" && lesson?.lesson?.content && (
            <div dangerouslySetInnerHTML={{ __html: lesson?.lesson.content }} />
          )}

          {lessonType === "video" && lesson.lesson?.video_url && (
            <VideoPlayer videoUrl={lesson.lesson.video_url} />
          )}

          {lessonType === "project" && lesson.lesson?.deliverables && (
            <div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: lesson?.lesson.deliverables,
                }}
              />
              <hr />
              <div>
                <h1>Submission Url</h1>
              </div>
            </div>
          )}
        </div>
        {lesson.nextLesson ? (
          <Link
            className="w-full cursor-pointer"
            href={`/company-manage/${companyId}/courses/${courseId}/lessons/${lesson.nextLesson?.id}`}
          >
            <Button className="w-full mt-6 cursor-pointer">
              Complete and proceed to: {lesson.nextLesson.title}
            </Button>
          </Link>
        ) : (
          <Button className="w-full bg-green-400 text-background hover:bg-green-500 mt-6 cursor-pointer">
            Mark course as complete
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonIdPage;
