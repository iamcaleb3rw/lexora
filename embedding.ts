// lib/embedding.ts
import { embed } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";

const MODEL = google.textEmbeddingModel("gemini-embedding-001");

/**
 * Generate embedding for a single text with logs
 */
export async function getEmbedding(text: string): Promise<number[]> {
  console.time(`[EMBED] "${text.slice(0, 30)}..."`);
  const { embedding } = await embed({
    model: MODEL,
    value: text,
  });
  console.timeEnd(`[EMBED] "${text.slice(0, 30)}..."`);
  console.log(`[EMBED] Vector length: ${embedding.length}`);
  return embedding;
}
