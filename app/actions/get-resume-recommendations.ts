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

const RewriteExampleSchema = z.object({
  before: z.string(),
  after: z.string(),
});

const ResumeImprovementSchema = z.object({
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
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
- Do not use personal pronouns or narrative style.
- Avoid slang, abbreviations (unless industry standard), and decorative language.
- Do not start bullet points with dates.
- Prioritize reverse chronological order.
- Suggest quantification (percentages, numbers, timelines).
- Ensure formatting consistency.
- Recommend simpler, scannable structure.
- Focus on results rather than duties.

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
