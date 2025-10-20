import { getCourseById } from "@/app/actions/getCourseById";
import ArticleIcon from "@/components/ArticleIcon";
import PlayIconCustom from "@/components/PlayIconCustom";
import TerminalIcon from "@/components/TerminalIcon";
import { ThreeDButton } from "@/components/ThreeDButton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Edit, HelpCircle } from "lucide-react";
import Link from "next/link";

import React from "react";

const lessonTypeIcons: Record<string, React.FC<any>> = {
  text: ArticleIcon,
  video: PlayIconCustom,
  project: TerminalIcon,
};

const Lessons = async ({
  params,
}: {
  params: Promise<{ companyId: string; courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  const course = await getCourseById(Number(courseId));
  console.log(course?.title);
  const companyId = (await params).companyId;
  const lessonsNumber = course?.lessons.length;
  return (
    <div className="p-4 md:p-10 ">
      <div>
        <p className="font-semibold text-3xl">{course?.title}</p>
        <hr />
        <div className="mt-16">
          <div className="flex w-full justify-between mb-2">
            <p className="text-xl font-semibold mb-2">Lessons</p>
            <Link
              href={`/company-manage/${companyId}/courses/${courseId}/lessons/create-lesson`}
              className="cursor-pointer"
            >
              <ThreeDButton text="Create Lesson +" className="cursor-pointer" />
            </Link>
          </div>

          <div className="bg-white shadow-xs border rounded-lg overflow-hidden divide-y divide-gray-200">
            {lessonsNumber ? (
              course.lessons.map((lesson) => {
                const Icon = lessonTypeIcons[lesson.type] || HelpCircle;
                return (
                  <div
                    key={lesson.id}
                    className="flex gap-2 items-center justify-between p-3 text-muted-foreground hover:bg-gray-50 transition"
                  >
                    {" "}
                    <div className="flex gap-2 items-center">
                      <Icon /> <p>{lesson.title}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Link
                        href={`/company-manage/${companyId}/courses/${courseId}/lessons/${lesson.id}/update`}
                      >
                        <Button variant={"outline"} size={"icon"}>
                          <Edit />
                        </Button>
                      </Link>
                      <Link
                        href={`/company-manage/${companyId}/courses/${courseId}/lessons/${lesson.id}`}
                        key={lesson.id}
                      >
                        <Button size={"sm"}>
                          Preview
                          <ArrowUpRight />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" flex flex-col  items-center justify-center border border-dashed min-h-[250px] bg-muted/40">
                <p className="text-md font-semibold italic">
                  This course has no published lessons yet
                </p>
                <Link
                  href={`/company-manage/${companyId}/courses/${courseId}/lessons/create-lesson`}
                >
                  <ThreeDButton
                    text="Create Lesson +"
                    className=""
                  ></ThreeDButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
