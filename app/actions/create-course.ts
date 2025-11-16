// app/actions/create-course.ts
import { getEmbedding } from "@/embedding";
import { db } from "@/server";
import { courses, coursesToCategories } from "@/server/db/schema";
// 👈 your existing embedding util
import { eq } from "drizzle-orm";

type CreateCourseRequest = {
  companyId: number;
  title: string;
  description?: string;
  thumbnailUrl: string;
  categories: string[];
};

export async function createCourseWithCategories({
  companyId,
  title,
  description,
  thumbnailUrl,
  categories,
}: CreateCourseRequest) {
  try {
    console.log("🧠 Generating embedding for new course...");
    const textToEmbed = `${title}\n${description || ""}`;
    const embedding = await getEmbedding(textToEmbed);

    console.log("📝 Inserting course into DB with embedding...");
    const [newCourse] = await db
      .insert(courses)
      .values({
        company_id: companyId,
        title,
        description,
        thumbnail_url: thumbnailUrl,
        embedding, // 👈 directly insert embedding here
      })
      .returning({ id: courses.id });

    console.log(`✅ Course created with ID: ${newCourse.id}`);

    if (!categories || categories.length === 0) {
      console.log("ℹ No categories provided, skipping category assignment");
      return newCourse;
    }

    console.log(`🗂 Assigning ${categories.length} categories to course...`);
    await Promise.all(
      categories.map(async (categoryId) => {
        try {
          await db.insert(coursesToCategories).values({
            courseId: newCourse.id,
            categoryId: Number(categoryId),
          });
          console.log(`✅ Category ${categoryId} assigned`);
        } catch (e) {
          console.error(`⚠ Failed to assign category ${categoryId}:`, e);
        }
      })
    );

    console.log("🎯 Course creation complete with embeddings + categories!");
    return newCourse;
  } catch (e) {
    console.error("💥 Course creation failed:", e);
    throw new Error("Course creation failed, try again");
  }
}
