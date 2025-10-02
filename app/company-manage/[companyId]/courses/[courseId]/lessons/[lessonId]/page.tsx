import { getLessonById } from "@/app/actions/getLessonById";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { courses } from "@/src/db/schema";
import VideoPlayer from "@/components/VideoPlayer";
import { Rank } from "@/components/Rank";
import { ScrollProgress } from "@/components/ui/scroll-progress";

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
            <div
              className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-xl [&_ul]:list-disc [&_ul]:ml-14 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 [&_li]:mb-1 [&_ul]:my-2 [&_h2]:font-semibold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2 [&_pre.code-block_code]:text-pink-600 [&_pre.code-block_code]:dark:text-lime-400 [&_pre.code-block_code]:font-mono [&_pre.code-block_code]:text-sm [&_pre.code-block]:bg-gray-50 [&_pre.code-block]:dark:bg-gray-900 [&_pre.code-block]:border [&_pre.code-block]:border-gray-200 [&_pre.code-block]:dark:border-gray-700 [&_pre.code-block]:p-4 [&_pre.code-block]:rounded-lg [&_pre.code-block]:my-4"
              dangerouslySetInnerHTML={{ __html: lesson?.lesson.content }}
            />
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
                <h1>Submission Url</h1>p
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
