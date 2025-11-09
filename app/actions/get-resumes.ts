"use server";
import { db } from "@/server";
import { resumes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getResumes(ownerId: string) {
  try {
    const result = await db.query.resumes.findMany({
      where: eq(resumes.owner_id, ownerId),
      columns: {
        id: true,
        job_title: true,
      },
    });
    return result ?? null;
  } catch (e) {
    console.error("ERROR GETTING RESUMES", e);
    throw new Error("Failed to get resumes");
  }
}

export type ResumeInfoType = Awaited<ReturnType<typeof getResumes>>;
