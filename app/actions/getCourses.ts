"use server";

import { db } from "@/server";
import { courses } from "@/server/db/schema";

export async function getCourses() {
  try {
    const result = await db.select().from(courses);
    return result;
  } catch (e) {
    console.error("Error Fetching courses", e);
    throw new Error("Failed to get courses");
  }
}
