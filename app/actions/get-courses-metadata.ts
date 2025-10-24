"use server";

import { db } from "@/src";

export async function getCoursesInfo() {
  try {
    const products = await db.query.courses.findMany({
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
      },
    });

    return products;
  } catch (e) {
    console.error("ERROR FETCHING COURSES_INFO", e);
    throw new Error("Failed getting courses!");
  }
}

export type CoursesInfo = Awaited<ReturnType<typeof getCoursesInfo>>;
