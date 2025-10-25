// app/api/search/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server"; // your Drizzle client
import { embed } from "ai";
import { google } from "@ai-sdk/google";
import { sql } from "drizzle-orm";
import { courses, lessons } from "@/server/db/schema";
// Drizzle schema

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Missing search query" },
        { status: 400 }
      );
    }

    console.log("[SEARCH] Creating embedding for query...");

    const embedResult = await embed({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      value: query,
    });

    // The embedding should be a float array
    const embedding: number[] =
      (embedResult as any).embedding || embedResult.response?.body;

    if (!embedding) {
      throw new Error("Failed to generate embedding");
    }

    console.log(
      "[SEARCH] Embedding generated. Performing similarity search..."
    );

    const vectorString = `[${embedding.join(",")}]`;

    // --- Courses search ---
    const courseResults = await db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
        similarity: sql<number>`1 - (embedding <=> ${sql.raw(`'${vectorString}'::vector`)})`,
      })
      .from(courses)
      .where(sql`embedding IS NOT NULL`)
      .orderBy(
        sql`1 - (embedding <=> ${sql.raw(`'${vectorString}'::vector`)}) DESC`
      )
      .limit(5);

    // --- Lessons search ---
    const lessonResults = await db
      .select({
        id: lessons.id,
        title: lessons.title,
        content: lessons.content,
        similarity: sql<number>`1 - (embedding <=> ${sql.raw(`'${vectorString}'::vector`)})`,
      })
      .from(lessons)
      .where(sql`embedding IS NOT NULL`)
      .orderBy(
        sql`1 - (embedding <=> ${sql.raw(`'${vectorString}'::vector`)}) DESC`
      )
      .limit(5);

    console.log("[SEARCH] Returning results...");

    return NextResponse.json({
      courses: courseResults,
      lessons: lessonResults,
    });
  } catch (error) {
    console.error("[SEARCH] Error:", error);
    return NextResponse.json(
      { error: "Search failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}
