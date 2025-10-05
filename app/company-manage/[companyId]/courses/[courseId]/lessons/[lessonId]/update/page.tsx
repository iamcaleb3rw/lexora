import { getLessonById } from "@/app/actions/getLessonById";
import LessonUpdateClient from "@/components/LessonUpdateClient";
import React from "react";

export type GetLessonByIdResponse = Awaited<ReturnType<typeof getLessonById>>;

const UpdateLesson = async ({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) => {
  const lessonId = (await params).lessonId;
  const lesson = await getLessonById(Number(lessonId));
  return <LessonUpdateClient lesson={lesson} />;
};

export default UpdateLesson;
