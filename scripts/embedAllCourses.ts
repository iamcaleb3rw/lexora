import { embedMany } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { db } from "../src";
import { courses } from "../src/db/schema";
import { eq } from "drizzle-orm";

const MODEL = google.textEmbeddingModel("gemini-embedding-001");

async function main() {
  console.log("[BATCH] Fetching courses...");

  const allCourses = await db.select().from(courses);
  console.log(`[BATCH] Found ${allCourses.length} courses.`);

  if (allCourses.length === 0) {
    console.log("[BATCH] No courses to embed. Exiting.");
    return;
  }

  // Prepare texts for embedding: title + description
  const texts = allCourses.map((c) => `${c.title}\n${c.description || ""}`);
  console.log("[BATCH] Prepared texts for embedding.");

  try {
    console.time("[BATCH] Embedding all courses");
    const { embeddings } = await embedMany({
      model: MODEL,
      values: texts,
    });
    console.timeEnd("[BATCH] Embedding all courses");

    console.log("[BATCH] Received embeddings, updating database...");

    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      const embedding = embeddings[i];

      await db
        .update(courses)
        .set({ embedding })
        .where(eq(courses.id, course.id));

      console.log(
        `[BATCH] Updated embedding for course id=${course.id} | title="${course.title}"`
      );
    }

    console.log("[BATCH] All courses processed successfully.");
  } catch (err) {
    console.error("[BATCH] Error during embedding or database update:", err);
  }
}

main().catch((err) => {
  console.error("[BATCH] Unexpected error:", err);
  process.exit(1);
});
