"use server";

import { db } from "@/server";

export async function getCategories() {
  try {
    const categories = await db.query.categories.findMany({
      columns: {
        name: true,
        id: true,
      },
    });

    return categories;
  } catch (e) {
    console.error("ERROR FETCHING CATEGORIES", e);
    throw new Error("ERROR FETCHING CATEGORIES");
  }
}

export type CategoriesInfo = Awaited<ReturnType<typeof getCategories>>;
