import { embedMany } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { db } from "../server";
import { courses } from "../server/db/schema";
import { eq, isNotNull, isNull } from "drizzle-orm";

const MODEL = google.textEmbeddingModel("gemini-embedding-001");

async function main() {
  console.log("[BATCH] Fetching courses...");

  // Only select courses without embeddings
  const coursesToEmbed = await db.query.courses.findMany({
    where: isNull(courses.embedding),
    columns: {
      id: true,
      title: true,
      description: true,
    },
    with: {
      company: {
        columns: {
          name: true,
        },
      },
      categories: {
        with: {
          category: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  console.log(
    `[BATCH] Found ${coursesToEmbed.length} courses without embeddings.`
  );

  if (coursesToEmbed.length === 0) {
    console.log("[BATCH] All courses already have embeddings. Exiting.");
    return;
  }

  // Prepare texts for embedding: title + description
  const texts = coursesToEmbed.map((c) => {
    const categoryNames = c.categories?.map((cat) => cat.category.name) || [];
    const companyName = c.company?.name || "";

    return `
  ${c.title}
  ${c.description || ""}
  Categories: ${categoryNames.join(", ")}
  Author: ${companyName}
  `;
  });
  console.log("[BATCH] Prepared texts for embedding.");

  try {
    console.time("[BATCH] Embedding courses");
    const { embeddings } = await embedMany({
      model: MODEL,
      values: texts,
    });
    console.timeEnd("[BATCH] Embedding courses");

    console.log("[BATCH] Received embeddings, updating database...");

    for (let i = 0; i < coursesToEmbed.length; i++) {
      const course = coursesToEmbed[i];
      const embedding = embeddings[i];

      await db
        .update(courses)
        .set({ embedding })
        .where(eq(courses.id, course.id));

      console.log(
        `[BATCH] Updated embedding for course id=${course.id} | title="${course.title}"`
      );
    }

    console.log("[BATCH] All new courses processed successfully.");
  } catch (err) {
    console.error("[BATCH] Error during embedding or database update:", err);
  }
}

main().catch((err) => {
  console.error("[BATCH] Unexpected error:", err);
  process.exit(1);
});
