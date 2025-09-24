import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { categories } from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Initialize Drizzle ORM with Neon HTTP driver
const db = drizzle(process.env.DATABASE_URL!);

// Category data to seed
const skills = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Search Engine Optimization (SEO)",
  "Content Writing & Copywriting",
  "Data Analysis",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence & Machine Learning",
  "Blockchain Development",
  "Video Editing & Production",
  "E-commerce Management",
  "Social Media Management",
];

async function main() {
  console.log("🚀 Starting categories seeding...");

  try {
    // Check if categories already exist to prevent duplicates
    const existingCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.name, skills[0])); // Check just the first one as sample

    if (existingCategories.length > 0) {
      console.log(
        "✅ Categories already exist in the database. Skipping seeding."
      );
      process.exit(0);
    }

    // Prepare data for batch insert
    const categoryData = skills.map((name) => ({ name }));

    // Perform batch insert
    const insertedCategories = await db
      .insert(categories)
      .values(categoryData)
      .returning();

    console.log(
      `🎉 Successfully seeded ${insertedCategories.length} categories:`
    );
    insertedCategories.forEach((category) => {
      console.log(`- ${category.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:");
    console.error(error);
    process.exit(1);
  }
}

// Execute the seeding function
main();
