import { getLessonById } from "@/app/actions/getLessonById";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rank } from "@/components/Rank";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import VideoPlayer from "@/components/VideoPlayer";

const LessonIdPage = async ({
  params,
}: {
  params: Promise<{ lessonId: string; companyId: string; courseId: string }>;
}) => {
  // ─── Extract Params ──────────────────────────────────────────────
  const { lessonId, companyId, courseId } = await params;
  const lesson = await getLessonById(Number(lessonId));
  const lessonType = lesson.lesson?.type;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="relative max-w-3xl mx-auto px-4 lg:px-0">
        {lessonType === "text" && <ScrollProgress className="top-0 z-[999]" />}

        <header className="sticky top-0 left-0 z-50 flex items-center justify-between bg-white dark:bg-background border-b py-4 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            {lesson?.lesson?.title}
          </h1>

          {lesson.lesson?.difficulty_level && (
            <div className="flex items-center gap-2 rounded-full border px-3 py-1 shadow-sm">
              <Rank rank={lesson.lesson?.difficulty_level} />
              <span className="text-sm font-semibold capitalize">
                {lesson.lesson?.difficulty_level}
              </span>
            </div>
          )}
        </header>

        <main className="space-y-8">
          {/* Text Lesson */}
          {lessonType === "text" && lesson?.lesson?.content && (
            <article
              className="prose dark:prose-invert max-w-none
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-3
              [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2
              [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:my-2
              [&_ol]:list-decimal [&_ol]:ml-8 [&_ol]:my-2
              [&_pre.code-block]:bg-muted [&_pre.code-block]:border [&_pre.code-block]:p-4 [&_pre.code-block]:rounded-lg [&_pre.code-block]:my-4
              [&_pre.code-block_code]:font-mono [&_pre.code-block_code]:text-sm"
              dangerouslySetInnerHTML={{ __html: lesson.lesson.content }}
            />
          )}

          {/* Video Lesson */}
          {lessonType === "video" && lesson.lesson?.video_url && (
            <section className="space-y-4">
              <VideoPlayer videoUrl={lesson.lesson.video_url} />
            </section>
          )}

          {lessonType === "project" &&
            lesson.lesson?.deliverables &&
            lesson.lesson?.evaluation_criteria && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Deliverables</h2>
                  <article
                    className="prose dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: lesson.lesson.deliverables,
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Evaluation Criteria
                  </h2>
                  <article
                    className="prose dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: lesson.lesson.evaluation_criteria,
                    }}
                  />
                </div>

                {lesson.lesson.submission_url && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-1">Submission URL</h3>
                    <Link
                      href={lesson.lesson.submission_url}
                      target="_blank"
                      className="text-primary underline hover:text-primary/80 break-all"
                    >
                      {lesson.lesson.submission_url}
                    </Link>
                  </div>
                )}
              </section>
            )}
        </main>

        <footer className="mt-10">
          {lesson.nextLesson ? (
            <Link
              href={`/company-manage/${companyId}/courses/${courseId}/lessons/${lesson.nextLesson?.id}`}
            >
              <Button className="w-full">
                Complete and proceed to: {lesson.nextLesson.title}
              </Button>
            </Link>
          ) : (
            <Button className="w-full bg-green-500 hover:bg-green-600 text-background">
              Mark course as complete
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default LessonIdPage;
