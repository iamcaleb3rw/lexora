"use server";
import { db } from "@/server";
import { courses } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getCourseMetadata(courseId: number) {
  try {
    const result = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      columns: {
        id: true,
        thumbnail_url: true,
        title: true,
      },
      with: {
        company: {
          columns: {
            logo_url: true,
          },
        },
        lessons: true,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching course metadata");
  }
}
