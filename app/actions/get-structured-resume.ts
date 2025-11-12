import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { z } from "zod";

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_AI_API_KEY!,
});

const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const ResumeSchema = z.object({
  fullName: z.string().optional(),
  portfolioUrl: z.string().optional(),
  linkedinUsername: z.string().optional(),
  phoneNumber: z.string().optional(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
});

// 2. Create the function
export async function getStructuredResume(resumeText: string) {
  try {
    const model = google("gemini-2.0-flash");

    const { object: structured } = await generateObject({
      model,
      prompt: `
You are an AI that extracts structured resume data this resume text ${resumeText}. 

Given the following resume text, output JSON that exactly matches this schema:

${ResumeSchema.toString()}

Return only JSON, with no explanation.  
If a field cannot be determined, use an empty array (for arrays) or omit optional fields.
`,
      schema: ResumeSchema,
    });

    return structured;
  } catch (error) {
    console.error("Error generating structured resume:", error);
    throw new Error("Failed to generate structured resume");
  }
}
