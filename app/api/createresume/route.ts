import { auth } from "@/lib/auth";
import { db } from "@/server";
import { resumes } from "@/server/db/schema";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import z from "zod";

const createCVSchema = z.object({
  job_title: z.string().min(3, "Job title must be at least 3 characters"),
  job_description: z.string().optional(),
  resume_url: z.string().url("Resume URL must be a valid URL"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownerId = session.user.id;
    console.log("OWNER ID", ownerId);
    console.log("RECEIVED DATA FROM CREATE", data);
    const parsedData = createCVSchema.parse(data);
    const result = await db
      .insert(resumes)
      .values({
        owner_id: ownerId,
        job_title: parsedData.job_title,
        job_description: parsedData.job_description,
        file_url: parsedData.resume_url,
      })
      .returning({
        resumeId: resumes.id,
      });

    console.log(result);
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create Resumé.");
  }
}
