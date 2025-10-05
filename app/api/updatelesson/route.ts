import { db } from "@/src";
import { lessons } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type RequestType = {
  lessonId: string; // needed to know which lesson to update
  type: "text" | "project" | "video";
  title: string;
  xp: number;
  difficulty_level: "novice" | "intermediate" | "expert";
  content?: string;
  deliverables?: string;
  submission_url?: string;
  evaluation_criteria?: string;
  video_url?: string;
};

export async function PATCH(req: Request) {
  try {
    const data: RequestType = await req.json();
    const numberId = Number(data.lessonId);
    console.log("Incoming lesson update:", data);

    if (!data || !data.lessonId) {
      return new NextResponse("Invalid Request — Missing lesson ID or body", {
        status: 400,
      });
    }

    // define the common fields
    const baseUpdate: Record<string, any> = {
      type: data.type,
      title: data.title,
      xp: data.xp,
      difficulty_level: data.difficulty_level,
    };

    // conditional fields depending on lesson type
    if (data.type === "text") {
      baseUpdate.content = data.content || "";
    } else if (data.type === "project") {
      baseUpdate.deliverables = data.deliverables || "";
      baseUpdate.submission_url = data.submission_url || "";
      baseUpdate.evaluation_criteria = data.evaluation_criteria || "";
    } else if (data.type === "video") {
      baseUpdate.video_url = data.video_url || "";
    }

    // update in DB
    const updatedLesson = await db
      .update(lessons)
      .set(baseUpdate)
      .where(eq(lessons.id, numberId))
      .returning();

    if (!updatedLesson.length) {
      return new NextResponse("Lesson not found or update failed", {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Lesson updated successfully",
      lesson: updatedLesson[0],
    });
  } catch (error) {
    console.error("ERROR UPDATING LESSON:", error);
    return new NextResponse("Update lesson failed, please try again.", {
      status: 500,
    });
  }
}
