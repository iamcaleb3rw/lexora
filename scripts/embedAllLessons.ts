import { embed } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { db } from "../server";
import { lessons } from "../server/db/schema";
import { eq } from "drizzle-orm";

const MODEL = google.textEmbeddingModel("gemini-embedding-001");
const MAX_PAYLOAD_BYTES = 36000; // Gemini API limit
const DELAY_MS = 2000; // 2s delay between requests

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("[BATCH] Fetching lessons...");
  const allLessons = await db.select().from(lessons);
  console.log(`[BATCH] Found ${allLessons.length} lessons.`);

  for (let i = 0; i < allLessons.length; i++) {
    const lesson = allLessons[i];

    // Skip lessons that already have embeddings
    if (lesson.embedding && lesson.embedding.length > 0) {
      console.log(
        `[SKIP] Lesson id=${lesson.id} already has an embedding, skipping.`
      );
      continue;
    }

    let textToEmbed = `${lesson.title}\n${lesson.content || ""}`;

    // Check payload size
    let payloadSize = new TextEncoder().encode(textToEmbed).length;
    if (payloadSize > MAX_PAYLOAD_BYTES) {
      console.warn(
        `[WARN] Lesson id=${lesson.id} exceeds payload limit (${payloadSize} bytes), truncating`
      );
      let allowedLength = Math.floor(
        (MAX_PAYLOAD_BYTES - lesson.title.length) * 0.8
      );
      textToEmbed = `${lesson.title}\n${(lesson.content || "").slice(0, allowedLength)}`;
      payloadSize = new TextEncoder().encode(textToEmbed).length;
      console.log(`[INFO] Truncated payload size: ${payloadSize} bytes`);
    }

    let retry = 0;
    while (retry < 3) {
      try {
        console.log(
          `[BATCH] Embedding lesson id=${lesson.id} | title="${lesson.title}"`
        );
        const { embedding } = await embed({
          model: MODEL,
          value: textToEmbed,
        });

        if (embedding.length !== 3072) {
          console.warn(
            `[WARN] Lesson id=${lesson.id} embedding length mismatch (${embedding.length}), skipping`
          );
        } else {
          await db
            .update(lessons)
            .set({ embedding })
            .where(eq(lessons.id, lesson.id));

          console.log(`[BATCH] Updated embedding for lesson id=${lesson.id}`);
        }
        break; // success, exit retry loop
      } catch (err: any) {
        retry++;
        console.error(
          `[ERROR] Lesson id=${lesson.id}, attempt ${retry}:`,
          err.message || err
        );
        console.log(`[INFO] Retrying after ${DELAY_MS}ms...`);
        await sleep(DELAY_MS);
      }
    }

    console.log(
      `[BATCH] Waiting ${DELAY_MS}ms before next lesson to avoid rate limits...`
    );
    await sleep(DELAY_MS);
  }

  console.log("[BATCH] All lessons processed successfully.");
}

main().catch((err) => {
  console.error("[BATCH] Unexpected error:", err);
  process.exit(1);
});
