"use server";
import { db } from "@/server";
import { resumes } from "@/server/db/schema";
import { validate } from "uuid";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getResume(resumeId: string) {
  try {
    const isUuid = validate(resumeId);
    if (!isUuid) {
      console.warn("The resumeId is not a uuid");
      return null;
    }
    const result = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
    });

    return result ?? null;
  } catch (e) {
    console.error("ERROR FETCHIN CV", e);
    throw new Error("ERROR FETCHING RESUME");
  }
}
