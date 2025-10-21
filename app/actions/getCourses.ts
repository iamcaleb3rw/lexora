"use server";

import { db } from "@/src";
import { courses } from "@/src/db/schema";

export async function getCourses() {
  try {
    const result = await db.select().from(courses);
    return result;
  } catch (e) {
    console.error("Error Fetching courses", e);
    throw new Error("Failed to get courses");
  }
}
