import { db } from "@/server";
import { lessons } from "@/server/db/schema";
import { asc, eq, sql } from "drizzle-orm";

export async function getLessonById(lessonId: number) {
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  if (!lesson) return { lesson: null, nextLesson: null };

  // Next lesson: same course only, deterministic order
  const nextLesson = await db.query.lessons.findFirst({
    columns: { id: true, title: true },
    where: sql`(${lessons.course_id} = ${lesson.course_id}) AND 
                (${lessons.order} > ${lesson.order} OR 
                 (${lessons.order} = ${lesson.order} AND ${lessons.id} > ${lesson.id}))`,
    orderBy: (l) => [asc(l.order), asc(l.id)],
  });

  return { lesson, nextLesson: nextLesson ?? null };
}
