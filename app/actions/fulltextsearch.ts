"use server";

import { db } from "@/server";
import { courses } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export async function fullTextSearch(query: string | null) {
  try {
    const results = await db.query.courses.findMany({
      where: sql`to_tsvector('english', ${courses.title}) @@ plainto_tsquery('english', ${query})`,
      columns: {
        id: true,
        title: true,
        thumbnail_url: true,
        created_at: true,
        description: true,
      },
      with: {
        company: {
          columns: {
            id: true,
            name: true,
          },
        },
        categories: {
          with: {
            category: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return results;
  } catch (e) {
    console.error("ERROR_FETCHING_FULL_TEXT_SEARCH", e);
    throw new Error("FAILED FULLTEXTSEARCH");
  }
}
