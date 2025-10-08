import { getLessonById } from "@/app/actions/getLessonById";
import LessonUpdateClient from "@/components/LessonUpdateClient";
import React from "react";

export type GetLessonByIdResponse = Awaited<ReturnType<typeof getLessonById>>;

const UpdateLesson = async ({
  params,
}: {
  params: Promise<{ lessonId: string; courseId: string; companyId: string }>;
}) => {
  const lessonId = (await params).lessonId;
  const courseId = (await params).courseId;
  const companyId = (await params).companyId;
  const lesson = await getLessonById(Number(lessonId));
  return (
    <LessonUpdateClient
      lesson={lesson}
      courseId={courseId}
      companyId={companyId}
    />
  );
};

export default UpdateLesson;
