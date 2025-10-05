import { z } from "zod";

export const difficultyEnum = z.enum([
  "novice",
  "intermediate",
  "advanced",
  "expert",
]);
export const lessonTypeEnum = z.enum(["text", "project", "video"]);

export const baseLessonSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  xp: z.number().int().positive("XP must be positive"),
  difficulty_level: difficultyEnum,
});

export const textLessonSchema = baseLessonSchema.extend({
  type: z.literal("text"),
  content: z.string().min(1, "Content is required"),
});

export const projectLessonSchema = baseLessonSchema.extend({
  type: z.literal("project"),
  deliverables: z.string().min(1, "Deliverables are required"),
  evaluation_criteria: z.string().min(1, "Evaluation criteria are required"),
  submission_url: z.string().min(1, "A submission url is required"),
});

export const videoLessonSchema = baseLessonSchema.extend({
  type: z.literal("video"),
  video_url: z
    .string()
    .url("Please enter a valid video URL")
    .min(1, "Video URL is required"),
});

export const lessonSchema = z.discriminatedUnion("type", [
  textLessonSchema,
  projectLessonSchema,
  videoLessonSchema,
]);

export type LessonFormData = z.infer<typeof lessonSchema>;
export type Difficulty = z.infer<typeof difficultyEnum>;
export type LessonType = z.infer<typeof lessonTypeEnum>;

// Move the response type here to avoid circular dependencies
export interface GetLessonByIdResponse {
  id: number;
  type: string;
  title: string;
  content: string | null;
  video_url: string | null;
  deliverables: string | null;
  evaluation_criteria: string | null;
  submission_url: string | null;
  xp: number;
  difficulty_level: string;
  course_id: number;
  order: number;
  created_at: string;
}
