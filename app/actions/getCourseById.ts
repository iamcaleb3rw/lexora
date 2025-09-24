"use server";
import { db } from "@/src";
import { courses } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCourseById(courseId: number) {
  try {
    const result = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      with: {
        lessons: true,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Error while fetching course");
  }
}
