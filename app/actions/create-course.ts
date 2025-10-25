import { db } from "@/server";
import { courses, coursesToCategories } from "@/server/db/schema";

type CreateCourseRequest = {
  companyId: number;
  title: string;
  description?: string;
  thumbnailUrl: string;
  categories: string[]; // array of category IDs
};

export async function createCourseWithCategories({
  companyId,
  title,
  description,
  thumbnailUrl,
  categories,
}: CreateCourseRequest) {
  try {
    console.log("📝 Inserting course into DB...");
    const [newCourse] = await db
      .insert(courses)
      .values({
        company_id: companyId,
        title,
        description,
        thumbnail_url: thumbnailUrl,
      })
      .returning({ id: courses.id });

    console.log(`✅ Course created with ID: ${newCourse.id}`);

    if (!categories || categories.length === 0) {
      console.log("ℹ No categories provided, skipping category assignment");
      return newCourse;
    }

    console.log(`🗂 Assigning ${categories.length} categories to course...`);

    // Insert all category links in parallel
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

    console.log("🎯 Course creation and category assignment complete!");
    return newCourse;
  } catch (e) {
    console.error("💥 API course creation error:", e);
    throw new Error("Course creation failed, try again");
  }
}
