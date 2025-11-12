import * as z from "zod";

export const resumeSchema = z.object({
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
  skills: z.array(z.string()),
});
