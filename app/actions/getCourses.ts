"use server";

import { db } from "@/src";
import { courses } from "@/src/db/schema";

export async function getCourses() {
  try {
    console.time("⏱ getCourses duration"); // start timer

    console.log("FETCHING COURSES");
    const result = await db.select().from(courses);

    console.timeEnd("⏱ getCourses duration"); // stop timer and log
    return result;
  } catch (e) {
    console.error("Error Fetching courses", e);
    throw new Error("Failed to get courses");
  }
}
