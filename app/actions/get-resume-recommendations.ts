"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { z } from "zod";

// Schemas
const SuggestionItemSchema = z.object({
  type: z.enum([
    "language",
    "action_verbs",
    "structure",
    "formatting",
    "content",
    "impact",
    "relevance",
    "mistakes",
  ]),
  title: z.string(),
  description: z.string(),
  examples: z.array(z.string()).optional(),
});

const ResumeSegmentSchema = z.object({
  id: z.string(), // e.g. "seg_1"
  text: z.string(), // exact bullet/line from the resume
});
const WeaknessItemSchema = z.object({
  id: z.string(), // weakness id
  targetId: z.string(), // id of the original resume segment
  text: z.string(),
});

const RewriteExampleSchema = z.object({
  id: z.string(), // rewrite item id
  targetId: z.string(), // exact same segment id
  before: z.string(),
  after: z.string(),
});

const ResumeImprovementSchema = z.object({
  segments: z.array(ResumeSegmentSchema), // NEW (required)
  strengths: z.array(z.string()),
  weaknesses: z.array(WeaknessItemSchema),
  actionableSuggestions: z.array(SuggestionItemSchema),
  rewriteExamples: z.array(RewriteExampleSchema),
  metricsSuggestions: z.array(z.string()),
});

// Function
export async function getResumeImprovements(resumeText: string) {
  try {
    const model = google("gemini-2.0-flash");

    const { object: suggestions } = await generateObject({
      model,
      schema: ResumeImprovementSchema,
      prompt: `
You are a resume coach following the exact advice from Harvard’s “Create a Strong Resume” page.

Analyze the following resume text and return structured improvement suggestions:

${resumeText}

Follow these concrete Harvard rules:

- Use specific, active, fact-based language.
- Avoid general or passive phrases.
- Use strong action verbs (Coordinated, Executed, Directed, Improved, Analyzed, Streamlined).
- If STRONG action verbs were already used don't bother suggesting their change.
- Do not use personal pronouns or narrative style.
- Avoid slang, abbreviations (unless industry standard), and decorative language.
- Do not start bullet points with dates.
- Prioritize reverse chronological order.
- Suggest quantification (percentages, numbers, timelines).
- Ensure formatting consistency.
- Recommend simpler, scannable structure.
- Focus on results rather than duties.
- Do not include new content that is not in the original resume text, only improve what's already there.
- Make sure that the before text in rewrite suggestions figure in the original resume text.
- If a resume is excellent, do not bother generating suggestions.

Generate:

1. strengths → list of what the resume already does well  
2. weaknesses → issues based directly on Harvard guidelines  
3. actionableSuggestions → each suggestion must include:
   - a type (language, action_verbs, structure, formatting, content, impact, relevance, mistakes)
   - a title
   - a description
   - example improvements if relevant  
4. rewriteExamples → 2–5 rewritten bullet points (before → after)  
5. metricsSuggestions → things the user could quantify but hasn’t

Before producing weaknesses or rewriteExamples:

1. Split the resume text into atomic segments (usually one bullet or sentence per segment).
2. Assign a unique ID (e.g., "seg_1", "seg_2", etc.) to each segment.
3. Every weakness MUST include the ID of the exact segment it refers to as targetId.
4. Every rewriteExample MUST include the same targetId if it rewrites that segment.
5. Weaknesses and rewriteExamples must never use partial text matching — always use the segment ID.

Do not feel the need to always provide insight, if a resume is perfectly made, there's no need to generate suggestions

Return **only JSON** matching the schema.
      `,
    });

    return suggestions;
  } catch (error) {
    console.error("Error generating resume improvements:", error);
    throw new Error("Failed to generate resume improvement suggestions");
  }
}

export type ResumeImprovements = z.infer<typeof ResumeImprovementSchema>;
