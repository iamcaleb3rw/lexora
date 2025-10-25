import { db } from "@/server";
import { lessons } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import z from "zod";

const lessonSchema = z.discriminatedUnion("lessonType", [
  z.object({
    lessonType: z.literal("video"),
    title: z.string().min(1, "Title is required"),
    videoUrl: z.string().url("Must be a valid video URL"),
    courseId: z.string().min(1),
  }),
  z.object({
    lessonType: z.literal("project"),
    title: z.string().min(1, "Title is required"),
    deliverables: z.string().min(1, "Deliverables are required"),
    difficulty_level: z.enum(["novice", "intermediate", "expert"]),
    submission_url: z.string(),
    courseId: z.string().min(1),
  }),
  z.object({
    lessonType: z.literal("text"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    courseId: z.string().min(1),
  }),
]);

type Lesson = z.infer<typeof lessonSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated: Lesson = lessonSchema.parse(body);

    const maxOrder = await db
      .select({ maxOrder: sql<number>`max(${lessons.order})`.as("maxOrder") })
      .from(lessons)
      .where(eq(lessons.course_id, Number(validated.courseId)));

    const nextOrder = maxOrder[0]?.maxOrder ? maxOrder[0].maxOrder + 1 : 1;

    let insertedLesson;

    switch (validated.lessonType) {
      case "video":
        insertedLesson = await db
          .insert(lessons)
          .values({
            title: validated.title,
            video_url: validated.videoUrl,
            type: validated.lessonType,
            course_id: Number(validated.courseId),
            xp: 10,
            order: nextOrder,
          })
          .returning();
        break;

      case "project":
        insertedLesson = await db
          .insert(lessons)
          .values({
            title: validated.title,
            deliverables: validated.deliverables,
            type: validated.lessonType,
            course_id: Number(validated.courseId),
            difficulty_level: validated.difficulty_level,
            submission_url: validated.submission_url,
            xp: 10,
            order: nextOrder,
          })
          .returning();
        break;

      case "text":
        insertedLesson = await db
          .insert(lessons)
          .values({
            title: validated.title,
            content: validated.content,
            type: validated.lessonType,
            course_id: Number(validated.courseId),
            xp: 10,
            order: nextOrder,
          })
          .returning();
        break;
    }

    // ✅ Return success response
    return NextResponse.json(
      {
        message: "Lesson created successfully",
        lesson: insertedLesson?.[0], // return the created row
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid lesson data" }, { status: 400 });
  }
}
